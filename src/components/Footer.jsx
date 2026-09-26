import Icon from "./Icon";

const LINKS = [
  { href: "https://bishalde.vercel.app/", label: "Portfolio", icon: "url" },
  { href: "https://www.linkedin.com/in/bishalde/", label: "LinkedIn", icon: "linkedin" },
  { href: "https://github.com/bishalde/Qr-Code-Generator", label: "Source on GitHub", icon: "github" },
];

const Footer = () => (
  <footer className="footer">
    <div className="footer__brand">
      <p className="footer__credit">
        Created with <span className="footer__heart" role="img" aria-label="love">♥</span> by{" "}
        <a href="https://bishalde.vercel.app/" target="_blank" rel="noreferrer">
          Bishal
        </a>
      </p>
      <p className="footer__note">QRBuilder is open source. Codes you make never leave your browser.</p>
    </div>
    <ul className="footer__links">
      {LINKS.map((link) => (
        <li key={link.href}>
          <a href={link.href} target="_blank" rel="noreferrer">
            <Icon name={link.icon} size={18} />
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </footer>
);

export default Footer;
