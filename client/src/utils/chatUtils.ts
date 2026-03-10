export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isVoice?: boolean;
  emailStatus?: "sending" | "sent" | "failed";
};

export type EmailData = {
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
};

export const EMAIL_MARKER_REGEX = /\[SEND_EMAIL:(\{[\s\S]*?\})\]/;

export function parseEmailMarker(content: string): EmailData | null {
  const match = content.match(EMAIL_MARKER_REGEX);
  if (!match) return null;

  try {
    const data = JSON.parse(match[1]);
    if (data.senderName && data.senderEmail && data.subject && data.message) {
      return data as EmailData;
    }
  } catch {
    return null;
  }
  return null;
}

export function stripEmailMarker(content: string): string {
  return content.replace(EMAIL_MARKER_REGEX, "").trim();
}
