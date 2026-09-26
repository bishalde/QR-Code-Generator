import { useEffect, useState } from "react";
import { addEntry, removeEntry } from "../lib/history";
import { readJSON, writeJSON } from "../lib/storage";

const KEY = "qrbuilder:history";

export default function useQrHistory() {
  const [items, setItems] = useState(() => {
    const saved = readJSON(KEY, []);
    return Array.isArray(saved) ? saved : [];
  });
  // False when the browser refused to store history (private mode, full quota).
  const [persisted, setPersisted] = useState(true);

  useEffect(() => {
    setPersisted(writeJSON(KEY, items));
  }, [items]);

  return {
    items,
    persisted,
    add: (entry) => setItems((list) => addEntry(list, entry)),
    remove: (id) => setItems((list) => removeEntry(list, id)),
    clear: () => setItems([]),
  };
}
