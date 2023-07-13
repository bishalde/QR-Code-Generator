import React from 'react'
import './Homebox.css'

function Homebox() {
  return (
    <>
    <section className="homebox">
        <h1>Generate and Publish <br /> 
        <span> Dynamic  
          <div className="smallbx bx-1"></div>
          <div className="smallbx bx-2"></div>
          <div className="smallbx bx-3"></div>
          <div className="smallbx bx-4"></div>
        </span> QR Codes</h1>


        <h3>QRBuilder is a dynamic QR code Generator. It allows user to easily create <br /> customized QR codes for sharing or embedding on their websites.
        </h3>

        <div className="homebox-btns">
        <img src="/images/arrow.png" />
          <button className='btn-secondary'>Get Started</button>
          <button className='btn'>Watch Demo</button>
        </div>
        
    </section>
    </>
  )
}

export default Homebox