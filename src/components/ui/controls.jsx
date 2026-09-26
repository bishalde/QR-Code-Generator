import { useId } from "react";
import Icon from "../Icon";

export function Field({ label, hint, children, wide = true }) {
  const id = useId();
  return (
    <div className={`field${wide ? "" : " field--half"}`}>
      <label htmlFor={id}>{label}</label>
      {children(id)}
      {hint && <p className="field__hint">{hint}</p>}
    </div>
  );
}

// A row of mutually exclusive choices, rendered as native radios for keyboard support.
export function Segmented({ label, name, value, options, onChange }) {
  return (
    <fieldset className="segmented">
      <legend>{label}</legend>
      <div className="segmented__options">
        {options.map((opt) => (
          <label key={opt.value} className={value === opt.value ? "is-selected" : ""} title={opt.hint}>
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ColorField({ label, value, onChange, disabled }) {
  const id = useId();
  return (
    <div className={`color-field${disabled ? " is-disabled" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <div className="color-field__input">
        <input id={id} type="color" value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} />
        <span>{value.toUpperCase()}</span>
      </div>
    </div>
  );
}

export function Range({ label, value, min, max, step = 1, format = (v) => v, onChange }) {
  const id = useId();
  return (
    <div className="range">
      <div className="range__head">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>{format(value)}</output>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}

export function Toggle({ label, checked, onChange }) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="toggle__track" aria-hidden="true" />
      {label}
    </label>
  );
}

export function Disclosure({ title, summary, defaultOpen = false, children }) {
  return (
    <details className="disclosure" open={defaultOpen}>
      <summary>
        <span className="disclosure__title">{title}</span>
        {summary && <span className="disclosure__summary">{summary}</span>}
        <Icon name="chevron" size={18} className="disclosure__chevron" />
      </summary>
      <div className="disclosure__body">{children}</div>
    </details>
  );
}
