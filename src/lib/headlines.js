// Hero headlines. `word` is shown inside the selection box; one is picked per page load.
export const HEADLINES = [
  { lead: "QR codes that look like", word: "yours" },
  { lead: "Make a QR code for", word: "anything" },
  { lead: "Share your Wi-Fi in a single", word: "scan" },
  { lead: "Styled QR codes, ready in", word: "seconds" },
  { lead: "Put your logo right in the", word: "middle" },
  { lead: "Codes people actually want to", word: "scan" },
];

// Picks a random headline, never the same one as `previous`.
export function pickHeadline(previous, random = Math.random) {
  const n = HEADLINES.length;
  const r = Math.min(random(), 0.999999);
  if (!Number.isInteger(previous) || previous < 0 || previous >= n) return Math.floor(r * n);
  const i = Math.floor(r * (n - 1));
  return i >= previous ? i + 1 : i;
}
