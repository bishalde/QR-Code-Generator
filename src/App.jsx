import React from 'react'
import './App.css'
import HomePage from './components/HomePage'
import PricingPage from './components/PricingPage'
import ContactUsPage from './components/ContactUsPage'

import { Route, Routes } from "react-router-dom"
function App() {
  return (
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/contactUs" element={<ContactUsPage />} />
    </Routes>
  )
}

export default App
