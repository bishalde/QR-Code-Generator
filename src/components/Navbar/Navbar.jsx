import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [navlinksvalue, setnavlinks] = useState("nav-links");
  const [navbuttonsvlue, setnavbuttons] = useState("nav-buttons");

  const location = useLocation();
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  const navbarActive = () => {
    if (navlinksvalue === "nav-links") {
      setnavlinks("nav-links activenavlinks");
      setnavbuttons("nav-buttons activenavbuttons");
    } else {
      setnavlinks("nav-links");
      setnavbuttons("nav-buttons");
    }
  };

  return (
    <>
      <nav>
        <div className="logo">
          <NavLink to="/">
            <img src="/logos/bigLogo_-_Crop-removebg-preview.png" />
          </NavLink>
        </div>

        <div className="hamberger" onClick={navbarActive}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className={navlinksvalue}>
          {/* activepage */}
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "active " : isActive ? "activepage" : ""
            }
            to="/"
            current="activepage"
          >
            Product
          </NavLink>
          <NavLink className={({ isActive, isPending }) =>
              isPending ? "active " : isActive ? "activepage" : ""
            } to="/pricing">
            Pricing
          </NavLink>
          <NavLink className={({ isActive, isPending }) =>
              isPending ? "active " : isActive ? "activepage" : ""
            } to="/">
            Solution
          </NavLink>
          <a
            className="active"
            href="https://github.com/bishalde/Qr-Code-Generator"
          >
            Github
          </a>
          <NavLink className={({ isActive, isPending }) =>
              isPending ? "active " : isActive ? "activepage" : ""
            } to="/ContactUs">
            ContactUs
          </NavLink>
        </div>

        <div className={navbuttonsvlue}>
          <button className="btn">SignIn</button>
          <button className="btn btn-secondary">SignUp</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
