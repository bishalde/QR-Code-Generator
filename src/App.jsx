import React from 'react'
import './App.css'
import './output.css'
import HomePage from './components/HomePage'
import PricingPage from './components/PricingPage'
import Auth from './components/Authentication/Auth'
import { Route, Routes } from "react-router-dom"


function App() {
  return (
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/signin" element={<Auth />} />
    </Routes>
  )
}

export default App
