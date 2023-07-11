import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Nopage from './pages/No-page'
import Login from './pages/Login'
import Register from './pages/Register'
import Pricing from './pages/Pricing'

function App() {

  return (
    <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Nopage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/pricing" element={<Pricing />} />
    </Routes>
    </div>
  )
}

export default App