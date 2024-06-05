import React from 'react'
import "./totop.css"
import ArrowUp from "../../images/arrow-up.svg"
import { useState } from 'react'

const ToTopButton = () => {
  const [visible, setVisible] = useState(false);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) setVisible(true);
    else setVisible(false);
  })

  try {
    document.getElementById('toTopButton').addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    })
  } catch (e) {
    console.log("Whoops")
  }
  
  return (
    <div id='toTopButton' className={visible ? "round-button" : "round-button-hidden"}>
        <img src={ArrowUp} className='filter-white' />
    </div>
  )
}

export default ToTopButton