import { describe, expect, it } from "vitest";
import { HISTORY_LIMIT, addEntry, removeEntry } from "./history";

const entry = (id, data, style = { dotColor: "#000" }) => ({ id, data, style, type: "url", fields: {}, createdAt: id });

describe("addEntry", () => {
  it("puts the newest entry first", () => {
    const list = addEntry([entry(1, "a")], entry(2, "b"));
    expect(list.map((e) => e.id)).toEqual([2, 1]);
  });

  it("replaces an identical code instead of saving it twice", () => {
    const list = addEntry([entry(1, "a"), entry(2, "b")], entry(3, "a"));
    expect(list.map((e) => e.id)).toEqual([3, 2]);
  });

  it("keeps codes with the same content but a different style", () => {
    const list = addEntry([entry(1, "a", { dotColor: "#000" })], entry(2, "a", { dotColor: "#f00" }));
    expect(list).toHaveLength(2);
  });

  it(`keeps at most ${HISTORY_LIMIT} entries`, () => {
    let list = [];
    for (let i = 0; i < HISTORY_LIMIT + 3; i++) list = addEntry(list, entry(i, `d${i}`));
    expect(list).toHaveLength(HISTORY_LIMIT);
    expect(list[0].id).toBe(HISTORY_LIMIT + 2);
  });
});

describe("removeEntry", () => {
  it("removes by id", () => {
    expect(removeEntry([entry(1, "a"), entry(2, "b")], 1).map((e) => e.id)).toEqual([2]);
  });
});
