import { Moon, Sun } from "lucide-react";
import { Button } from "~/components/ui/button";

export function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const dark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // storage unavailable (private mode) — theme still applies for this visit
    }
  };

  return (
    <Button variant="ghost" size="icon-lg" className="rounded-full" onClick={toggle} aria-label={label}>
      <Sun className="hidden size-5 dark:block" />
      <Moon className="size-5 dark:hidden" />
    </Button>
  );
}
