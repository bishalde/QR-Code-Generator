import { useMemo, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import TypePicker from "./TypePicker";
import QrTypeForm from "./QrTypeForm";
import StylePanel from "./StylePanel";
import QrPreview from "./QrPreview";
import ExportBar from "./ExportBar";
import History from "./History";
import Icon from "../Icon";
import useQrHistory from "../../hooks/useQrHistory";
import { QR_TYPES, buildQrData, emptyFields } from "../../lib/qrTypes";
import { DEFAULT_STYLE, lowestContrast, toQrOptions } from "../../lib/qrOptions";
import { blobToDataUrl } from "../../lib/image";
import "./Generator.css";

const initialFields = () => Object.fromEntries(QR_TYPES.map((t) => [t.id, emptyFields(t.id)]));

async function thumbnail(data, style) {
  const qr = new QRCodeStyling({ ...toQrOptions(data, style, { size: 144 }), type: "canvas" });
  return blobToDataUrl(await qr.getRawData("png"));
}

export default function Generator() {
  const [typeId, setTypeId] = useState("url");
  const [fields, setFields] = useState(initialFields);
  const [style, setStyle] = useState(DEFAULT_STYLE);
  const history = useQrHistory();
  const topRef = useRef(null);

  const data = useMemo(() => buildQrData(typeId, fields[typeId]), [typeId, fields]);
  const lowContrast = lowestContrast(style) < 3;

  const updateStyle = (patch) => setStyle((s) => ({ ...s, ...patch }));

  const save = async () => {
    history.add({
      id: Date.now(),
      createdAt: Date.now(),
      type: typeId,
      fields: fields[typeId],
      style,
      data,
      thumb: await thumbnail(data, style),
    });
  };

  const restore = (entry) => {
    setTypeId(entry.type);
    setFields((all) => ({ ...all, [entry.type]: { ...emptyFields(entry.type), ...entry.fields } }));
    setStyle({ ...DEFAULT_STYLE, ...entry.style });
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="create" className="generator" ref={topRef} aria-labelledby="create-title">
      <div className="generator__intro">
        <h2 id="create-title">Create your code</h2>
        <p>Choose what happens when someone scans it.</p>
      </div>

      <TypePicker value={typeId} onChange={setTypeId} />

      <div className="workspace">
        <div className="editor">
          <div className="editor__content">
            <QrTypeForm
              typeId={typeId}
              values={fields[typeId]}
              onChange={(values) => setFields((all) => ({ ...all, [typeId]: values }))}
            />
          </div>
          <StylePanel style={style} onChange={updateStyle} />
        </div>

        <aside className="preview-column" aria-label="Preview and download">
          <div className="preview-column__sticky">
            <QrPreview data={data} style={style} />
            {lowContrast && (
              <p className="note note--warn">
                <Icon name="warning" size={18} />
                These colors are close together, so some phones may not scan the code. Make the dots darker or the background lighter.
              </p>
            )}
            <ExportBar data={data} style={style} typeId={typeId} onSave={save} />
          </div>
        </aside>
      </div>

      <History
        items={history.items}
        persisted={history.persisted}
        onRestore={restore}
        onRemove={history.remove}
        onClear={history.clear}
      />
    </section>
  );
}
