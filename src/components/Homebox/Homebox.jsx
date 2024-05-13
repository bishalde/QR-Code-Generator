import React from 'react'
import './Homebox.css'

function Homebox() {
  return (
    <>
    <section className="homebox">
        <h1 className='dark:text-white'>Generate and Publish <br /> 
        <span> Dynamic  
          <div className="smallbx bx-1"></div>
          <div className="smallbx bx-2"></div>
          <div className="smallbx bx-3"></div>
          <div className="smallbx bx-4"></div>
        </span> QR Codes</h1>


        <h3 className='dark:text-gray-400'>QRBuilder is a dynamic QR code Generator. It allows user to easily create <br /> customized QR codes for sharing or embedding on their websites.
        </h3>

        <div className="homebox-btns flex">
        <img src="/images/arrow.png" />
          <a href="#userInput">
          <button className='btn-secondary'>Get Started</button>
          </a>
          <button className='btn dark:bg-transparent dark:hover:bg-blue-100'>Watch Demo</button>
        </div>
        
    </section>
    </>
  )
}

export default Homebox