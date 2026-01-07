import { serve } from "https://deno.land/std@0.201.0/http/server.ts";

const allowedOrigin = Deno.env.get("ALLOWED_ORIGIN");
const baseCorsHeaders = {
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const buildCorsHeaders = (origin: string | null) => ({
  ...baseCorsHeaders,
  "Access-Control-Allow-Origin": allowedOrigin ?? origin ?? "*"
});

const isValidEmail = (value: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);

serve(async req => {
  const origin = req.headers.get("origin");
  const corsHeaders = buildCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed.", { status: 405, headers: corsHeaders });
  }

  if (allowedOrigin && origin && origin !== allowedOrigin) {
    return new Response("Forbidden.", { status: 403, headers: corsHeaders });
  }

  let payload: { name?: string; email?: string; message?: string };
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON.", { status: 400, headers: corsHeaders });
  }

  const name = String(payload?.name ?? "").trim();
  const email = String(payload?.email ?? "").trim();
  const message = String(payload?.message ?? "").trim();

  if (!name || !email || !message) {
    return new Response("Missing required fields.", { status: 400, headers: corsHeaders });
  }

  if (!isValidEmail(email)) {
    return new Response("Invalid email address.", { status: 400, headers: corsHeaders });
  }

  if (message.length > 5000) {
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
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json"
    }
  });
});
