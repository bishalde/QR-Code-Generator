import Icon from "../Icon";
import { getType } from "../../lib/qrTypes";

const describe = (entry) => {
  const text = entry.data.replace(/^(mailto:|tel:|SMSTO:|geo:|https?:\/\/)/i, "");
  if (entry.type === "wifi") return entry.fields.ssid;
  if (entry.type === "vcard") return [entry.fields.firstName, entry.fields.lastName].filter(Boolean).join(" ");
  return text.split("\n")[0];
};

const when = (time) =>
  new Date(time).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

export default function History({ items, persisted, onRestore, onRemove, onClear }) {
  return (
    <section className="history" aria-labelledby="history-title">
      <div className="history__head">
        <h2 id="history-title">Saved codes</h2>
        {items.length > 0 && (
          <button type="button" className="btn btn--quiet" onClick={onClear}>
            Clear all
          </button>
        )}
      </div>

      {!persisted && (
        <p className="note note--error">
          This browser isn&apos;t letting the page store data, so saved codes will disappear when you close the tab.
        </p>
      )}

      {items.length === 0 ? (
        <p className="history__empty">
          Codes you save show up here so you can reopen and edit them later. They stay in this browser only.
        </p>
      ) : (
        <ul className="history__list">
          {items.map((entry) => (
            <li key={entry.id} className="history__item">
              <button type="button" className="history__open" onClick={() => onRestore(entry)}>
                <img src={entry.thumb} alt="" width="72" height="72" />
                <span className="history__meta">
                  <span className="history__type">{getType(entry.type)?.label}</span>
                  <span className="history__label">{describe(entry) || "Untitled"}</span>
                  <span className="history__time">{when(entry.createdAt)}</span>
                </span>
                <span className="visually-hidden">Open in editor</span>
              </button>
              <button type="button" className="icon-btn" onClick={() => onRemove(entry.id)} aria-label="Delete saved code">
                <Icon name="trash" size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
