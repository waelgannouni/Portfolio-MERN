import React,{useState,useEffect} from 'react'
import axios  from 'axios'
import {IonIcon} from "@ionic/react";
import { bookOutline} from "ionicons/icons";
import { useParams } from "react-router-dom";

function Resume() {

  const { id } = useParams();
  const [resume,setResume]=useState("")
  
  useEffect(() => {
    getResume(id)
  },[id]);
  

  const getResume = async (id) => {
    const response = await axios.get(`http://localhost:3060/resume/${id}`);
    setResume(response.data)
  };

  console.log(resume)

 
    
  return (
    <article className="resume active" data-page="resume">

        <header>
          <h2 className="h2 article-title">Resume</h2>
        </header>

        {resume && <><section className="timeline" key={resume.id}>

          <div className="title-wrapper">
            <div className="icon-box">
              <IonIcon icon={bookOutline}></IonIcon>
            </div>

            <h3 className="h3">Education</h3>
          </div>

          <ol className="timeline-list">

            

          {resume.education && resume.education.map((education, index) => { 

            return <li className="timeline-item" key={education.id}>

              <h4 className="h4 timeline-item-title">{education.university}</h4>

              <span>{education.from} — {education.until}</span>

              <p className="timeline-text">
              {education.description}
              </p>

            </li>

          })}


          </ol>

        </section>

        <section className="timeline">

          <div className="title-wrapper">
            <div className="icon-box">
            <IonIcon icon={bookOutline}></IonIcon>
            </div>

            <h3 className="h3">Experience</h3>
          </div>

          <ol className="timeline-list">

          
            {resume.experience && resume.experience.map((experience,index) => { 

            return <li className="timeline-item" key={experience.id}>

              <h4 className="h4 timeline-item-title">{experience.company}</h4>

              <span>{experience.from} — {experience.until}</span>

              <p className="timeline-text">
              {experience.description}
              </p>

            </li>

            })}

          </ol>

        </section>

        <section className="skill">

          <h3 className="h3 skills-title">My skills</h3>

          <ul className="skills-list content-card">
          {resume.skills && resume.skills.map((skills,index) => {
            return <li className="skills-item" key={skills.id}>
              <>
              <div className="title-wrapper">
                <h5 className="h5">{skills.skill}</h5>
                <span value="80">{skills.percent}</span>
              </div>

              <div className="skill-progress-bg">
                <div className="skill-progress-fill" style={{width: `${skills.percent}%`}}></div>
              </div>
              </>
             


            </li>
            })}

         
          </ul>

        </section></>}

      </article>

  )
}

export default Resume