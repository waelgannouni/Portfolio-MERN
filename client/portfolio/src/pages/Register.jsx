import React, {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {IonIcon} from "@ionic/react";
import {addCircleOutline, logInOutline} from "ionicons/icons";
import {ToastContainer,toast} from 'react-toastify'
import FileBase64 from 'react-file-base64';


import axios from 'axios'


function Register() {

  const navigate=useNavigate();
  const [values,setValues]=useState({
    userphoto:"",
    fullname:"",
    email:"",
    job:"",
    phone:"",
    birthday:"",
    adress:"",
    password:"",
  });
  const[repeatpassword,setRepeatpassword]=useState("");
  const generateError=(err)=> 
  toast.error(err,{
      position:"bottom-right",
  })  

  console.log(values)
  

  const HandleSubmit =async (e)=>{
    e.preventDefault();
    try{
        const{data}=await axios.post("http://localhost:3060/register",{
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
          else if(!(repeatpassword===values.password)){
            generateError("password must match");
          }
          else {
                navigate('/');                  }
        }
    }catch(err){
        console.log(err)

    }
}
  return (
    <div>
    <article className="signup active">
    <section className="contact-form">
            <h3 className="h3 form-title">Create account</h3>

            <form className="form" onSubmit={(e)=>HandleSubmit(e)}>
                <div className="fileUpload">
                    <figure className="avatar-box">
                        <img src={values.userphoto} className='User-photo' width="80"/>
                    </figure>
                    <span className='add-photo'><IonIcon icon={addCircleOutline}></IonIcon> Add Photo</span>
                    <FileBase64
                      className="image-input"
                      type="file"
                      name="userphoto"
                      multiple={false}
                      onDone={({ base64 }) => setValues({ ...values, userphoto: base64 })}
                    />
                </div>
              <div className="input-wrapper">
                <input type="text" name="fullname" minLength={4} className="form-input" placeholder="Full name" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} required  />
                <input type="email" name="email" className="form-input" placeholder="Email address" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} required  />
                <input type="text" name="job" className="form-input" placeholder="job" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} required />
                <input type="number" name="phone" minLength={4} className="form-input" placeholder="Phone" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}  />
                <input type="date" name="birthday" className="form-input" placeholder="Birth Day" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}  />
                <input type="text" name="adress" className="form-input" placeholder="Address" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}  />
                <input type="password" name="password" className="form-input" placeholder="Password" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} required />
                <input type="password" name="repeatpassword" value={repeatpassword} className="form-input" placeholder="Repeat password" onChange={(e)=>setRepeatpassword(e.target.value)} required />
                </div>
                <button className="sign-btn" type="submit">
                <IonIcon icon={logInOutline}></IonIcon>
                <span>Sign Up</span>
                </button>
                <p className='input-link'>Already have an account ? <span><Link to="/login">&nbsp; Sign IN</Link></span></p>
            </form>

            </section>
    </article>
        <ToastContainer/>
        </div>
  )
}

export default Register