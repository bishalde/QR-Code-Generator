import { describe, expect, it } from "vitest";
import { QR_TYPES, buildQrData, emptyFields, escapeWifi, escapeVcard } from "./qrTypes";

describe("QR_TYPES", () => {
  it("defines the eight supported types in display order", () => {
    expect(QR_TYPES.map((t) => t.id)).toEqual([
      "url", "text", "email", "phone", "sms", "wifi", "vcard", "location",
    ]);
  });

  it("gives every type at least one field", () => {
    for (const type of QR_TYPES) expect(type.fields.length).toBeGreaterThan(0);
  });
});

describe("emptyFields", () => {
  it("creates blank values for every field, using option defaults", () => {
    expect(emptyFields("wifi")).toEqual({
      ssid: "", password: "", encryption: "WPA", hidden: false,
    });
  });
});

describe("buildQrData", () => {
  it("returns an empty string when required fields are missing", () => {
    expect(buildQrData("url", { url: "  " })).toBe("");
    expect(buildQrData("email", { to: "", subject: "Hi", body: "" })).toBe("");
    expect(buildQrData("wifi", { ssid: "", password: "x", encryption: "WPA", hidden: false })).toBe("");
  });

  it("returns an empty string for an unknown type", () => {
    expect(buildQrData("nope", {})).toBe("");
  });

  describe("url", () => {
    it("keeps a URL that already has a scheme", () => {
      expect(buildQrData("url", { url: "http://example.com/a?b=1" })).toBe("http://example.com/a?b=1");
    });
    it("adds https:// when the scheme is missing", () => {
      expect(buildQrData("url", { url: " example.com " })).toBe("https://example.com");
    });
  });

  it("encodes text as-is", () => {
    expect(buildQrData("text", { text: "Hello\nworld" })).toBe("Hello\nworld");
  });

  describe("email", () => {
    it("builds a mailto link with encoded subject and body", () => {
      expect(buildQrData("email", { to: "a@b.co", subject: "Hi there", body: "A&B" }))
        .toBe("mailto:a@b.co?subject=Hi%20there&body=A%26B");
    });
    it("omits empty subject and body", () => {
      expect(buildQrData("email", { to: "a@b.co", subject: "", body: "" })).toBe("mailto:a@b.co");
    });
  });

  it("builds a tel link without spaces or dashes", () => {
    expect(buildQrData("phone", { phone: "+1 (555) 010-2030" })).toBe("tel:+15550102030");
  });

  it("builds an SMSTO payload", () => {
    expect(buildQrData("sms", { phone: "+44 7700 900123", message: "On my way" }))
      .toBe("SMSTO:+447700900123:On my way");
  });

  describe("wifi", () => {
    it("builds a WIFI payload and escapes special characters", () => {
      expect(buildQrData("wifi", { ssid: "Cafe;Net", password: 'p:a,s"s\\', encryption: "WPA", hidden: false }))
        .toBe('WIFI:T:WPA;S:Cafe\\;Net;P:p\\:a\\,s\\"s\\\\;;');
    });
    it("marks hidden networks", () => {
      expect(buildQrData("wifi", { ssid: "Home", password: "pw", encryption: "WEP", hidden: true }))
        .toBe("WIFI:T:WEP;S:Home;P:pw;H:true;;");
    });
    it("drops the password for open networks", () => {
      expect(buildQrData("wifi", { ssid: "Guest", password: "ignored", encryption: "nopass", hidden: false }))
        .toBe("WIFI:T:nopass;S:Guest;;");
    });
  });

  describe("vcard", () => {
    it("builds a vCard 3.0 with only the filled fields", () => {
      const data = buildQrData("vcard", {
        firstName: "Ada", lastName: "Lovelace", org: "Engines, Ltd", title: "",
        phone: "+44 20 7946 0000", email: "ada@example.com", website: "", address: "",
      });
      expect(data).toBe([
        "BEGIN:VCARD",
        "VERSION:3.0",
        "N:Lovelace;Ada;;;",
        "FN:Ada Lovelace",
        "ORG:Engines\\, Ltd",
        "TEL;TYPE=CELL:+44 20 7946 0000",
        "EMAIL:ada@example.com",
        "END:VCARD",
      ].join("\n"));
    });
    it("needs at least a first or last name", () => {
      expect(buildQrData("vcard", { ...emptyFields("vcard"), phone: "123" })).toBe("");
    });
  });

  describe("location", () => {
    it("builds a geo URI", () => {
      expect(buildQrData("location", { lat: "51.5007", lng: "-0.1246" })).toBe("geo:51.5007,-0.1246");
    });
    it("rejects coordinates out of range or not numbers", () => {
      expect(buildQrData("location", { lat: "91", lng: "0" })).toBe("");
      expect(buildQrData("location", { lat: "abc", lng: "0" })).toBe("");
      expect(buildQrData("location", { lat: "0", lng: "181" })).toBe("");
    });
  });
});

describe("escaping helpers", () => {
  it("escapeWifi escapes \\ ; , : \"", () => {
    expect(escapeWifi('a\\b;c,d:e"f')).toBe('a\\\\b\\;c\\,d\\:e\\"f');
  });
  it("escapeVcard escapes \\ ; , and newlines", () => {
    expect(escapeVcard("a\\b;c,d\ne")).toBe("a\\\\b\\;c\\,d\\ne");
  });
});
