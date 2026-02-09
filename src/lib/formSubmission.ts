type SubmitTarget = "contact" | "signup" | "feedback";

const DEFAULT_SUBMIT_ENDPOINT = "/.netlify/functions/submitContact";
const submitEndpoint =
  import.meta.env.VITE_SUBMIT_CONTACT_ENDPOINT?.trim() || DEFAULT_SUBMIT_ENDPOINT;

const getServerErrorMessage = async (response: Response) => {
  const raw = await response.text();
  if (!raw) {
    return "";
  }

  try {
    const parsed = JSON.parse(raw) as { error?: unknown; message?: unknown };
    if (typeof parsed.error === "string" && parsed.error.trim()) {
      return parsed.error.trim();
    }
    if (typeof parsed.message === "string" && parsed.message.trim()) {
      return parsed.message.trim();
    }
  } catch {
    if (raw.length <= 200) {
      return raw.trim();
    }
  }

  return "";
};

const mapErrorMessage = (status: number, serverMessage: string) => {
  if (status === 429) {
    return "Too many attempts. Please wait a few minutes and try again.";
  }
  if (status === 400) {
    return serverMessage || "Please review your details and try again.";
  }
  if (status === 413) {
    return "Your message is too large. Please shorten it and try again.";
  }
  return serverMessage || "Unable to submit right now. Please try again later.";
};

export const submitFormTarget = async (
  target: SubmitTarget,
  payload: Record<string, unknown>,
) => {
  const response = await fetch(submitEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ target, payload }),
  });

  if (response.ok) {
    return;
  }

  const serverMessage = await getServerErrorMessage(response);
  throw new Error(mapErrorMessage(response.status, serverMessage));
};
