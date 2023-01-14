import React from 'react'
import {IonIcon} from "@ionic/react";
import { chevronDown, eyeOutline } from "ionicons/icons";

function PortfolioCards(props) {
  return (
    <li className="project-item  active" >
    <a href="#">

      <figure className="project-img">
        <div className="project-item-icon-box">
        <IonIcon icon={eyeOutline}></IonIcon>

        </div>

        <img src={"http://localhost:3060/images/"+props.portfolio.images[0]} alt='img'/>
      </figure>

      <h3 className="project-title">{props.portfolio.title}</h3>

      <p className="project-category">{props.portfolio.categorie}</p>

    </a>
  </li>
  )
}

export default PortfolioCards