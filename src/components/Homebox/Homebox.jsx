import { useState } from "react";
import { HEADLINES, pickHeadline } from "../../lib/headlines";
import { readJSON, writeJSON } from "../../lib/storage";
import "./Homebox.css";

const KEY = "qrbuilder:headline";

// Chosen once per page load, remembering the last one so a reload always shows a new headline.
function chooseHeadline() {
  const index = pickHeadline(readJSON(KEY, null));
  writeJSON(KEY, index);
  return HEADLINES[index];
}

function Homebox() {
  const [headline] = useState(chooseHeadline);

  return (
    <section className="hero">
      <div className="hero__copy">
        <h1>
          {headline.lead}{" "}
          <span className="hero__selected">
            {headline.word}
            <span className="handle handle--tl" />
            <span className="handle handle--tr" />
            <span className="handle handle--bl" />
            <span className="handle handle--br" />
          </span>
        </h1>
        <p className="hero__lede">
          Make codes for links, Wi-Fi, contact cards, emails, texts and locations. Choose the colors, shapes and logo,
          then download a PNG, JPEG or SVG. It all runs in your browser, and nothing you type is uploaded.
        </p>
        <a className="btn btn--primary btn--large" href="#create">
          Create a QR code
        </a>
      </div>
    </section>
  );
}

export default Homebox;
