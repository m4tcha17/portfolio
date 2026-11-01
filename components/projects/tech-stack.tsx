import { getTechIcon } from "@/lib/tech-icons";
import { Badge } from "@/components/ui/badge";

/** Square chips: logo on the left (monochrome, inherits the text color), name on the right. `icons={false}`: text only. */
export function TechStack({ tech, icons = true }: { tech: string[]; icons?: boolean }) {
  return (
    <ul aria-label="Tech stack" className="flex flex-wrap gap-1.5">
      {tech.map((item) => {
        const Icon = icons ? getTechIcon(item) : undefined;
        return (
          <li key={item}>
            <Badge variant="secondary" className="h-7 gap-1.5 rounded-none px-2.5 text-xs [&>svg]:size-3.5!">
              {Icon ? <Icon aria-hidden /> : null}
              {item}
            </Badge>
          </li>
        );
      })}
    </ul>
  );
}
