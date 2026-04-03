import { useLayoutEffect, useState } from "react";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useLocalStorage } from "@/hooks/use-local-storage";

import { THEME_STORAGE_KEY, type ThemePreference } from "./constants";

export function ThemeSwitcher() {
  const storage = useLocalStorage();
  const [theme, setTheme] = useState<ThemePreference>(
    () => storage.read(THEME_STORAGE_KEY, "system") ?? "system",
  );

  const persistTheme = (next: ThemePreference) => {
    setTheme(next);
    storage.write(THEME_STORAGE_KEY, next);
  };

  useLayoutEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const sync = () =>
      root.classList.toggle(
        "dark",
        theme === "dark" || (theme === "system" && mq.matches),
      );

    sync();

    if (theme !== "system") return;

    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [theme]);

  return (
    <ToggleGroup
      type="single"
      value={theme}
      onValueChange={(v) => v && persistTheme(v as ThemePreference)}
      size="sm"
      className="pointer-events-auto fixed bottom-8 h-8 right-8 z-50 ring ring-separator-line"
      aria-label="Тема оформления"
    >
      <ToggleGroupItem value="light" aria-label="Светлая тема">
        <SunIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Тёмная тема">
        <MoonIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="system" aria-label="Как в системе">
        <MonitorIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
