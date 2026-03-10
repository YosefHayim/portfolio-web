export function processContent(content: string): string {
  let processed = content.trim();

  processed = processed.replace(
    /^# (.+)$/gm,
    '<h1 class="blog-h1">$1</h1>'
  );

  processed = processed.replace(
    /^## (.+)$/gm,
    '<h2 class="blog-h2">$1</h2>'
  );

  processed = processed.replace(
    /^### (.+)$/gm,
    '<h3 class="blog-h3">$1</h3>'
  );

  processed = processed.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    '<pre class="blog-code-block"><code>$2</code></pre>'
  );

  processed = processed.replace(
    /`([^`]+)`/g,
    '<code class="blog-inline-code">$1</code>'
  );

  processed = processed.replace(
    /\*\*([^*]+)\*\*/g,
    '<strong class="blog-bold">$1</strong>'
  );

  processed = processed.replace(
    /\*([^*]+)\*/g,
    '<em class="blog-italic">$1</em>'
  );

  processed = processed.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="blog-link" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  processed = processed.replace(
    /^---$/gm,
    '<hr class="blog-divider" />'
  );

  const paragraphs = processed.split(/\n\n+/);
  processed = paragraphs
    .map((p) => {
      const trimmed = p.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h1") ||
        trimmed.startsWith("<h2") ||
        trimmed.startsWith("<h3") ||
        trimmed.startsWith("<pre") ||
        trimmed.startsWith("<hr") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<ol")
      ) {
        return trimmed;
      }
      return `<p class="blog-paragraph">${trimmed}</p>`;
    })
    .join("\n");

  return processed;
}
