import { useEffect, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import Icon from "../Icon";
import { toQrOptions } from "../../lib/qrOptions";

const SIZES = [512, 1024, 2048];
const FORMATS = [
  { ext: "png", label: "PNG" },
  { ext: "svg", label: "SVG" },
  { ext: "jpeg", label: "JPEG" },
];

function render(data, style, size, extension) {
  return new QRCodeStyling({
    ...toQrOptions(data, style, { size, extension }),
    type: extension === "svg" ? "svg" : "canvas",
  });
}

export default function ExportBar({ data, style, typeId, onSave }) {
  const [size, setSize] = useState(1024);
  const [status, setStatus] = useState(null);
  const disabled = !data;

  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(null), 3500);
    return () => clearTimeout(timer);
  }, [status]);

  const download = async (extension) => {
    const name = `qrbuilder-${typeId}`;
    try {
      await render(data, style, size, extension).download({ name, extension });
      setStatus({ text: `Downloaded ${name}.${extension === "jpeg" ? "jpg" : extension}` });
    } catch {
      setStatus({ text: "The download didn't start. Try again, or pick another format.", error: true });
    }
  };

  const copy = async () => {
    if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined") {
      setStatus({ text: "This browser can't copy images. Download the PNG instead.", error: true });
      return;
    }
    try {
      const blob = await render(data, style, size, "png").getRawData("png");
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setStatus({ text: "Copied to clipboard" });
    } catch {
      setStatus({ text: "Copying was blocked by the browser. Download the PNG instead.", error: true });
    }
  };

  const save = async () => {
    try {
      await onSave();
      setStatus({ text: "Saved to history" });
    } catch {
      setStatus({ text: "Couldn't save this code. Try again.", error: true });
    }
  };

  return (
    <div className="export">
      <div className="export__size">
        <label htmlFor="export-size">Size</label>
        <select id="export-size" value={size} onChange={(e) => setSize(Number(e.target.value))}>
          {SIZES.map((s) => (
            <option key={s} value={s}>{s} × {s} px</option>
          ))}
        </select>
      </div>

      <div className="export__formats">
        {FORMATS.map((f, i) => (
          <button
            key={f.ext}
            type="button"
            className={i === 0 ? "btn btn--primary" : "btn btn--ghost"}
            disabled={disabled}
            onClick={() => download(f.ext)}
          >
            <Icon name="download" size={18} />
            {f.label}
          </button>
        ))}
      </div>

      <div className="export__more">
        <button type="button" className="btn btn--quiet" disabled={disabled} onClick={copy}>
          <Icon name="copy" size={18} />
          Copy image
        </button>
        <button type="button" className="btn btn--quiet" disabled={disabled} onClick={save}>
          <Icon name="save" size={18} />
          Save to history
        </button>
      </div>

      <p className={`export__status${status?.error ? " is-error" : ""}`} role="status" aria-live="polite">
        {status?.text}
      </p>
    </div>
  );
}
