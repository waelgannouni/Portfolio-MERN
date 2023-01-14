import React,{useEffect, useState} from 'react'
import About from './portfoliopages/About'
import Portfolio from './portfoliopages/Portfolio'
import Resume from './portfoliopages/Resume'
import Sidebar from './portfoliopages/Sidebar'
import { Link, useNavigate } from 'react-router-dom'


function UserProfile() {
  const[active,setActive]=useState('about')
  const navigate=useNavigate()

 
  return (

    <>
    <main>
      <Sidebar/>
    <div className="main-content">

    <nav className="navbar">

      <ul className="navbar-list">

        <li className="navbar-item">
          <button className="navbar-link"  onClick={()=>setActive("about")} >About</button>
        </li>


        <li className="navbar-item">
          <button className="navbar-link" onClick={()=>setActive("resume")}>Resume</button>
        </li>

        <li className="navbar-item">
          <button className="navbar-link" onClick={()=>setActive("portfolio")} >Portfolio</button>
        </li>

        
       

      </ul>

    </nav>
    {active==="about" && <About/>}
    {active==="resume" && <Resume/>}
    {active==="portfolio" && <Portfolio/>}
   


    </div>
  
    </main>
    </>
  )
}

export default UserProfile