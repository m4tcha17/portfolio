import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  // Case study sections (## Problem, ## Solution): small uppercase tracked labels, like the detail page's side column.
  h2: (props) => (
    <h2
      className="text-xs font-medium tracking-[0.2em] text-primary uppercase [&:not(:first-child)]:mt-10"
      {...props}
    />
  ),
  p: (props) => (
    <p className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-4" {...props} />
  ),
  strong: (props) => <strong className="font-medium text-primary" {...props} />,
  a: (props) => (
    <a
      className="font-medium text-primary underline underline-offset-4 hover:opacity-80"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
