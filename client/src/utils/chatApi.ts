const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const response = await fetch(`${API_URL}/api/chat/stt`, {
    method: "POST",
    headers: { "Content-Type": audioBlob.type },
    body: audioBlob,
  });

  if (!response.ok) {
    throw new Error("Failed to transcribe audio");
  }

  const data: { text: string } = await response.json();
  return data.text;
}

export async function fetchStreamingResponse(
  userMessages: Array<{ role: string; content: string }>,
  onChunk: (chunk: string) => void,
  abortSignal?: AbortSignal,
): Promise<string> {
  let fullResponse = "";

  const response = await fetch(`${API_URL}/api/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: userMessages }),
    signal: abortSignal,
  });

  if (!response.ok) {
    throw new Error("Failed to get AI response");
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("No response body");
  }

  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    const chunk = decoder.decode(value);
    const lines = chunk.split("\n");

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.slice(6);
        if (data === "[DONE]") {
          return fullResponse;
        }
        try {
          const parsed: { content?: string } = JSON.parse(data);
          if (parsed.content) {
            fullResponse += parsed.content;
            onChunk(parsed.content);
          }
        } catch {
          /* empty */
        }
      }
    }
  }

  return fullResponse;
}

export async function sendEmail(emailData: {
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
}): Promise<void> {
  const response = await fetch(`${API_URL}/api/email/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(emailData),
  });

  if (!response.ok) {
    const data: { error?: string } = await response.json();
    throw new Error(data.error || "Failed to send email");
  }
}
