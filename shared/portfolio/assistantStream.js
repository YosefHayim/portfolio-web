export const ASSISTANT_STREAM_DONE_EVENT = "data: [DONE]\n\n";

export function encodeAssistantSseEvent(event) {
  if (event.type === "error") {
    return `data: ${JSON.stringify({ error: event.error })}\n\n`;
  }

  return `data: ${JSON.stringify({ content: event.content })}\n\n`;
}

export function createAssistantStreamParser() {
  let buffer = "";
  let done = false;

  return {
    push(chunk) {
      if (done) {
        return { events: [], done: true };
      }

      buffer += chunk;
      const events = [];
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const parsed = parseAssistantStreamLine(line);
        if (!parsed) {
          continue;
        }

        if (parsed.type === "done") {
          done = true;
          return { events, done: true };
        }

        events.push(parsed);
      }

      return { events, done };
    },
    flush() {
      if (!buffer.trim()) {
        return { events: [], done };
      }

      const parsed = parseAssistantStreamLine(buffer);
      buffer = "";
      if (!parsed) {
        return { events: [], done };
      }

      if (parsed.type === "done") {
        done = true;
        return { events: [], done: true };
      }

      return { events: [parsed], done };
    },
  };
}

function parseAssistantStreamLine(line) {
  const trimmed = line.trim();
  if (!trimmed.startsWith("data: ")) {
    return null;
  }

  const data = trimmed.slice(6);
  if (data === "[DONE]") {
    return { type: "done" };
  }

  try {
    const parsed = JSON.parse(data);
    if (typeof parsed.error === "string") {
      return { type: "error", error: parsed.error };
    }

    if (typeof parsed.content === "string") {
      return { type: "content", content: parsed.content };
    }
  } catch {
    return null;
  }

  return null;
}
