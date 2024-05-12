import React from 'react'
import './App.css'
import HomePage from './components/HomePage'
import PricingPage from './components/PricingPage'

import { Route, Routes } from "react-router-dom"
import { ThemeProvider } from './ThemeContext'
function App() {
  return (
    <div className='dark:bg-gradient-to-r from-slate-900 to-[#000000] h-full'>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </div>
  )
}

export default App
