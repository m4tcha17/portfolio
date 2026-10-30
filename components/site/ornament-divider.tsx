import { cn } from "@/lib/utils";

/** Book-style section break: a centered fleuron between two hairlines. */
export function OrnamentDivider({ className }: { className?: string }) {
  return (
    <div role="separator" className={cn("flex items-center gap-4 text-muted-foreground", className)}>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
