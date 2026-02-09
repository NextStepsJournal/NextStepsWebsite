const { createClient } = require('@supabase/supabase-js');

// Config from env
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '5', 10);
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || '3600', 10) * 1000; // ms

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars');
}

// Supabase service client (server-side)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
  global: { headers: { 'x-netlify-function': 'submitContact' } },
});

// Simple in-memory rate limiter store
// Structure: { key: { count, firstSeen } }
const limiterStore = new Map();

// Helper: get client IP from Netlify event headers (works for Netlify)
function getClientIp(event) {
  // Netlify provides x-nf-client-connection-ip sometimes; fallback to x-forwarded-for
  const headers = event && event.headers ? event.headers : {};
  return headers['x-nf-client-connection-ip']
    || headers['x-forwarded-for']?.split(',')?.[0]
    || headers['client-ip']
    || 'unknown';
}

function isRateLimited(key) {
  const now = Date.now();
  const entry = limiterStore.get(key);
  if (!entry) {
    limiterStore.set(key, { count: 1, firstSeen: now });
    return false;
  }
  if (now - entry.firstSeen > RATE_LIMIT_WINDOW) {
    // reset window
    limiterStore.set(key, { count: 1, firstSeen: now });
    return false;
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }
  limiterStore.set(key, entry);
  return false;
}

function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  // simple RFC-lite regex
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

exports.handler = async function (event, context) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    let payload;
    try {
      payload = JSON.parse(event.body || '{}');
    } catch (err) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
    }

    const { name, email, message } = payload;

    // Basic validation
    if (!name || !email || !message) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
    }
    if (typeof name !== 'string' || typeof message !== 'string') {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid field types' }) };
    }
    if (name.length > 200 || email.length > 200 || message.length > 2000) {
      return { statusCode: 400, body: JSON.stringify({ error: 'One or more fields are too long' }) };
    }
    if (!validateEmail(email)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid email' }) };
    }

    // Rate limiting
    const ip = getClientIp(event);
    const keyByIp = `ip:${ip}`;
    const keyGlobal = `global`; // optional global limiter

    if (isRateLimited(keyByIp)) {
      return { statusCode: 429, body: JSON.stringify({ error: 'Too many requests from this IP' }) };
    }
    if (isRateLimited(keyGlobal)) {
      return { statusCode: 429, body: JSON.stringify({ error: 'Server is receiving too many requests' }) };
    }

    // Insert into Supabase table "contact_messages" (adjust table name as needed)
    // Recommended table schema:
    // CREATE TABLE contact_messages (
    //   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    //   name text NOT NULL,
    //   email text NOT NULL,
    //   message text NOT NULL,
    //   ip text,
    //   created_at timestamptz DEFAULT now()
    // );
    const insertPayload = {
      name,
      email,
      message,
      ip,
    };

    const { data, error } = await supabase
      .from('contact_messages')
      .insert([insertPayload])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return { statusCode: 500, body: JSON.stringify({ error: 'Database error' }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id: data && data[0] ? data[0].id : null }),
    };
  } catch (err) {
    console.error('Unhandled error in submitContact:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};