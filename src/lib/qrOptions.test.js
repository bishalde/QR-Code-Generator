import { describe, expect, it } from "vitest";
import { DEFAULT_STYLE, PRESETS, contrastRatio, lowestContrast, toQrOptions } from "./qrOptions";

describe("toQrOptions", () => {
  it("maps a solid style onto qr-code-styling options", () => {
    const opts = toQrOptions("hello", DEFAULT_STYLE, { size: 300 });
    expect(opts).toMatchObject({
      width: 300,
      height: 300,
      data: "hello",
      margin: DEFAULT_STYLE.margin,
      qrOptions: { errorCorrectionLevel: DEFAULT_STYLE.ecLevel },
      dotsOptions: { type: DEFAULT_STYLE.dotType, color: DEFAULT_STYLE.dotColor },
      cornersSquareOptions: { type: DEFAULT_STYLE.cornerSquareType, color: DEFAULT_STYLE.cornerColor },
      cornersDotOptions: { type: DEFAULT_STYLE.cornerDotType, color: DEFAULT_STYLE.cornerColor },
      backgroundOptions: { color: DEFAULT_STYLE.bgColor },
    });
    expect(opts.dotsOptions.gradient).toBeUndefined();
    expect(opts.image).toBeUndefined();
  });

  it("scales the margin with the output size so exports match the preview", () => {
    const opts = toQrOptions("x", { ...DEFAULT_STYLE, margin: 12 }, { size: 1200 });
    expect(opts.margin).toBe(48);
  });

  it("builds a two-stop gradient with rotation in radians", () => {
    const style = { ...DEFAULT_STYLE, gradient: true, dotColor: "#111111", gradientColor: "#222222", gradientType: "linear", gradientRotation: 90 };
    const { dotsOptions } = toQrOptions("x", style, { size: 300 });
    expect(dotsOptions.gradient).toEqual({
      type: "linear",
      rotation: Math.PI / 2,
      colorStops: [
        { offset: 0, color: "#111111" },
        { offset: 1, color: "#222222" },
      ],
    });
  });

  it("uses a transparent background when asked", () => {
    const opts = toQrOptions("x", { ...DEFAULT_STYLE, transparentBg: true }, { size: 300, extension: "png" });
    expect(opts.backgroundOptions.color).toBe("transparent");
  });

  it("falls back to the background colour for JPEG, which cannot be transparent", () => {
    const opts = toQrOptions("x", { ...DEFAULT_STYLE, transparentBg: true, bgColor: "#fafafa" }, { size: 300, extension: "jpeg" });
    expect(opts.backgroundOptions.color).toBe("#fafafa");
  });

  it("adds the logo image and its size", () => {
    const opts = toQrOptions("x", { ...DEFAULT_STYLE, logo: "data:image/png;base64,AAA", logoSize: 0.25 }, { size: 300 });
    expect(opts.image).toBe("data:image/png;base64,AAA");
    expect(opts.imageOptions).toMatchObject({ imageSize: 0.25, hideBackgroundDots: true });
  });
});

describe("contrast", () => {
  it("computes WCAG contrast ratios", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 1);
    expect(contrastRatio("#ffffff", "#ffffff")).toBeCloseTo(1, 5);
    expect(contrastRatio("#777777", "#ffffff")).toBeCloseTo(4.48, 1);
  });

  it("accepts 3-digit hex", () => {
    expect(contrastRatio("#000", "#fff")).toBeCloseTo(21, 1);
  });

  it("uses the weakest colour against the background, including gradient and corners", () => {
    const style = { ...DEFAULT_STYLE, dotColor: "#000000", gradient: true, gradientColor: "#eeeeee", cornerColor: "#000000", bgColor: "#ffffff" };
    expect(lowestContrast(style)).toBeCloseTo(contrastRatio("#eeeeee", "#ffffff"), 5);
  });

  it("measures against white when the background is transparent", () => {
    const style = { ...DEFAULT_STYLE, dotColor: "#000000", cornerColor: "#000000", gradient: false, bgColor: "#000000", transparentBg: true };
    expect(lowestContrast(style)).toBeCloseTo(21, 1);
  });
});

describe("PRESETS", () => {
  it("only touch colour and shape settings, never content, logo or margin", () => {
    const allowed = new Set([
      "dotType", "dotColor", "gradient", "gradientColor", "gradientType", "gradientRotation",
      "cornerSquareType", "cornerDotType", "cornerColor", "bgColor", "transparentBg",
    ]);
    for (const preset of PRESETS) {
      for (const key of Object.keys(preset.style)) expect(allowed.has(key)).toBe(true);
    }
  });

  it("all keep a scannable contrast of at least 3:1", () => {
    for (const preset of PRESETS) {
      expect(lowestContrast({ ...DEFAULT_STYLE, ...preset.style })).toBeGreaterThanOrEqual(3);
    }
  });
});
