import React from 'react'
import Navbar from './Navbar/Navbar'
import Homebox from './Homebox/Homebox'
import Contentbox from './Contentbox/Contentbox'
import Footer from './Footer/Footer'

function HomePage(props) {
  return (
    <>
    <Navbar />
    <Homebox />
    <Contentbox />
    <Footer/>
    </>
  )
}

export default HomePage