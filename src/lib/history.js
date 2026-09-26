export const HISTORY_LIMIT = 12;

const signature = (entry) => JSON.stringify([entry.data, entry.style]);

export function addEntry(list, entry, limit = HISTORY_LIMIT) {
  const key = signature(entry);
  return [entry, ...list.filter((e) => signature(e) !== key)].slice(0, limit);
}

export function removeEntry(list, id) {
  return list.filter((e) => e.id !== id);
}
