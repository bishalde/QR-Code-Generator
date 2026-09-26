import { useEffect, useState } from "react";
import { readJSON, writeJSON } from "../lib/storage";

const KEY = "qrbuilder:theme";

// Light by default; dark only once the visitor has switched to it.
function initialTheme() {
  return readJSON(KEY, null) === "dark" ? "dark" : "light";
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
