/** Matches `[word]` markers used to highlight words in `content/site.ts` strings. */
export const HIGHLIGHT_PATTERN = /\[([^\]]+)\]/g;

/** Removes highlight brackets for plain-text contexts such as metadata. */
export function stripHighlights(text: string): string {
  return text.replace(HIGHLIGHT_PATTERN, "$1");
}
