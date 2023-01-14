import React, {useState} from 'react'
import {IonIcon} from "@ionic/react"
import {logInOutline } from "ionicons/icons"
import {Link,useNavigate} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import axios from 'axios'


function Login() {
  const navigate=useNavigate();
  const [values,setValues]=useState({
      email:"",
      password:"",
  });

  const generateError=(err)=> 
      toast.error(err,{
          position:"bottom-right",
      })  

  const HandleSubmit =async (e)=>{
      e.preventDefault();
      try{
          const{data}=await axios.post("http://localhost:3060/login",{
              ...values,
          },{
              withCredentials:true,
          });
          if(data){
              if(data.errors){
                  const {email,password}=data.errors;
                      if (email)generateError(email);
                      else if (password)generateError(password);
              }
              else {
                  navigate('/');                  }
          }
      }catch(err){
          console.log(err)

      }
  }
  return (
    <article className="signin active">
    <section className="contact-form">
            <h3 className="h3 form-title">Welcome back !</h3>
            <form onSubmit={(e)=>HandleSubmit(e)} action="#" className="form" data-form>
                <div className="input-wrappersignin">
                <input type="email" name="email" className="form-input" placeholder="Email address" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} required  />
                <input type="password" name="password" className="form-input" placeholder="Password" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} required />
                </div>
                <button className="sign-btn" type="submit" >
                <IonIcon icon={logInOutline}></IonIcon>
                <span>Sign IN</span>
                </button>
                <p className='input-link'>Don't have an account ?<span><Link to="/register">&nbsp; Sign Up</Link></span></p>
            </form>
            </section>
        <ToastContainer/>

    </article>
  )
}

export default Login