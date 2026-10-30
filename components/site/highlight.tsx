import { HIGHLIGHT_PATTERN } from "@/lib/highlight";

/** Renders `text`, coloring `[bracketed]` parts with the primary color. */
export function Highlight({ text }: { text: string }) {
  // split() with a capture group puts the bracketed parts at odd indexes.
  const parts = text.split(HIGHLIGHT_PATTERN);

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} className="text-primary">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
