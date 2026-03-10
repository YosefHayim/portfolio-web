import type { ReactNode } from "react";

export function highlightMatch(text: string, searchQuery: string): ReactNode {
  if (!searchQuery.trim()) return text;

  const query = searchQuery.toLowerCase();
  const lowerText = text.toLowerCase();
  const index = lowerText.indexOf(query);

  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + searchQuery.length);
  const after = text.slice(index + searchQuery.length);

  return (
    <>
      {before}
      <span className="rounded bg-[#05df72]/20 px-0.5 text-[#05df72]">
        {match}
      </span>
      {after}
    </>
  );
}
