import React,{useState,useEffect} from 'react'
import axios  from 'axios'
import jwt from 'jwt-decode'
import { useCookies } from 'react-cookie'
import {IonIcon} from "@ionic/react";
import { bookOutline} from "ionicons/icons";
function Resume() {

  
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const Userid = jwt(cookies.jwt);
  const [resume,setResume]=useState("")
  const [values,setValues]=useState("")
  const[showedit,setShowedit]=useState(false)
  const [newSkills,setNewSkills]=useState("")
  const [newExperience,setNewExperience]=useState("")
  const [newEducation,setNewEducation]=useState("")
  
  useEffect(() => {
    getResume()
  },[]);
  console.log(newSkills)

  const createResume = async () => {
    const response = await axios.post(`http://localhost:3060/resume`, {
      user: Userid.id,
      education: [],
      experience: [],
      skills: []
    });
    setResume(response.data);
};

const getResume = async () => {
try {
    const response = await axios.get(`http://localhost:3060/resume/${Userid.id}`);
    if (response.data) {
      setResume(prevResume => {
        return {...prevResume, ...response.data}
    });
    } else {
        createResume();
    }
} catch (error) {
    if(error.response.status === 404) {
      createResume();
    } else {
        console.log(error);
    }
}
};

const addSkill = async () => {
  try {
  const newSkill = [...resume.skills, newSkills];
  await axios.patch(`http://localhost:3060/resume/${Userid.id}`, {
  ...resume,
  skills:newSkill
  });
  setNewSkills("");
  getResume();
  } catch (error) {
  console.log(error);
  }
  };
const addExperience = async () => {
  try {
  const newExperiences = [...resume.experience, newExperience];
  await axios.patch(`http://localhost:3060/resume/${Userid.id}`, {
  ...resume,
  experience:newExperiences
  });
  setNewExperience("");
  getResume();
  } catch (error) {
  console.log(error);
  }
  };

const addEducation= async () => {
  try {
  const newEducations = [...resume.education, newEducation];
  await axios.patch(`http://localhost:3060/resume/${Userid.id}`, {
  ...resume,
  education:newEducations
  });
  setNewEducation("");
  getResume();
  } catch (error) {
  console.log(error);
  }
  };
  


  console.log(resume)

  const updateResume = async () => {
    try {
      await axios.patch(`http://localhost:3060/resume/${Userid.id}`, {
          ...values,
          skills:resume.skills,
          experience:resume.experience,
          education:resume.education
      });
      getResume();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSkill = async (id) => {
    try {
        const newSkills = resume.skills.filter(skills => skills._id !== id);
        await axios.patch(`http://localhost:3060/resume/${Userid.id}`, {
            ...resume,
            skills: newSkills
        });
        setResume({...resume, skills: newSkills});
    } catch (error) {
        console.log(error);
    }
  };
  const deleteExperience = async (id) => {
    try {
        const newExperiences = resume.experience.filter(experience => experience._id !== id);
        await axios.patch(`http://localhost:3060/resume/${Userid.id}`, {
            ...resume,
            experience: newExperiences
        });
        setResume({...resume, experience: newExperiences});
    } catch (error) {
        console.log(error);
    }
  };

  const deleteEducation = async (id) => {
    try {
        const newEducations = resume.education.filter(education => education._id !== id);
        await axios.patch(`http://localhost:3060/resume/${Userid.id}`, {
            ...resume,
            education: newEducations
        });
        setResume({...resume, education: newEducations});
    } catch (error) {
        console.log(error);
    }
  };

 
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
          {showedit ? 
            <>
                   <input type="text" placeholder='university name'
                   maxLength="62"
                   onChange={(e) => setNewEducation({...newEducation,university: e.target.value})}/>
                 <input type="number" placeholder='Start'
                   maxLength="4"
                   name="Skills.from"
                   onChange={(e) => setNewEducation({...newEducation,from: e.target.value})}/>
                 <input placeholder='End'
                   maxLength="4"
                   name="Skills.until"
                   onChange={(e) => setNewEducation({...newEducation,until: e.target.value})}/>
                 <textarea placeholder='description'
                   name="Skills.description"
                   onChange={(e) => setNewEducation({...newEducation,description: e.target.value})}/>
                 <button className='delete-button' onClick={newEducation !=="" ? addEducation : null}>Add</button>
                   </>
            : null}
          
            {resume.education && resume.education.map((education,index) => { 

            return <li className="timeline-item" key={education.id}>

            {!showedit ? 
              <>
            <h4 className="h4 timeline-item-title">{education.university}</h4>

              <span>{education.from} — {education.until}</span>

              <p className="timeline-text">
              {education.description}
              </p>

            </>
            :
              <>
                    <input type="text" placeholder='university name'
                      maxLength="62"
                      defaultValue={education.university}
                      onChange={(e) => {
                        const newEducation = [...resume.education];
                        newEducation[index] = {
                          ...newEducation[index],
                          university: e.target.value
                        };
                        setResume({ ...resume, education: newEducation });
                      } } />
                    <input type="number" placeholder='Start'
                      maxLength="4"
                      defaultValue={education.from}
                      onChange={(e) => {
                        const newEducation = [...resume.education];
                        newEducation[index] = {
                          ...newEducation[index],
                          from: e.target.value
                        };
                        setResume({ ...resume, education: newEducation });
                      } } />
                    <input placeholder='End'
                      maxLength="4"
                      defaultValue={education.until}
                      onChange={(e) => {
                        const newEducation = [...resume.education];
                        newEducation[index] = {
                          ...newEducation[index],
                          until: e.target.value
                        };
                        setResume({ ...resume, education: newEducation });
                      } } />
                    <textarea placeholder='description'
                      maxLength="4"
                      defaultValue={education.description}
                      onChange={(e) => {
                        const newEducation = [...resume.education];
                        newEducation[index] = {
                          ...newEducation[index],
                          description: e.target.value
                        };
                        setResume({ ...resume, education: newEducation });
                      } } />
                    <button  className='delete-button' onClick={() => deleteEducation(education._id)}>Delete</button>

               </>
            
            }

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
            {showedit ? 
            <>
                   <input type="text" placeholder='company name'
                   maxLength="62"
                   onChange={(e) => setNewExperience({...newExperience,company: e.target.value})}/>
                 <input type="number" placeholder='Start'
                   maxLength="4"
                   name="Skills.from"
                   onChange={(e) => setNewExperience({...newExperience,from: e.target.value})}/>
                 <input placeholder='End'
                   maxLength="4"
                   name="Skills.until"
                   onChange={(e) => setNewExperience({...newExperience,until: e.target.value})}/>
                 <textarea placeholder='description'
                   name="Skills.description"
                   onChange={(e) => setNewExperience({...newExperience,description: e.target.value})}/>
                 <button className='delete-button' onClick={newExperience !=="" ? addExperience : null}>Add</button>
                   </>
            : null}
          
            {resume.experience && resume.experience.map((experience,index) => { 

            return <li className="timeline-item" key={experience.id}>

            {!showedit ? 
              <>
            <h4 className="h4 timeline-item-title">{experience.company}</h4>

              <span>{experience.from} — {experience.until}</span>

              <p className="timeline-text">
              {experience.description}
              </p>

            </>
            :
              <>
                    <input type="text" placeholder='company name'
                      maxLength="62"
                      defaultValue={experience.company}
                      onChange={(e) => {
                        const newExperience = [...resume.experience];
                        newExperience[index] = {
                          ...newExperience[index],
                          company: e.target.value
                        };
                        setResume({ ...resume, experience: newExperience });
                      } } />
                    <input type="number" placeholder='Start'
                      maxLength="4"
                      name="Skills.from"
                      defaultValue={experience.from}
                      onChange={(e) => {
                        const newExperience = [...resume.experience];
                        newExperience[index] = {
                          ...newExperience[index],
                          from: e.target.value
                        };
                        setResume({ ...resume, experience: newExperience });
                      } } />
                    <input placeholder='End'
                      maxLength="4"
                      name="Skills.until"
                      defaultValue={experience.until}
                      onChange={(e) => {
                        const newExperience = [...resume.experience];
                        newExperience[index] = {
                          ...newExperience[index],
                          until: e.target.value
                        };
                        setResume({ ...resume, experience: newExperience });
                      } } />
                    <textarea placeholder='description'
                      maxLength="4"
                      name="Skills.description"
                      defaultValue={experience.description}
                      onChange={(e) => {
                        const newExperience = [...resume.experience];
                        newExperience[index] = {
                          ...newExperience[index],
                          description: e.target.value
                        };
                        setResume({ ...resume, experience: newExperience });
                      } } />
                    <button className='delete-button' onClick={() => deleteExperience(experience._id)}>Delete</button>

               </>
            
            }

            </li>
            })}

          </ol>

        </section>

        <section className="skill">

          <h3 className="h3 skills-title">My skills</h3>

          <ul className="skills-list content-card">
            {showedit ? 
            <>
            <input type="text" placeholder='Skill'
              maxLength="62"
              name="Skills.skill"
              onChange={(e) => setNewSkills({...newSkills,skill: e.target.value})} />
            <input type="number" placeholder='Percent'
              maxLength="62"
              name="Skills.percent"
              onChange={(e) => setNewSkills({...newSkills,percent: e.target.value})}/>
              <button className='delete-button' onClick={newSkills !=="" ? addSkill : null}>Add</button>

              </>
            :null}
          {resume.skills && resume.skills.map((skills,index) => {
            return <li className="skills-item" key={skills.id}>
              {!showedit ? 
              <>
              <div className="title-wrapper">
                <h5 className="h5">{skills.skill}</h5>
                <span value="80">{skills.percent}</span>
              </div>

              <div className="skill-progress-bg">
                <div className="skill-progress-fill" style={{width: `${skills.percent}%`}}></div>
              </div>
              </>
                :
                <>
                    <input type="text" placeholder='Skill'
                      maxLength="62"
                      name="Skills.skill"
                      defaultValue={skills.skill}
                      onChange={(e) => {
                        const newSkills = [...resume.skills];
                        newSkills[index] = {
                          ...newSkills[index],
                          skill: e.target.value
                        };
                        setResume({ ...resume, skills: newSkills });
                      } } />
                    <input type="number" placeholder='Percent'
                      maxLength="62"
                      name="Skills.percent"
                      defaultValue={skills.percent}
                      onChange={(e) => {
                        const newSkills = [...resume.skills];
                        newSkills[index] = {
                          ...newSkills[index],
                          percent: e.target.value
                        };
                        setResume({ ...resume, skills: newSkills });
                      } } />
                    <button className='delete-button' onClick={() => deleteSkill(skills._id)}>Delete</button>
                  </>
                 }


            </li>
            })}

         
          </ul>

          {!showedit ?
              <button className="edit-btn" onClick={() => setShowedit(!showedit)}>Edit</button>
              :
              <button className="edit-btn" onClick={() => setShowedit(!showedit)+updateResume()}>Done</button>

              }

        </section></>}

      </article>

  )
}

export default Resume