import { useState } from "react";
import { ColorField, Disclosure, Range, Segmented, Toggle } from "../ui/controls";
import Icon from "../Icon";
import { CORNER_DOT_TYPES, CORNER_SQUARE_TYPES, DOT_TYPES, EC_LEVELS, PRESETS } from "../../lib/qrOptions";
import { fileToLogo } from "../../lib/image";

function Presets({ style, onApply }) {
  const active = PRESETS.find((p) => Object.entries(p.style).every(([k, v]) => style[k] === v));
  return (
    <div className="presets" role="group" aria-label="Color themes">
      {PRESETS.map((preset) => {
        const fg = preset.style.gradient
          ? `linear-gradient(135deg, ${preset.style.dotColor}, ${preset.style.gradientColor})`
          : preset.style.dotColor;
        return (
          <button
            key={preset.id}
            type="button"
            className="preset"
            aria-pressed={active?.id === preset.id}
            onClick={() => onApply(preset.style)}
          >
            <span className="preset__swatch" style={{ background: preset.style.bgColor }}>
              <span style={{ background: fg }} />
              <span style={{ background: preset.style.cornerColor }} />
            </span>
            {preset.label}
          </button>
        );
      })}
    </div>
  );
}

export default function StylePanel({ style, onChange }) {
  const [logoError, setLogoError] = useState("");
  const [logoNote, setLogoNote] = useState("");
  const set = (key) => (value) => onChange({ [key]: value });

  const uploadLogo = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setLogoError("");
    try {
      const logo = await fileToLogo(file);
      const raise = style.ecLevel === "L" || style.ecLevel === "M";
      onChange(raise ? { logo, ecLevel: "H" } : { logo });
      setLogoNote(raise ? "Error correction raised to Highest so the code still scans with a logo on top." : "");
    } catch (err) {
      setLogoError(err.message);
    }
  };

  return (
    <div className="style-panel">
      <Disclosure title="Colors and shape" summary="Themes, dots, corners, background" defaultOpen>
        <Presets style={style} onApply={onChange} />

        <Segmented label="Dots" name="dotType" value={style.dotType} options={DOT_TYPES} onChange={set("dotType")} />

        <div className="row">
          <ColorField label={style.gradient ? "Start color" : "Dot color"} value={style.dotColor} onChange={set("dotColor")} />
          {style.gradient && <ColorField label="End color" value={style.gradientColor} onChange={set("gradientColor")} />}
        </div>
        <Toggle label="Use a gradient" checked={style.gradient} onChange={set("gradient")} />
        {style.gradient && (
          <div className="row row--align-end">
            <Segmented
              label="Gradient"
              name="gradientType"
              value={style.gradientType}
              options={[{ value: "linear", label: "Linear" }, { value: "radial", label: "Radial" }]}
              onChange={set("gradientType")}
            />
            {style.gradientType === "linear" && (
              <Range label="Angle" value={style.gradientRotation} min={0} max={360} step={15} format={(v) => `${v}°`} onChange={set("gradientRotation")} />
            )}
          </div>
        )}

        <div className="row">
          <Segmented label="Corner frames" name="cornerSquareType" value={style.cornerSquareType} options={CORNER_SQUARE_TYPES} onChange={set("cornerSquareType")} />
          <Segmented label="Corner centers" name="cornerDotType" value={style.cornerDotType} options={CORNER_DOT_TYPES} onChange={set("cornerDotType")} />
        </div>

        <div className="row">
          <ColorField label="Corner color" value={style.cornerColor} onChange={set("cornerColor")} />
          <ColorField label="Background" value={style.bgColor} disabled={style.transparentBg} onChange={set("bgColor")} />
        </div>
        <Toggle label="Transparent background (PNG and SVG)" checked={style.transparentBg} onChange={set("transparentBg")} />
      </Disclosure>

      <Disclosure title="Logo" summary={style.logo ? "Logo added" : "Put your logo in the middle"}>
        <div className="logo-picker">
          {style.logo ? (
            <img className="logo-picker__thumb" src={style.logo} alt="Your logo" />
          ) : (
            <span className="logo-picker__thumb logo-picker__thumb--empty" aria-hidden="true">
              <Icon name="upload" />
            </span>
          )}
          <div className="logo-picker__actions">
            <label className="btn btn--ghost">
              <input type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" onChange={uploadLogo} className="visually-hidden" />
              {style.logo ? "Replace logo" : "Upload logo"}
            </label>
            {style.logo && (
              <button type="button" className="btn btn--quiet" onClick={() => { onChange({ logo: null }); setLogoNote(""); }}>
                Remove
              </button>
            )}
          </div>
        </div>
        {logoError && <p className="note note--error" role="alert">{logoError}</p>}
        {logoNote && <p className="note">{logoNote}</p>}
        {style.logo && (
          <Range label="Logo size" value={style.logoSize} min={0.15} max={0.45} step={0.05} format={(v) => `${Math.round(v * 100)}%`} onChange={set("logoSize")} />
        )}
        <p className="field__hint">PNG, JPEG, SVG or WebP. Square logos with a transparent background look best.</p>
      </Disclosure>

      <Disclosure title="Advanced" summary="Error correction, margin">
        <Segmented label="Error correction" name="ecLevel" value={style.ecLevel} options={EC_LEVELS} onChange={set("ecLevel")} />
        <p className="field__hint">{EC_LEVELS.find((l) => l.value === style.ecLevel).hint} Higher levels scan better when printed small or partly covered.</p>
        <Range label="Margin" value={style.margin} min={0} max={40} format={(v) => `${v}px`} onChange={set("margin")} />
      </Disclosure>
    </div>
  );
}
