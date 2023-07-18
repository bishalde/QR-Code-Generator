import React from 'react'
import Navbar from './Navbar/Navbar'
import Homebox from './Homebox/Homebox'
import Contentbox from './Contentbox/Contentbox'

function HomePage(props) {
  return (
    <>
    <Navbar />
    <Homebox />
    <Contentbox />
    </>
  )
}

export default HomePage