import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Icon from "../Icon";
import useTheme from "../../hooks/useTheme";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location]);

  const linkClass = ({ isActive }) => (isActive ? "activepage" : "");

  return (
    <nav className="navbar">
      <Link to="/" className="brand" aria-label="QRBuilder home">
        <img src="/logos/SymbolLogo-removebg-preview.png" alt="" width="36" height="36" />
        <span>QRBuilder</span>
      </Link>

      <div className={`nav-links${menuOpen ? " is-open" : ""}`} id="nav-links">
        <NavLink className={linkClass} to="/" end>
          Product
        </NavLink>
        <a href="/#create" onClick={() => setMenuOpen(false)}>
          Create
        </a>
        <a href="https://github.com/bishalde/Qr-Code-Generator" target="_blank" rel="noreferrer">
          <Icon name="github" size={18} />
          GitHub
        </a>
      </div>

      <div className="nav-actions">
        <button
          type="button"
          className="icon-btn"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={theme === "dark" ? "Light mode" : "Dark mode"}
        >
          <Icon name={theme === "dark" ? "sun" : "moon"} />
        </button>
        <button
          type="button"
          className="icon-btn nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
