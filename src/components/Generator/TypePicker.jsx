import Icon from "../Icon";
import { QR_TYPES } from "../../lib/qrTypes";

export default function TypePicker({ value, onChange }) {
  return (
    <div className="type-picker" role="group" aria-label="What should the code open?">
      {QR_TYPES.map((type) => (
        <button
          key={type.id}
          type="button"
          className="type-picker__item"
          aria-pressed={value === type.id}
          onClick={() => onChange(type.id)}
        >
          <Icon name={type.id} size={22} />
          <span>{type.label}</span>
        </button>
      ))}
    </div>
  );
}
