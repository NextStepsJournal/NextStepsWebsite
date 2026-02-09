import { serve } from "https://deno.land/std@0.201.0/http/server.ts";

const normalizeOrigin = (value: string) => value.trim().replace(/\/+$/, "");
const allowedOriginRaw = Deno.env.get("ALLOWED_ORIGIN") ?? "";
const allowedOrigins = allowedOriginRaw
  .split(",")
  .map((item) => normalizeOrigin(item))
  .filter((item) => item.length > 0);
const primaryAllowedOrigin = allowedOrigins[0];
const baseCorsHeaders = {
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
  Vary: "Origin",
};

const buildCorsHeaders = (origin: string | null) => ({
  ...baseCorsHeaders,
  "Access-Control-Allow-Origin":
    origin && allowedOrigins.includes(origin) ? origin : primaryAllowedOrigin ?? "null",
});

const isValidEmail = (value: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
const MAX_BODY_BYTES = 12_000;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 320;
const MAX_MESSAGE_LENGTH = 5000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_BLOCK_MS = 15 * 60 * 1000;
const RATE_LIMIT_STORE_MAX_ENTRIES = 2000;

type RateLimitEntry = {
  count: number;
  windowStartMs: number;
  blockedUntilMs: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

const getClientIp = (req: Request) => {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    req.headers.get("cf-connecting-ip")?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
};

const cleanupRateLimitStore = (nowMs: number) => {
  for (const [key, value] of rateLimitStore.entries()) {
    const staleWindow = nowMs - value.windowStartMs > RATE_LIMIT_WINDOW_MS * 2;
    const staleBlock = value.blockedUntilMs > 0 && nowMs > value.blockedUntilMs + RATE_LIMIT_WINDOW_MS;
    if (staleWindow || staleBlock) {
      rateLimitStore.delete(key);
    }
  }

  if (rateLimitStore.size <= RATE_LIMIT_STORE_MAX_ENTRIES) {
    return;
  }

  const entries = [...rateLimitStore.entries()].sort(
    (a, b) => a[1].windowStartMs - b[1].windowStartMs,
  );
  const removeCount = rateLimitStore.size - RATE_LIMIT_STORE_MAX_ENTRIES;
  for (let index = 0; index < removeCount; index += 1) {
    const entry = entries[index];
    if (entry) {
      rateLimitStore.delete(entry[0]);
    }
  }
};

const checkRateLimit = (ip: string, nowMs: number) => {
  const key = ip || "unknown";
  const existing = rateLimitStore.get(key);

  if (!existing) {
    rateLimitStore.set(key, {
      count: 1,
      windowStartMs: nowMs,
      blockedUntilMs: 0,
    });
    return { limited: false };
  }

  if (existing.blockedUntilMs > nowMs) {
    return {
      limited: true,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.blockedUntilMs - nowMs) / 1000)),
    };
  }

  if (nowMs - existing.windowStartMs > RATE_LIMIT_WINDOW_MS) {
    existing.count = 1;
    existing.windowStartMs = nowMs;
    existing.blockedUntilMs = 0;
    rateLimitStore.set(key, existing);
    return { limited: false };
  }

  existing.count += 1;

  if (existing.count > RATE_LIMIT_MAX_REQUESTS) {
    existing.blockedUntilMs = nowMs + RATE_LIMIT_BLOCK_MS;
    rateLimitStore.set(key, existing);
    return {
      limited: true,
      retryAfterSeconds: Math.max(1, Math.ceil(RATE_LIMIT_BLOCK_MS / 1000)),
    };
  }

  rateLimitStore.set(key, existing);
  return { limited: false };
};

const withJsonResponseHeaders = (corsHeaders: Record<string, string>) => ({
  ...corsHeaders,
  "Content-Type": "application/json",
});

serve(async req => {
  const requestOrigin = req.headers.get("origin");
  const normalizedRequestOrigin = requestOrigin ? normalizeOrigin(requestOrigin) : null;
  const corsHeaders = buildCorsHeaders(normalizedRequestOrigin);
  const isAllowedOrigin =
    normalizedRequestOrigin !== null && allowedOrigins.includes(normalizedRequestOrigin);

  if (!primaryAllowedOrigin) {
    console.error("Missing ALLOWED_ORIGIN configuration.");
    return new Response("Server is not configured.", {
      status: 500,
      headers: corsHeaders,
    });
  }

  if (req.method === "OPTIONS") {
    if (!isAllowedOrigin) {
      return new Response("Forbidden.", { status: 403, headers: corsHeaders });
    }
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed.", { status: 405, headers: corsHeaders });
  }

  if (!isAllowedOrigin) {
    return new Response("Forbidden.", { status: 403, headers: corsHeaders });
  }

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return new Response("Unsupported content type.", { status: 415, headers: corsHeaders });
  }

  const bodyLength = Number(req.headers.get("content-length") ?? "0");
  if (Number.isFinite(bodyLength) && bodyLength > MAX_BODY_BYTES) {
    return new Response("Payload too large.", { status: 413, headers: corsHeaders });
  }

  const clientIp = getClientIp(req);
  const nowMs = Date.now();
  cleanupRateLimitStore(nowMs);
  const rateLimitResult = checkRateLimit(clientIp, nowMs);
  if (rateLimitResult.limited) {
    return new Response("Too many requests.", {
      status: 429,
      headers: {
        ...corsHeaders,
        "Retry-After": String(rateLimitResult.retryAfterSeconds),
      },
    });
  }

  let payload: {
    name?: string;
    email?: string;
    message?: string;
    website?: string;
    startedAt?: number | string;
  };

  let rawBody = "";
  try {
    rawBody = await req.text();
  } catch {
    return new Response("Unable to read request body.", { status: 400, headers: corsHeaders });
  }

  if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
    return new Response("Payload too large.", { status: 413, headers: corsHeaders });
  }

  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new Response("Invalid JSON.", { status: 400, headers: corsHeaders });
  }

  const name = String(payload?.name ?? "").trim();
  const email = String(payload?.email ?? "").trim();
  const message = String(payload?.message ?? "").trim();
  const honeypot = String(payload?.website ?? "").trim();
  const startedAtMs = Number(payload?.startedAt ?? 0);

  if (!name || !email || !message) {
    return new Response("Missing required fields.", { status: 400, headers: corsHeaders });
  }

  if (honeypot) {
    return new Response("Invalid form submission.", { status: 400, headers: corsHeaders });
  }

  if (!Number.isFinite(startedAtMs) || startedAtMs <= 0) {
    return new Response("Invalid form metadata.", { status: 400, headers: corsHeaders });
  }

  const submittedTooFast = nowMs - startedAtMs < 1500;
  const staleSubmission = nowMs - startedAtMs > 1000 * 60 * 60 * 24 * 2;
  if (submittedTooFast || staleSubmission) {
    return new Response("Invalid form timing.", { status: 400, headers: corsHeaders });
  }

  if (name.length > MAX_NAME_LENGTH || email.length > MAX_EMAIL_LENGTH) {
    return new Response("Input too long.", { status: 400, headers: corsHeaders });
  }

  if (!isValidEmail(email)) {
    return new Response("Invalid email address.", { status: 400, headers: corsHeaders });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return new Response("Message too long.", { status: 400, headers: corsHeaders });
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const emailFrom = Deno.env.get("CONTACT_EMAIL_FROM");
  const emailTo = Deno.env.get("CONTACT_EMAIL_TO");

  if (!resendApiKey || !emailFrom || !emailTo) {
    console.error("Missing required email environment variables.");
    return new Response("Server is not configured.", { status: 500, headers: corsHeaders });
  }

  const subject = `New contact form message from ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: emailFrom,
      to: emailTo,
      reply_to: email,
      subject,
      text
    })
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error("Resend error:", resendResponse.status, errorText);
    return new Response("Failed to send email.", { status: 502, headers: corsHeaders });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: withJsonResponseHeaders(corsHeaders),
  });
});
