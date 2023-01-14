import React,{useEffect,useState} from 'react'
import {IonIcon} from "@ionic/react";
import axios  from 'axios'
import { calendarOutline, chevronDown,chevronUp,locationOutline,logoFacebook,logoGithub,logoInstagram,logoLinkedin,logoTwitter,mailOutline, phonePortraitOutline } from "ionicons/icons";

import { useParams } from "react-router-dom";

function Sidebar() {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    getUser(id);
  }, [id]);

  const getUser = async (id) => {
    const response = await axios.get(`http://localhost:3060/users/${id}`);
    setUser(response.data);
  };

  return (
    <aside className={show ? "sidebar active" : "sidebar"}>

    <div className="sidebar-info">

      <figure className="avatar-box">
        <img src={user.userphoto} alt="User photo" width="80"/>
      </figure>

      <div className="info-content">
        <h1 className="name" title="Wael gannouni">{user.fullname}</h1>

        <p className="title">{user.job}</p>
      </div>

      <button className="info_more-btn " onClick={() => setShow(!show)}>
        <span>Show Contacts</span>
        {show ? <IonIcon icon={chevronUp}></IonIcon>: <IonIcon icon={chevronDown}></IonIcon>}

        
      </button>

    </div>

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
          <a href="#" className="social-link">
            <IonIcon icon={logoLinkedin}></IonIcon>

          </a>
        </li>}


        {user.instagram && <li className="social-item">
          <a href="#" className="social-link">
          <IonIcon icon={logoInstagram}></IonIcon>
          </a>
        </li>}
        
        {user.github && <li className="social-item">
          <a href="#" className="social-link">
          <IonIcon icon={logoGithub}></IonIcon>
          </a>
        </li>}

      </ul>

    </div>

  </aside>
  )
}

export default Sidebar