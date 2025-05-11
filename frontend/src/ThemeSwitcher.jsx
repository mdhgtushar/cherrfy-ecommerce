import { useEffect, useState } from "react";

const themes = ["theme-light", "theme-dark", "theme-ocean"];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("theme-light");

  useEffect(() => {
    document.documentElement.classList.remove(...themes);
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Theme:</span>
      <select
        className="border px-2 py-1 rounded text-sm"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="theme-light">Light</option>
        <option value="theme-dark">Dark</option>
        <option value="theme-ocean">Ocean</option>
      </select>
    </div>
  );
}
