const { createClient } = require('@supabase/supabase-js');

// Config from env
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RATE_LIMIT_MAX_DEFAULT = parseInt(process.env.RATE_LIMIT_MAX || '5', 10);
const RATE_LIMIT_WINDOW_DEFAULT = parseInt(process.env.RATE_LIMIT_WINDOW || '3600', 10) * 1000; // ms

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars');
}

// Supabase service client (server-side)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
  global: { headers: { 'x-netlify-function': 'submitContact' } },
});

// In-memory rate limiter store (per-instance). For production use Redis or similar.
const limiterStore = new Map();

// Helper: get client IP from Netlify event headers
function getClientIp(event) {
  const headers = event && event.headers ? event.headers : {};
  return (
    headers['x-nf-client-connection-ip'] ||
    (headers['x-forwarded-for'] && headers['x-forwarded-for'].split(',')[0]) ||
    headers['client-ip'] ||
    'unknown'
  );
}

function isRateLimited(key, max = RATE_LIMIT_MAX_DEFAULT, windowMs = RATE_LIMIT_WINDOW_DEFAULT) {
  const now = Date.now();
  const entry = limiterStore.get(key);
  if (!entry) {
    limiterStore.set(key, { count: 1, firstSeen: now });
    return false;
  }
  if (now - entry.firstSeen > windowMs) {
    // reset window
    limiterStore.set(key, { count: 1, firstSeen: now });
    return false;
  }
  entry.count += 1;
  limiterStore.set(key, entry);
  return entry.count > max;
}

function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Whitelist targets with per-target config: table, required fields, allowed fields, max lengths, and rate limit
const TARGETS = {
  contact: {
    table: 'contact_messages',
    required: ['name', 'email', 'message'],
    allowedFields: ['name', 'email', 'message', 'source'],
    maxLength: { name: 200, email: 200, message: 2000, source: 200 },
    rateLimit: { max: 5, windowMs: RATE_LIMIT_WINDOW_DEFAULT }, // per IP
    sendEmail: true, // example: trigger an email notification for contact submissions
  },
  signup: {
    table: 'signup_requests',
    required: ['email', 'plan'],
    allowedFields: ['email', 'plan', 'referrer'],
    maxLength: { email: 200, plan: 100, referrer: 200 },
    rateLimit: { max: 3, windowMs: RATE_LIMIT_WINDOW_DEFAULT },
    sendEmail: true,
  },
  feedback: {
    table: 'feedback_messages',
    required: ['message'],
    allowedFields: ['user_id', 'message', 'rating'],
    maxLength: { user_id: 50, message: 2000, rating: 10 },
    rateLimit: { max: 10, windowMs: RATE_LIMIT_WINDOW_DEFAULT },
    sendEmail: false,
  },
};

// Simple email sender placeholder. Replace with real provider (SendGrid, Postmark, SMTP).
async function sendNotificationEmail({ to, subject, body }) {
  // Implement provider here. For now, just log and return success.
  console.info('sendNotificationEmail called:', { to, subject });
  // Example: use fetch to call SendGrid API or use nodemailer (requires bundling).
  return { ok: true };
}

function buildInsertPayload(targetConfig, inputPayload, ip) {
  const obj = {};
  for (const field of targetConfig.allowedFields) {
    if (Object.prototype.hasOwnProperty.call(inputPayload, field)) {
      obj[field] = inputPayload[field];
    }
  }
  // Attach ip for auditing
  obj.ip = ip;
  return obj;
}

function validatePayload(targetConfig, payload) {
  // Check required fields
  for (const req of targetConfig.required) {
    if (payload[req] === undefined || payload[req] === null || payload[req] === '') {
      return { ok: false, error: `Missing required field: ${req}` };
    }
  }

  // Basic type/length checks
  for (const [key, val] of Object.entries(payload)) {
    if (targetConfig.maxLength && targetConfig.maxLength[key]) {
      if (typeof val === 'string' && val.length > targetConfig.maxLength[key]) {
        return { ok: false, error: `Field too long: ${key}` };
      }
    }
    // email format check if present
    if (key === 'email' && !validateEmail(val)) {
      return { ok: false, error: 'Invalid email' };
    }
  }

  // Additional semantic checks can go here
  return { ok: true };
}

exports.handler = async function (event, context) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    let body;
    try {
      body = JSON.parse(event.body || '{}');
    } catch (err) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
    }

    const target = body.target;
    const payload = body.payload || body; // allow either { target, payload } or direct fields with target

    if (!target || typeof target !== 'string') {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing or invalid target' }) };
    }

    const targetConfig = TARGETS[target];
    if (!targetConfig) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Unknown target' }) };
    }

    // Rate limiting — per IP and per IP+target
    const ip = getClientIp(event);
    const keyIpTarget = `ip:${ip}:target:${target}`;
    const keyIp = `ip:${ip}`;
    const keyGlobal = `global:submitContact`;

    // Apply per-target rate limit
    if (isRateLimited(keyIpTarget, targetConfig.rateLimit?.max ?? RATE_LIMIT_MAX_DEFAULT, targetConfig.rateLimit?.windowMs ?? RATE_LIMIT_WINDOW_DEFAULT)) {
      return { statusCode: 429, body: JSON.stringify({ error: 'Too many requests for this endpoint from your IP' }) };
    }

    // Optional: global limiter
    if (isRateLimited(keyGlobal, RATE_LIMIT_MAX_DEFAULT * 1000, RATE_LIMIT_WINDOW_DEFAULT)) {
      // loose global limit; adjust as needed
      return { statusCode: 429, body: JSON.stringify({ error: 'Server is receiving too many requests' }) };
    }

    // Validate payload for this target
    const validation = validatePayload(targetConfig, payload);
    if (!validation.ok) {
      return { statusCode: 400, body: JSON.stringify({ error: validation.error }) };
    }

    // Build safe insert object (whitelist fields only)
    const insertObj = buildInsertPayload(targetConfig, payload, ip);

    // Insert into Supabase
    const { data, error } = await supabase
      .from(targetConfig.table)
      .insert([insertObj])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return { statusCode: 500, body: JSON.stringify({ error: 'Database error' }) };
    }

    // Optionally send notification email (non-blocking background)
    if (targetConfig.sendEmail) {
      const recipient = process.env.NOTIFY_TO_EMAIL || process.env.OWNER_EMAIL;
      if (recipient) {
        // Fire-and-forget; do not block response. Use setImmediate pattern to avoid unhandled promise warnings.
        const subject = `New ${target} submission`;
        const bodyText = `New submission to ${target}:\n\n` + JSON.stringify(insertObj, null, 2);
        sendNotificationEmail({ to: recipient, subject, body: bodyText })
          .then((res) => {
            if (!res.ok) console.warn('Email send reported not ok', res);
          })
          .catch((err) => console.error('Email send error', err));
      } else {
        console.warn('No NOTIFY_TO_EMAIL or OWNER_EMAIL env var configured; skipping email send.');
      }
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
    console.error('Unhandled error in submitContact:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};