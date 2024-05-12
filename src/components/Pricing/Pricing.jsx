import React from 'react'
import './Pricing.css'

const Pricing = () => {
  return (
    <>
    <div className='dark:text-white dark:bg-gradient-to-r from-slate-900 to-[#000000] h-[100vh]'>
        <h1 className='pricingbox__title dark:text-white'>Our Plans</h1>
        <section className="pricingbox pt-0">
            <div className="priceplans">
                <h3>Basic</h3>
                <h5>Unlimited usage and <br /> advanced features</h5>
                <p>$10 <span>/month</span></p>
                <button className="btn">subscribe</button>
                <ul>
                    <li>Unlimited Static Codes</li>
                    <li>Save QR Codes</li>
                    <li>Unlimited Dynamic Codes</li>
                    <li>Download Codes in JPEG</li>
                </ul>
            </div>


            <div className="priceplans">
                <h3>Starters</h3>
                <h5>Unlimited usage and <br /> advanced features</h5>
                <p>$15 <span>/month</span></p>
                <button className="btn btn-secondary">subscribe</button>
                <ul>
                    <li>10 Dynamic Codes</li>
                    <li>Advanced Code Types</li>
                    <li>Scan Analysis</li>
                    <li>High Quality Downloads</li>
                </ul>
            </div>

            <div className="priceplans">
                <h3>Professionals</h3>
                <h5>Unlimited usage and <br /> advanced features</h5>
                <p>$85 <span>/month</span></p>
                <button className="btn ">subscribe</button>
                <ul>
                    <li>Unlimited Dynamic Codes</li>
                    <li>Account Management</li>
                    <li>Create folders</li>
                    <li>Generates Lables</li>
                </ul>
            </div>
        </section>
    </div>
    </>
  )
}

export default Pricing