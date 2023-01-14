import React,{useState,useEffect} from 'react'
import axios  from 'axios'
import jwt from 'jwt-decode'
import { useCookies } from 'react-cookie'
import dev from '../../../images/icon-dev.svg'
import app from '../../../images/icon-app.svg'
import design from '../../../images/icon-design.svg'
import photo from '../../../images/icon-photo.svg'

function About() {

  const [cookies, setCookie, removeCookie] = useCookies([]);
  const Userid = jwt(cookies.jwt);
  const [about,setAbout]=useState("")
  const [values,setValues]=useState("")
  const [newHobie,setNewHobie]=useState("")
  const[showedit,setShowedit]=useState(false)
  
  useEffect(() => {
    getAbout()
  },[]);
  
  const createAbout = async () => {
        const response = await axios.post(`http://localhost:3060/abouts`, {
          description: "",
          user: Userid.id,
          hobies: []
        });
        setAbout(response.data);
  };
  
  const getAbout = async () => {
    try {
        const response = await axios.get(`http://localhost:3060/abouts/${Userid.id}`);
        if (response.data) {
            setAbout(prevAbout => {
                return { ...prevAbout, ...response.data }
            });
        } else {
            createAbout();
        }
    } catch (error) {
        if(error.response.status === 404) {
            createAbout();
        } else {
            console.log(error);
        }
    }
};

  console.log(about)

  const updateAbout = async () => {
    try {
      await axios.patch(`http://localhost:3060/abouts/${Userid.id}`, {
          ...values,
          hobies:about.hobies
      });
      getAbout();
    } catch (error) {
      console.log(error);
    }
  };

  const addHobie = async () => {
    try {
    const newHobies = [...about.hobies, newHobie];
    await axios.patch(`http://localhost:3060/abouts/${Userid.id}`, {
    ...about,
    hobies: newHobies
    });
    setNewHobie("");
    getAbout();
    } catch (error) {
    console.log(error);
    }
    };

   
    const deleteHobie = async (id) => {
      try {
          const newHobies = about.hobies.filter(hobie => hobie._id !== id);
          await axios.patch(`http://localhost:3060/abouts/${Userid.id}`, {
              ...about,
              hobies: newHobies
          });
          setAbout({...about, hobies: newHobies});
      } catch (error) {
          console.log(error);
      }
    };
    
    
    

  return (
    <article className="about  active">

        <header>
          <h2 className="h2 article-title">About me</h2>
        </header>
        {about && <><section className="about-text" key={about.id}>
          {!showedit ? 
            <p>
              {about.description}
            </p>
              :
            <textarea defaultValue={about.description}  name="description" onChange={(e) => setValues({...values,[e.target.name]:e.target.value})} />
          }
            
          </section>
          
          <section className="service">

              <h3 className="h3 service-title">What i'm doing</h3>
              {showedit ? 
                  <>
                 <select name="Categories" id="Categories" onChange={(e) => setNewHobie({...newHobie,title:e.target.value})}>
                  <option value="dev" >Web dev</option>
                  <option value="design" >Design</option>
                  <option value="Photography">Photography</option>
                  <option value="App">App</option>
                </select>
                <input placeholder='Description' maxLength="62" onChange={(e) => setNewHobie({...newHobie,desc: e.target.value})} />
                <button className='delete-button' onClick={newHobie !=="" ? addHobie : null}>Add</button>
                  </>
                      : null
                    
              }

              <ul className="service-list">

                {about.hobies && about.hobies.map((hobies, index) => {
                  return <li className="service-item" key={hobies.index}>
                  {!showedit ? 
                    <>
                        <div className="service-icon-box">
                          <img src={hobies.title==="design" ? design : hobies.title==="App" ? app : hobies.title==="Photography" ? photo :  dev  } alt="mobile app icon" width="40" />
                        </div>

                        <div className="service-content-box">
                          <h4 className="h4 service-item-title">{hobies.title}</h4>
                          <p className="service-item-text">
                          {hobies.desc}
                          </p>
                        </div>
                    </>

                    :
                        <div className="service-content-box">
                            <select name="Categories"  id="Categories" defaultValue={hobies.title}
                            onChange={(e) => {
                              const newHobies = [...about.hobies];
                              newHobies[index] = {
                                  ...newHobies[index],
                                  title: e.target.value
                              };
                              setAbout({...about, hobies: newHobies});
                          }
                      }>
                              <option value="dev" >Web dev</option>
                              <option value="design" >Design</option>
                              <option value="Photography">Photography</option>
                              <option value="App">App</option>
                            </select>
                            <input   placeholder='Description'
                          maxLength="62"
                          name="hobies.desc"
                          defaultValue={hobies.desc}
                          onChange={(e) => {
                              const newHobies = [...about.hobies];
                              newHobies[index] = {
                                  ...newHobies[index],
                                  desc: e.target.value
                              };
                              setAbout({...about, hobies: newHobies});
                          }
                      }/>
                    <button className='delete-button' onClick={() => deleteHobie(hobies._id)}>Delete</button>
                          </div>
                    }
                  </li>
                })}


              </ul>
              
              {!showedit ?
              <button className="edit-btn" onClick={() => setShowedit(!showedit)}>Edit</button>
              :
              <button className="edit-btn" onClick={() => setShowedit(!showedit)+updateAbout()}>Done</button>

              }
            </section></>
          }

        

       

      </article>
  )
}

export default About