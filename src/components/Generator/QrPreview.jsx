import { useDeferredValue, useEffect, useMemo, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { toQrOptions } from "../../lib/qrOptions";

const PLACEHOLDER = "https://qrbuilder.vercel.app";

// Live preview. The four square handles echo the selection box in the page's hero.
export default function QrPreview({ data, style }) {
  const mountRef = useRef(null);
  const options = useDeferredValue(useMemo(() => toQrOptions(data || PLACEHOLDER, style), [data, style]));

  // qr-code-styling's update() deep-merges options, so a removed gradient or logo
  // would linger. Draw a fresh code on every change instead.
  useEffect(() => {
    const mount = mountRef.current;
    const qr = new QRCodeStyling(options);
    mount.replaceChildren();
    qr.append(mount);
    return () => mount.replaceChildren();
  }, [options]);

  return (
    <div className={`stage${data ? "" : " stage--empty"}`}>
      <div className="stage__frame">
        <span className="handle handle--tl" />
        <span className="handle handle--tr" />
        <span className="handle handle--bl" />
        <span className="handle handle--br" />
        <div
          ref={mountRef}
          className="stage__code"
          role="img"
          aria-label={data ? "Preview of your QR code" : "Example QR code. Fill in the form to make your own."}
        />
      </div>
      {!data && <p className="stage__hint">Fill in the form to make your code.</p>}
    </div>
  );
}
