import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import logofordark from '../../assets/logofordark.png'
import logoforlight from '../../assets/logoforlight.png'
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

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

  // FOR DARK MODE
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('light'); // Set to 'light' if preferred color scheme is dark
    } else {
      setTheme('dark'); // Set to 'dark' if preferred color scheme is light or not specified
    }

  }, [])

  useEffect(() =>{
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

  }, [theme])

  const handleThemeSwitch = () => {
    setTheme(theme === "dark"? "light" : "dark");
  };
  // FOR DARK MODE

  return (
    <>
      <nav className="dark:bg-gradient-to-r to-slate-900 from-[#000000]/95 from-40% dark:shadow-lg dark:shadow-blue-500/30 ">
        <div className="logo">
          <NavLink to="/">
          <img src={theme === "dark" ? logofordark : logoforlight} alt="" /> 
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
              isPending ? "active " : isActive ? "activepage dark:text-white" : "dark:text-white"
            }
            to="/"
            current="activepage"
          >
            Product
          </NavLink>
          <NavLink className={({ isActive, isPending }) =>
              isPending ? "active dark:text-white" : isActive ? "activepage dark:text-white" : "dark:text-white"
            } to="/pricing">
            Pricing
          </NavLink>
          <NavLink className={({ isActive, isPending }) =>
              isPending ? "active" : isActive ? "activepage " : ""
            } to="/">
            Solution
          </NavLink>
          <a
            className="active dark:text-white"
            href="https://github.com/bishalde/Qr-Code-Generator"
          >
            Github
          </a>
        </div>

        <div className={navbuttonsvlue}>
          
          <div  onClick={handleThemeSwitch} className="text-3xl border rounded-full border-lg border-black dark:border dark:border-lg dark:rounded-full dark:border-yellow-500 p-1 cursor-pointer hover:scale-110 transition-all dark:text-yellow-400 text-center self-center">{theme === "dark" ? <MdLightMode /> : <MdDarkMode />}</div>
          <button className="btn dark:bg-transparent transition-none dark:text-white">Sign In</button>
          <button className="btn btn-secondary">Sign Up</button>

        </div>
      </nav>
    </>
  );
};

export default Navbar;
