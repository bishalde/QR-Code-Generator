import { describe, expect, it } from "vitest";
import { HEADLINES, pickHeadline } from "./headlines";

describe("HEADLINES", () => {
  it("has six headlines, each with lead-in text and a highlighted word", () => {
    expect(HEADLINES).toHaveLength(6);
    for (const h of HEADLINES) {
      expect(h.lead.trim()).not.toBe("");
      expect(h.word.trim()).not.toBe("");
    }
  });
});

describe("pickHeadline", () => {
  it("returns an index in range", () => {
    for (const r of [0, 0.3, 0.99999]) {
      const i = pickHeadline(null, () => r);
      expect(i).toBeGreaterThanOrEqual(0);
      expect(i).toBeLessThan(HEADLINES.length);
    }
  });

  it("never repeats the previous headline", () => {
    for (let prev = 0; prev < HEADLINES.length; prev++) {
      for (const r of [0, 0.2, 0.5, 0.8, 0.99999]) {
        expect(pickHeadline(prev, () => r)).not.toBe(prev);
      }
    }
  });

  it("can reach every other headline", () => {
    const seen = new Set();
    for (let k = 0; k < HEADLINES.length - 1; k++) {
      seen.add(pickHeadline(2, () => (k + 0.5) / (HEADLINES.length - 1)));
    }
    expect(seen.size).toBe(HEADLINES.length - 1);
  });

  it("ignores a stored value that is out of range", () => {
    const i = pickHeadline(42, () => 0);
    expect(i).toBe(0);
  });
});
