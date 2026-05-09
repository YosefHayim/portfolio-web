export const CONTACT_RECIPIENT_DEFAULT = "yosefisabag@gmail.com";
export const CONTACT_EMAIL_MARKER_REGEX = /\[SEND_EMAIL:(\{[\s\S]*?\})\]/;
export const CONTACT_EMAIL_MARKER_EXAMPLE =
  '[SEND_EMAIL:{"senderName":"Name","senderEmail":"email@example.com","subject":"Brief Subject","message":"Message content"}]';

export function parseContactEmailMarker(content) {
  const match = content.match(CONTACT_EMAIL_MARKER_REGEX);
  if (!match) {
    return null;
  }

  try {
    const data = JSON.parse(match[1]);
    if (
      typeof data.senderName === "string" &&
      typeof data.senderEmail === "string" &&
      typeof data.subject === "string" &&
      typeof data.message === "string"
    ) {
      return data;
    }
  } catch {
    return null;
  }

  return null;
}

export function stripContactEmailMarker(content) {
  return content.replace(CONTACT_EMAIL_MARKER_REGEX, "").trim();
}

export function markContactEmailStatus(messages, messageId, emailStatus) {
  return messages.map((message) =>
    message.id === messageId ? { ...message, emailStatus } : message,
  );
}

export function findPendingContactEmailRequest(messages, isStreaming) {
  const lastMessage = messages[messages.length - 1];
  if (
    isStreaming ||
    lastMessage?.role !== "assistant" ||
    lastMessage.emailStatus
  ) {
    return null;
  }

  const emailData = parseContactEmailMarker(lastMessage.content);
  return emailData ? { messageId: lastMessage.id, emailData } : null;
}

export function createContactEmailPreview(response, maxLength = 80) {
  const preview = stripContactEmailMarker(response).slice(0, maxLength);
  return preview + (response.length > maxLength ? "..." : "");
}

export function createPortfolioEmail(input) {
  const text = `New message from your portfolio website:

From: ${input.senderName}
Email: ${input.senderEmail}
Subject: ${input.subject}

Message:
${input.message}

---
This email was sent via the AI chat on your portfolio website.
`;

  const html = `<!DOCTYPE html>
<html>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#333">
  <div style="max-width:600px;margin:0 auto;padding:20px">
    <div style="background:linear-gradient(135deg,#05df72,#00b4d8);color:white;padding:20px;border-radius:8px 8px 0 0">
      <h2 style="margin:0">New Portfolio Message</h2>
    </div>
    <div style="background:#f9f9f9;padding:20px;border:1px solid #e0e0e0;border-top:none">
      <p><strong>From:</strong> ${escapeHtml(input.senderName)}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(input.senderEmail)}">${escapeHtml(input.senderEmail)}</a></p>
      <p><strong>Subject:</strong> ${escapeHtml(input.subject)}</p>
      <div style="background:white;padding:15px;border-radius:8px;border:1px solid #e0e0e0;white-space:pre-wrap">${escapeHtml(input.message)}</div>
    </div>
  </div>
</body>
</html>`;

  return {
    subject: `[Portfolio] ${input.subject}`,
    text,
    html,
  };
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
