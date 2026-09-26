// Content types a QR code can hold, the form fields each one needs, and the
// payload string each one encodes to. Kept free of React so it can be tested.

export const QR_TYPES = [
  {
    id: "url",
    label: "Link",
    fields: [
      { name: "url", label: "Website address", type: "url", placeholder: "example.com/menu", required: true },
    ],
  },
  {
    id: "text",
    label: "Text",
    fields: [
      { name: "text", label: "Text", type: "textarea", placeholder: "Anything you want people to read", required: true },
    ],
  },
  {
    id: "email",
    label: "Email",
    fields: [
      { name: "to", label: "Send to", type: "email", placeholder: "hello@example.com", required: true },
      { name: "subject", label: "Subject", type: "text", placeholder: "Optional" },
      { name: "body", label: "Message", type: "textarea", placeholder: "Optional" },
    ],
  },
  {
    id: "phone",
    label: "Phone",
    fields: [
      { name: "phone", label: "Phone number", type: "tel", placeholder: "+1 555 010 2030", required: true },
    ],
  },
  {
    id: "sms",
    label: "SMS",
    fields: [
      { name: "phone", label: "Phone number", type: "tel", placeholder: "+1 555 010 2030", required: true },
      { name: "message", label: "Message", type: "textarea", placeholder: "Optional" },
    ],
  },
  {
    id: "wifi",
    label: "Wi-Fi",
    fields: [
      { name: "ssid", label: "Network name", type: "text", placeholder: "Cafe Guest", required: true },
      { name: "password", label: "Password", type: "text", placeholder: "Leave blank for open networks" },
      {
        name: "encryption",
        label: "Security",
        type: "select",
        default: "WPA",
        options: [
          { value: "WPA", label: "WPA / WPA2 / WPA3" },
          { value: "WEP", label: "WEP" },
          { value: "nopass", label: "None (open network)" },
        ],
      },
      { name: "hidden", label: "Hidden network", type: "checkbox", default: false },
    ],
  },
  {
    id: "vcard",
    label: "Contact",
    fields: [
      { name: "firstName", label: "First name", type: "text", placeholder: "Ada", half: true },
      { name: "lastName", label: "Last name", type: "text", placeholder: "Lovelace", half: true },
      { name: "org", label: "Company", type: "text", placeholder: "Optional", half: true },
      { name: "title", label: "Job title", type: "text", placeholder: "Optional", half: true },
      { name: "phone", label: "Phone", type: "tel", placeholder: "+44 20 7946 0000", half: true },
      { name: "email", label: "Email", type: "email", placeholder: "ada@example.com", half: true },
      { name: "website", label: "Website", type: "url", placeholder: "Optional" },
      { name: "address", label: "Address", type: "text", placeholder: "Optional" },
    ],
  },
  {
    id: "location",
    label: "Location",
    fields: [
      { name: "lat", label: "Latitude", type: "number", placeholder: "51.5007", half: true, required: true },
      { name: "lng", label: "Longitude", type: "number", placeholder: "-0.1246", half: true, required: true },
    ],
  },
];

export function getType(id) {
  return QR_TYPES.find((t) => t.id === id);
}

export function emptyFields(typeId) {
  const type = getType(typeId);
  if (!type) return {};
  return Object.fromEntries(
    type.fields.map((f) => [f.name, f.default ?? (f.type === "checkbox" ? false : "")])
  );
}

export function escapeWifi(value) {
  return value.replace(/([\\;,:"])/g, "\\$1");
}

export function escapeVcard(value) {
  return value.replace(/([\\;,])/g, "\\$1").replace(/\n/g, "\\n");
}

const clean = (value) => (typeof value === "string" ? value.trim() : "");
const digitsOnly = (value) => clean(value).replace(/[^\d+]/g, "");

function inRange(value, limit) {
  const text = clean(value);
  if (text === "") return null;
  const n = Number(text);
  return Number.isFinite(n) && Math.abs(n) <= limit ? text : null;
}

const builders = {
  url({ url }) {
    const value = clean(url);
    if (!value) return "";
    return /^[a-z][a-z\d+.-]*:/i.test(value) ? value : `https://${value}`;
  },

  text({ text }) {
    return clean(text) ? text : "";
  },

  email({ to, subject, body }) {
    const address = clean(to);
    if (!address) return "";
    const params = [
      clean(subject) && `subject=${encodeURIComponent(subject.trim())}`,
      clean(body) && `body=${encodeURIComponent(body.trim())}`,
    ].filter(Boolean);
    return `mailto:${address}${params.length ? `?${params.join("&")}` : ""}`;
  },

  phone({ phone }) {
    const number = digitsOnly(phone);
    return number ? `tel:${number}` : "";
  },

  sms({ phone, message }) {
    const number = digitsOnly(phone);
    return number ? `SMSTO:${number}:${clean(message)}` : "";
  },

  wifi({ ssid, password, encryption, hidden }) {
    const name = clean(ssid);
    if (!name) return "";
    const security = encryption || "WPA";
    let data = `WIFI:T:${security};S:${escapeWifi(name)};`;
    if (security !== "nopass" && password) data += `P:${escapeWifi(password)};`;
    if (hidden) data += "H:true;";
    return `${data};`;
  },

  vcard(f) {
    const first = clean(f.firstName);
    const last = clean(f.lastName);
    if (!first && !last) return "";
    const line = (key, value) => (clean(value) ? `${key}:${escapeVcard(clean(value))}` : null);
    return [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${escapeVcard(last)};${escapeVcard(first)};;;`,
      `FN:${escapeVcard([first, last].filter(Boolean).join(" "))}`,
      line("ORG", f.org),
      line("TITLE", f.title),
      line("TEL;TYPE=CELL", f.phone),
      line("EMAIL", f.email),
      line("URL", f.website),
      clean(f.address) ? `ADR;TYPE=WORK:;;${escapeVcard(clean(f.address))};;;;` : null,
      "END:VCARD",
    ].filter(Boolean).join("\n");
  },

  location({ lat, lng }) {
    const latitude = inRange(lat, 90);
    const longitude = inRange(lng, 180);
    return latitude !== null && longitude !== null ? `geo:${latitude},${longitude}` : "";
  },
};

// Returns the string to encode, or "" when the required fields are not filled in.
export function buildQrData(typeId, fields = {}) {
  const build = builders[typeId];
  return build ? build(fields) : "";
}
