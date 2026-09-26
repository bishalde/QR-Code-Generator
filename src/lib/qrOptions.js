// The editor's style settings, the ready-made presets, and the mapping from
// those settings onto qr-code-styling's options object.

// Margin is stored in pixels for a 300px code and scaled for other sizes.
const BASE_SIZE = 300;

export const DEFAULT_STYLE = {
  dotType: "rounded",
  dotColor: "#0a3bbf",
  gradient: false,
  gradientColor: "#3d7bff",
  gradientType: "linear",
  gradientRotation: 45,
  cornerSquareType: "extra-rounded",
  cornerDotType: "dot",
  cornerColor: "#061f73",
  bgColor: "#ffffff",
  transparentBg: false,
  margin: 12,
  ecLevel: "Q",
  logo: null,
  logoSize: 0.3,
};

export const DOT_TYPES = [
  { value: "square", label: "Square" },
  { value: "rounded", label: "Rounded" },
  { value: "extra-rounded", label: "Soft" },
  { value: "dots", label: "Dots" },
  { value: "classy", label: "Classy" },
  { value: "classy-rounded", label: "Classy round" },
];

export const CORNER_SQUARE_TYPES = [
  { value: "square", label: "Square" },
  { value: "extra-rounded", label: "Rounded" },
  { value: "dot", label: "Circle" },
];

export const CORNER_DOT_TYPES = [
  { value: "square", label: "Square" },
  { value: "dot", label: "Circle" },
];

export const EC_LEVELS = [
  { value: "L", label: "Low", hint: "Recovers 7% damage. Smallest code." },
  { value: "M", label: "Medium", hint: "Recovers 15% damage." },
  { value: "Q", label: "High", hint: "Recovers 25% damage." },
  { value: "H", label: "Highest", hint: "Recovers 30% damage. Best with a logo." },
];

export const PRESETS = [
  {
    id: "blueprint",
    label: "Blueprint",
    style: {
      dotType: "rounded", dotColor: "#0a3bbf", gradient: false,
      cornerSquareType: "extra-rounded", cornerDotType: "dot", cornerColor: "#061f73",
      bgColor: "#ffffff", transparentBg: false,
    },
  },
  {
    id: "classic",
    label: "Classic",
    style: {
      dotType: "square", dotColor: "#000000", gradient: false,
      cornerSquareType: "square", cornerDotType: "square", cornerColor: "#000000",
      bgColor: "#ffffff", transparentBg: false,
    },
  },
  {
    id: "sky",
    label: "Sky",
    style: {
      dotType: "dots", dotColor: "#0b1f4d", gradient: false,
      cornerSquareType: "extra-rounded", cornerDotType: "dot", cornerColor: "#0a3bbf",
      bgColor: "#e3ecff", transparentBg: false,
    },
  },
  {
    id: "sunset",
    label: "Sunset",
    style: {
      dotType: "classy-rounded", dotColor: "#d9480f", gradient: true, gradientColor: "#a61e4d",
      gradientType: "linear", gradientRotation: 45,
      cornerSquareType: "extra-rounded", cornerDotType: "dot", cornerColor: "#a61e4d",
      bgColor: "#fff8f3", transparentBg: false,
    },
  },
  {
    id: "forest",
    label: "Forest",
    style: {
      dotType: "extra-rounded", dotColor: "#14532d", gradient: false,
      cornerSquareType: "dot", cornerDotType: "dot", cornerColor: "#166534",
      bgColor: "#f0f7f1", transparentBg: false,
    },
  },
  {
    id: "grape",
    label: "Grape",
    style: {
      dotType: "dots", dotColor: "#5b21b6", gradient: true, gradientColor: "#be185d",
      gradientType: "radial", gradientRotation: 0,
      cornerSquareType: "extra-rounded", cornerDotType: "dot", cornerColor: "#5b21b6",
      bgColor: "#ffffff", transparentBg: false,
    },
  },
];

function fill(style, color) {
  if (!style.gradient) return { color };
  return {
    gradient: {
      type: style.gradientType,
      rotation: (style.gradientRotation * Math.PI) / 180,
      colorStops: [
        { offset: 0, color },
        { offset: 1, color: style.gradientColor },
      ],
    },
  };
}

// `extension` matters only for export: JPEG has no alpha channel, so a
// transparent background would come out black.
export function toQrOptions(data, style, { size = BASE_SIZE, extension } = {}) {
  const transparent = style.transparentBg && extension !== "jpeg";
  return {
    width: size,
    height: size,
    type: "svg",
    data,
    margin: Math.round((style.margin * size) / BASE_SIZE),
    qrOptions: { errorCorrectionLevel: style.ecLevel },
    dotsOptions: { type: style.dotType, ...fill(style, style.dotColor) },
    cornersSquareOptions: { type: style.cornerSquareType, color: style.cornerColor },
    cornersDotOptions: { type: style.cornerDotType, color: style.cornerColor },
    backgroundOptions: { color: transparent ? "transparent" : style.bgColor },
    image: style.logo || undefined,
    imageOptions: { hideBackgroundDots: true, imageSize: style.logoSize, margin: 4, crossOrigin: "anonymous" },
  };
}

function luminance(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = [...h].map((c) => c + c).join("");
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// Worst-case contrast between any foreground colour and the background.
// A transparent code is judged against white, the most common thing it lands on.
export function lowestContrast(style) {
  const bg = style.transparentBg ? "#ffffff" : style.bgColor;
  const colors = [style.dotColor, style.cornerColor];
  if (style.gradient) colors.push(style.gradientColor);
  return Math.min(...colors.map((c) => contrastRatio(c, bg)));
}
