import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RATE_LIMIT_MAX_DEFAULT = parseInt(process.env.RATE_LIMIT_MAX || "5", 10);
const RATE_LIMIT_WINDOW_DEFAULT = parseInt(process.env.RATE_LIMIT_WINDOW || "3600", 10) * 1000;
const MAX_BODY_BYTES = 12_000;
const FORM_MIN_SUBMIT_MS = 1_500;
const FORM_MAX_AGE_MS = 2 * 24 * 60 * 60 * 1000;
const ALLOWED_SIGNUP_PLANS = new Set(["newsletter_waitlist", "journal_waitlist"]);

const normalizeOrigin = (value) => String(value).trim().replace(/\/+$/, "");

const allowedOrigins = (() => {
  const raw = process.env.ALLOWED_ORIGINS;
  if (!raw || !raw.trim()) {
    return new Set([
      "https://www.nextstepsjournal.org",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:8888",
      "http://127.0.0.1:8888",
      "http://localhost:4173",
      "http://127.0.0.1:4173",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ]);
  }
  return new Set(
    raw
      .split(",")
      .map((origin) => normalizeOrigin(origin))
      .filter(Boolean),
  );
})();

const isSupabaseProjectUrl = (value) =>
  typeof value === "string" && /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(value.trim());

const hasSupabaseEnv = Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
const hasValidSupabaseUrl = isSupabaseProjectUrl(SUPABASE_URL);

if (!hasSupabaseEnv) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.");
}
if (SUPABASE_URL && !hasValidSupabaseUrl) {
  console.error(
    "SUPABASE_URL looks invalid. Use your project URL like https://<project-ref>.supabase.co",
  );
}

const supabase =
  hasSupabaseEnv && hasValidSupabaseUrl
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false },
        global: { headers: { "x-netlify-function": "submitContact" } },
      })
    : null;

const limiterStore = new Map();

function getClientIp(event) {
  const headers = event && event.headers ? event.headers : {};
  return (
    headers["x-nf-client-connection-ip"] ||
    (headers["x-forwarded-for"] && headers["x-forwarded-for"].split(",")[0]) ||
    headers["client-ip"] ||
    "unknown"
  );
}

function getRequestOrigin(event) {
  const headers = event && event.headers ? event.headers : {};
  const originHeader = headers.origin;
  if (originHeader) {
    return normalizeOrigin(originHeader);
  }

  const refererHeader = headers.referer || headers.referrer;
  if (!refererHeader) {
    return "";
  }

  try {
    const refererOrigin = new URL(refererHeader).origin;
    return normalizeOrigin(refererOrigin);
  } catch {
    return "";
  }
}

function isAllowedOrigin(origin) {
  return origin && allowedOrigins.has(origin);
}

function isRateLimited(key, max = RATE_LIMIT_MAX_DEFAULT, windowMs = RATE_LIMIT_WINDOW_DEFAULT) {
  const now = Date.now();
  const entry = limiterStore.get(key);
  if (!entry) {
    limiterStore.set(key, { count: 1, firstSeen: now });
    return false;
  }
  if (now - entry.firstSeen > windowMs) {
    limiterStore.set(key, { count: 1, firstSeen: now });
    return false;
  }
  entry.count += 1;
  limiterStore.set(key, entry);
  return entry.count > max;
}

function validateEmail(email) {
  if (!email || typeof email !== "string") return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

const TARGETS = {
  contact: {
    table: "contact_messages",
    required: ["name", "email", "message"],
    optional: ["source"],
    maxLength: { name: 200, email: 200, message: 2000, source: 200 },
    rateLimit: { max: 5, windowMs: RATE_LIMIT_WINDOW_DEFAULT },
  },
  signup: {
    table: "signup_requests",
    required: ["email", "plan"],
    optional: ["referrer"],
    maxLength: { email: 200, plan: 100, referrer: 200 },
    rateLimit: { max: 3, windowMs: RATE_LIMIT_WINDOW_DEFAULT },
  },
};

function buildInsertPayload(
  targetConfig,
  inputPayload,
  ip,
  { includeOptional = true, includeIp = true } = {},
) {
  const obj = {};
  for (const field of targetConfig.required) {
    obj[field] = inputPayload[field];
  }
  if (includeOptional) {
    for (const field of targetConfig.optional || []) {
      if (Object.prototype.hasOwnProperty.call(inputPayload, field)) {
        obj[field] = inputPayload[field];
      }
    }
  }
  if (includeIp) {
    obj.ip = ip;
  }
  return obj;
}

function validateBotMetadata(payload) {
  const website = String(payload?.website ?? "").trim();
  if (website) {
    return { ok: false, error: "Invalid form submission." };
  }

  const startedAt = Number(payload?.startedAt ?? 0);
  if (!Number.isFinite(startedAt) || startedAt <= 0) {
    return { ok: false, error: "Invalid form metadata." };
  }

  const now = Date.now();
  if (now - startedAt < FORM_MIN_SUBMIT_MS || now - startedAt > FORM_MAX_AGE_MS) {
    return { ok: false, error: "Invalid form timing." };
  }

  return { ok: true };
}

function validatePayload(target, targetConfig, payload) {
  const botCheck = validateBotMetadata(payload);
  if (!botCheck.ok) {
    return botCheck;
  }

  for (const req of targetConfig.required) {
    if (payload[req] === undefined || payload[req] === null || String(payload[req]).trim() === "") {
      return { ok: false, error: `Missing required field: ${req}` };
    }
  }

  for (const [key, val] of Object.entries(payload)) {
    if (targetConfig.maxLength && targetConfig.maxLength[key]) {
      if (typeof val !== "string") {
        return { ok: false, error: `Invalid field type: ${key}` };
      }
      if (val.length > targetConfig.maxLength[key]) {
        return { ok: false, error: `Field too long: ${key}` };
      }
    }
    if (key === "email" && !validateEmail(val)) {
      return { ok: false, error: "Invalid email" };
    }
  }

  if (target === "signup" && !ALLOWED_SIGNUP_PLANS.has(String(payload.plan))) {
    return { ok: false, error: "Invalid signup plan" };
  }

  return { ok: true };
}

function isColumnMismatchError(error) {
  const code = typeof error?.code === "string" ? error.code : "";
  const message = typeof error?.message === "string" ? error.message : "";
  const details = typeof error?.details === "string" ? error.details : "";

  if (code === "PGRST204" || code === "42703") {
    return true;
  }

  const text = `${message} ${details}`.toLowerCase();
  return text.includes("column") && (text.includes("not found") || text.includes("does not exist"));
}

async function insertSubmission(targetConfig, payload, ip) {
  const primaryInsert = buildInsertPayload(targetConfig, payload, ip, {
    includeOptional: true,
    includeIp: true,
  });

  let result = await supabase.from(targetConfig.table).insert([primaryInsert]).select();
  if (!result.error) {
    return result;
  }

  if (!isColumnMismatchError(result.error)) {
    return result;
  }

  const fallbackInsert = buildInsertPayload(targetConfig, payload, ip, {
    includeOptional: false,
    includeIp: false,
  });

  const primaryKeys = Object.keys(primaryInsert).sort().join(",");
  const fallbackKeys = Object.keys(fallbackInsert).sort().join(",");
  if (primaryKeys === fallbackKeys) {
    return result;
  }

  const fallbackResult = await supabase.from(targetConfig.table).insert([fallbackInsert]).select();
  if (!fallbackResult.error) {
    console.warn(
      `Inserted into ${targetConfig.table} using required-only fields. Optional columns may be missing.`,
    );
  }
  return fallbackResult;
}

export const handler = async function (event) {
  try {
    if (!supabase) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Server is not configured.",
        }),
      };
    }

    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
    }

    const requestOrigin = getRequestOrigin(event);
    if (!isAllowedOrigin(requestOrigin)) {
      return { statusCode: 403, body: JSON.stringify({ error: "Forbidden" }) };
    }

    const headers = event && event.headers ? event.headers : {};
    const contentType = String(headers["content-type"] || headers["Content-Type"] || "").toLowerCase();
    if (!contentType.includes("application/json")) {
      return { statusCode: 415, body: JSON.stringify({ error: "Unsupported content type" }) };
    }

    if (typeof event.body === "string" && Buffer.byteLength(event.body, "utf8") > MAX_BODY_BYTES) {
      return { statusCode: 413, body: JSON.stringify({ error: "Payload too large" }) };
    }

    let body;
    try {
      body = JSON.parse(event.body || "{}");
    } catch {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
    }

    const target = body.target;
    const payload = body.payload || body;
    if (!target || typeof target !== "string") {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing or invalid target" }) };
    }

    const targetConfig = TARGETS[target];
    if (!targetConfig) {
      return { statusCode: 400, body: JSON.stringify({ error: "Unknown target" }) };
    }

    const ip = getClientIp(event);
    const keyIpTarget = `ip:${ip}:target:${target}`;
    const keyGlobal = "global:submitContact";

    if (
      isRateLimited(
        keyIpTarget,
        targetConfig.rateLimit?.max ?? RATE_LIMIT_MAX_DEFAULT,
        targetConfig.rateLimit?.windowMs ?? RATE_LIMIT_WINDOW_DEFAULT,
      )
    ) {
      return {
        statusCode: 429,
        body: JSON.stringify({ error: "Too many requests for this endpoint from your IP" }),
      };
    }

    if (isRateLimited(keyGlobal, RATE_LIMIT_MAX_DEFAULT * 200, RATE_LIMIT_WINDOW_DEFAULT)) {
      return {
        statusCode: 429,
        body: JSON.stringify({ error: "Server is receiving too many requests" }),
      };
    }

    const validation = validatePayload(target, targetConfig, payload);
    if (!validation.ok) {
      return { statusCode: 400, body: JSON.stringify({ error: validation.error }) };
    }

    const { data, error } = await insertSubmission(targetConfig, payload, ip);
    if (error) {
      console.error("Supabase insert error:", {
        target,
        table: targetConfig.table,
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return { statusCode: 500, body: JSON.stringify({ error: "Database error" }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        target,
        id: data && data[0] ? data[0].id || data[0].created_at || data[0] : null,
      }),
    };
  } catch (err) {
    console.error("Unhandled error in submitContact:", err);
    return { statusCode: 500, body: JSON.stringify({ error: "Server error" }) };
  }
};
