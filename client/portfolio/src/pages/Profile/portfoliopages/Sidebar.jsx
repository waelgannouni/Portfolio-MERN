import React,{useEffect,useState} from 'react'
import {IonIcon} from "@ionic/react";
import axios  from 'axios'
import { calendarOutline, chevronDown,chevronUp,locationOutline,logoFacebook,logoGithub,logoInstagram,logoLinkedin,addCircleOutline,mailOutline, phonePortraitOutline } from "ionicons/icons";
import jwt from 'jwt-decode'
import { useCookies } from 'react-cookie'
import FileBase64 from 'react-file-base64';

function Sidebar() {

  const [show, setShow] =useState(false)
  const [user,setUser]=useState("")
  const [cookies, setCookie] = useCookies([]);
  const Userid = jwt(cookies.jwt);
  const[showedit,setShowedit]=useState(false)


  useEffect(() => {
    getUser()
},[]);

  
  const getUser = async () => {
    const response = await axios.get("http://localhost:3060/users/"+Userid.id);
    setUser(response.data);
  };
  const updateUser = async () => {
    const response = await axios.patch("http://localhost:3060/users/"+Userid.id, user);
    setUser(response.data);
    setShowedit(false);
}



  return (
    <aside className={show ? "sidebar active" : "sidebar"}>

    <div className="sidebar-info">

      

    

        {showedit ? 
      <form>
         <div className="fileUpload">
                    <figure className="avatar-box">
                        <img src={user.userphoto} className='User-photo' width="80"/>
                    </figure>
                    <span className='add-photo'><IonIcon icon={addCircleOutline}></IonIcon> Add Photo</span>
                    <FileBase64
                      className="image-input"
                      type="file"
                      name="userphoto"
                      multiple={false}
                      onDone={({ base64 }) => setUser({ ...user, userphoto: base64 })}
                    />
          </div>
            <label>Full Name:</label>
            <input type="text" defaultvalue={user.fullname} onChange={(e) => setUser({ ...user, fullname: e.target.value })} />
            <label>Email:</label>
            <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            <label>Phone:</label>
            <input type="text" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
            <label>Street Adress:</label>
            <input type="text" value={user.streetAdress} onChange={(e) => setUser({ ...user, streetAdress: e.target.value })} />
            <label>Birthday:</label>
            <input type="date" value={user.birthday} onChange={(e) => setUser({ ...user, birthday: e.target.value })} />
            <label>facebook:</label>
            <input type="text" value={user.facebook} onChange={(e) => setUser({ ...user, facebook: e.target.value })} />
            <label>Instagram:</label>
            <input type="text" value={user.instagram} onChange={(e) => setUser({ ...user, instagram: e.target.value })} />
            <label>linkedin:</label>
            <input type="text" value={user.linkedin} onChange={(e) => setUser({ ...user, linkedin: e.target.value })} />
            <label>Github:</label>
            <input type="text" value={user.github} onChange={(e) => setUser({ ...user, github: e.target.value })} />
            <button className="edit-btn" onClick={updateUser}>Update</button>
            <button className="edit-btn" width="100" onClick={() => setShowedit(false)}>Cancel</button>
          </form>
        : 
        <><>
                  <figure className="avatar-box">
                    <img src={user.userphoto} alt="User photo" width="80" />
                 </figure>
            <div className="info-content">
              <h1 className="name" title="Wael gannouni">{user.fullname}</h1>

              <p className="title">{user.job}</p>
            </div>
            <button className="info_more-btn " onClick={() => setShow(!show)}>
              <span>Show Contacts</span>
              {show ? <IonIcon icon={chevronUp}></IonIcon> : <IonIcon icon={chevronDown}></IonIcon>}
            </button>

          </><>
                
              <div className={show ? "sidebar-info_more-show" : "sidebar-more-info"}>

                <div className="separator"></div>

                <ul className="contacts-list">
                  
                  <li className="contact-item">
                    <div className="icon-box">
                      <IonIcon icon={mailOutline}></IonIcon>
                    </div>

                    <div className="contact-info">
                      <p className="contact-title">Email</p>

                      <a href={"mailto:" + user.email} className="contact-link">{user.email}</a>
                    </div>

                  </li>
                  {user.phone ? 
                  <li className="contact-item">
                    <div className="icon-box">
                      <IonIcon icon={phonePortraitOutline}></IonIcon>
                    </div>
                    <div className="contact-info">
                      <p className="contact-title">Phone</p>
                      <a href={"tel:" + user.phone} className="contact-link">{user.phone}</a>
                    </div>
                  </li>
                  : null}

                  {user.birthday ? 
                  <li className="contact-item">
                    <div className="icon-box">
                      <IonIcon icon={calendarOutline}></IonIcon>
                    </div>
                    <div className="contact-info">
                      <p className="contact-title">Birthday</p>
                      <time datetime="1982-06-23">{user.birthday}</time>
                    </div>
                  </li>
                  : null}

                  {user.adress ? 
                  <li className="contact-item">
                    <div className="icon-box">
                      <IonIcon icon={locationOutline}></IonIcon>
                    </div>
                    <div className="contact-info">
                      <p className="contact-title">Location</p>
                      <address>{user.adress}</address>
                    </div>
                  </li>
                  : null}

                </ul>

                <div className="separator"></div>
                <ul className="social-list">
                  {user.facebook && <li className="social-item">
                    <a href={user.facebook} className="social-link">
                      <IonIcon icon={logoFacebook}></IonIcon>
                    </a>
                  </li>}

                  {user.linkedin && <li className="social-item">
                    <a href={user.linkedin} className="social-link">
                      <IonIcon icon={logoLinkedin}></IonIcon>

                    </a>
                  </li>}


                  {user.instagram && <li className="social-item">
                    <a href={user.instagram} className="social-link">
                      <IonIcon icon={logoInstagram}></IonIcon>
                    </a>
                  </li>}

                  {user.github && <li className="social-item">
                    <a href={user.github} className="social-link">
                      <IonIcon icon={logoGithub}></IonIcon>
                    </a>
                  </li>}

                </ul>
            <button className="edit-btn " onClick={() => setShowedit(true)}>Edit</button>

                </div></></>}

          </div>
    

  </aside>
  )
}

export default Sidebar