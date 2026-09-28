import { cn } from "~/lib/utils";

interface TagProps {
  label: string;
  color?: "blue" | "green" | "red" | "yellow" | "purple" | "gray" | "orange";
}

const colors: Record<NonNullable<TagProps["color"]>, string> = {
  blue: "bg-accent text-accent-foreground",
  purple: "bg-tertiary-container text-tertiary-container-foreground",
  green: "bg-green-500/15 text-green-800 dark:text-green-300",
  red: "bg-red-500/15 text-red-800 dark:text-red-300",
  yellow: "bg-amber-400/20 text-amber-800 dark:text-amber-200",
  orange: "bg-orange-500/15 text-orange-800 dark:text-orange-300",
  gray: "bg-secondary text-muted-foreground",
};

export function Tag({ label, color = "gray" }: TagProps) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap", colors[color])}>
      {label}
    </span>
  );
}
