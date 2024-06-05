import React from 'react'
import Navbar from './Navbar/Navbar'
import Homebox from './Homebox/Homebox'
import Contentbox from './Contentbox/Contentbox'
import ToTopButton from './ToTop/ToTopButton'

function HomePage(props) {
  return (
    <>
    <Navbar />
    <Homebox />
    <Contentbox />
    <ToTopButton />
    </>
  )
}

export default HomePage