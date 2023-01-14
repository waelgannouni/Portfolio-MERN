import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile/Profile'
import UserProfile from './pages/userportfolio/UserProfile'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'



export default function App(){
  return(
    <BrowserRouter>
      <Routes>
          <Route exact path="/register" element={<Register/>}></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/profile" element={<Profile/>}></Route>
          <Route exact path="/profile/:id" element={<UserProfile/>}></Route>
          <Route exact path="/" element={<Home/>}></Route>
          
      
      </Routes>
    </BrowserRouter>
  )
}

