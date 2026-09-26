import { Field, Toggle } from "../ui/controls";
import { getType } from "../../lib/qrTypes";

export default function QrTypeForm({ typeId, values, onChange }) {
  const type = getType(typeId);
  const set = (name) => (value) => onChange({ ...values, [name]: value });

  return (
    <div className="type-form">
      {type.fields.map((field) => {
        if (field.type === "checkbox") {
          return <Toggle key={field.name} label={field.label} checked={values[field.name]} onChange={set(field.name)} />;
        }
        return (
          <Field key={field.name} label={field.label} wide={!field.half}>
            {(id) =>
              field.type === "textarea" ? (
                <textarea id={id} rows={4} placeholder={field.placeholder} value={values[field.name]} onChange={(e) => set(field.name)(e.target.value)} />
              ) : field.type === "select" ? (
                <select id={id} value={values[field.name]} onChange={(e) => set(field.name)(e.target.value)}>
                  {field.options.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  type={field.type === "url" ? "text" : field.type}
                  inputMode={field.type === "url" ? "url" : field.type === "number" ? "decimal" : undefined}
                  step={field.type === "number" ? "any" : undefined}
                  autoComplete="off"
                  spellCheck={field.type === "textarea"}
                  placeholder={field.placeholder}
                  value={values[field.name]}
                  onChange={(e) => set(field.name)(e.target.value)}
                />
              )
            }
          </Field>
        );
      })}
    </div>
  );
}
