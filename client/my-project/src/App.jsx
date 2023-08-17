import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Components/Register'
import Login from './Components/Login'
import EditForm from './Pages/Editform'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/edit/:id" element={<EditForm />} />
        <Route path="/edit" element={<EditForm />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App