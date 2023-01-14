import React,{useState,useEffect} from 'react'
import axios  from 'axios'
import dev from '../../../images/icon-dev.svg'
import app from '../../../images/icon-app.svg'
import design from '../../../images/icon-design.svg'
import photo from '../../../images/icon-photo.svg'
import { useParams } from "react-router-dom";

function About() {
  const { id } = useParams();
  const [about,setAbout]=useState("")

  useEffect(() => {
    getAbout(id)
  },[id]);
  
  const getAbout = async (id) => {
    const response = await axios.get(`http://localhost:3060/abouts/${id}`);
    setAbout(response.data)
  };
  console.log(about)

  return (
    <article className="about  active">
      <header>
        <h2 className="h2 article-title">About me</h2>
      </header>
      {about && (
        <>
          <section className="about-text" key={about.id}>
            <p>{about.description}</p>
          </section>

          <section className="service">
            <h3 className="h3 service-title">What i'm doing</h3>
            <ul className="service-list">
            {about.hobies && about.hobies.map((hobie,index) => {
                  return (
                    <li className="service-item" key={index}>
                      <div className="service-icon-box">
                        <img
                          src={
                            hobie.icon === "design"
                              ? design
                              : hobie.icon === "app"
                              ? app
                              : hobie.icon === "photo"
                              ? photo
                              : dev
                          }
                          alt="mobile app icon"
                          width="40"
                        />
                      </div>

                      <div className="service-content-box">
                        <h4 className="h4 service-item-title">
                          {hobie.title}
                        </h4>
                        <p className="service-item-text">{hobie.desc}</p>
                      </div>
                    </li>
                  );
                })}

            </ul>
          </section>
        </>
      )}
    </article>
  );
}

export default About;
