import { useEffect, useState } from "react";
import { readJSON, writeJSON } from "../lib/storage";

const KEY = "qrbuilder:theme";

function initialTheme() {
  const saved = readJSON(KEY, null);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function useTheme() {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    writeJSON(KEY, next);
  };

  return [theme, toggle];
}
