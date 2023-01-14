import React,{useEffect, useState} from 'react'
import About from './portfoliopages/About'
import Portfolio from './portfoliopages/Portfolio'
import Resume from './portfoliopages/Resume'
import Sidebar from './portfoliopages/Sidebar'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignOutAlt } from "react-icons/fa";


function Profile() {
  const[active,setActive]=useState('about')
  const navigate=useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [x,setx]=useState(false)
  const [data,setData]=useState();
  const [users, setUsers] = useState([]);



 
  const verifyUser = async () => {
    if (!cookies.jwt) {
      navigate("/login");
    } else {
       await axios.post(
        "http://localhost:3060",
        {
          withCredentials: true,
        }
      ).then((res)=>{
        setData(res.data)
        console.log(data)
      });
      if (data && !data.status) {
        removeCookie("jwt");
        removeCookie("R");
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    verifyUser();
  }, [cookies, navigate, removeCookie]);
 
  const logOut = () => {
    removeCookie("jwt");
    removeCookie("R");
    navigate("/login");
  };
  
  
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

       
        <li className="navbar-item">
        <button className="navbar-link" onClick={logOut}><FaSignOutAlt/></button>
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

export default Profile