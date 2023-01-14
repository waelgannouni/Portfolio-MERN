import React,{useEffect,useState} from 'react'
import {IonIcon} from "@ionic/react";
import axios  from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { calendarOutline, chevronDown,chevronUp,locationOutline,logoFacebook,logoGithub,logoInstagram,logoLinkedin,logoTwitter,mailOutline, phonePortraitOutline } from "ionicons/icons";

import { useParams } from "react-router-dom";

function Sidebar(props) {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState("");

 
  return (
    <aside className="sidebar card">

    <div className="sidebar-info">
      <figure className="avatar-box">
        <img src={props.user.userphoto} alt="User photo" className='user-img'/>
      </figure>
      <div className="info-content">
       <Link to={`/profile/${props.user._id}`}>
        <h1 className="name">{props.user.fullname}</h1>
        </Link>
        <p className="title">{props.user.job}</p>
      </div>
      <ul className="social-list">
       {props.user.facebook && <li className="social-item">
          <a href={props.user.facebook} className="social-link">
            <IonIcon icon={logoFacebook}></IonIcon>
          </a>
        </li>}

        {props.user.linkedin && <li className="social-item">
          <a href="#" className="social-link">
            <IonIcon icon={logoLinkedin}></IonIcon>

          </a>
        </li>}


        {props.user.instagram && <li className="social-item">
          <a href="#" className="social-link">
          <IonIcon icon={logoInstagram}></IonIcon>
          </a>
        </li>}
        
        {props.user.github && <li className="social-item">
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