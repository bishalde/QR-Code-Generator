import React ,{useState} from "react";
import "./Navbar.css";

const Navbar = () => {
  const[navlinksvalue,setnavlinks]=useState('nav-links');
  const[navbuttonsvlue,setnavbuttons]=useState('nav-buttons');

  const navbarActive=()=>{
    if(navlinksvalue==='nav-links'){
      setnavlinks('nav-links activenavlinks');
      setnavbuttons('nav-buttons activenavbuttons');
    }
    else{
      setnavlinks('nav-links');
      setnavbuttons('nav-buttons');
    }
  }

  return (
    <>
      <nav>
        <div className="logo">
          <img src="/public/logos/bigLogo_-_Crop-removebg-preview.png" />
        </div>

        <div className="hamberger" onClick={navbarActive}>
          <div></div>
          <div></div>
          <div></div>
        </div>

          <div className={navlinksvalue}>
            <a className="active" href="#">
              Product
            </a>
            <a className="active" href="#">
              Pricing
            </a>
            <a className="active" href="#">
              Solution
            </a>
            <a className="active" href="#">
              Github
            </a>
          </div>

          <div className={navbuttonsvlue}>
            <button className="btn">Sign In</button>
            <button className="btn btn-secondary">Sign Up</button>
          </div>
      </nav>
    </>
  );
};

export default Navbar;
