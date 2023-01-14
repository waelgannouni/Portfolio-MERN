import React,{useState,useEffect} from 'react'
import {IonIcon} from "@ionic/react";
import { chevronDown} from "ionicons/icons";
import PortfolioCards from '../../../Components/PortfolioCards';
import axios from 'axios';
import jwt from 'jwt-decode'
import { useCookies } from 'react-cookie'

function Portfolio() {
  const[active,setActive]=useState('All')
  const [show, setShow] =useState(false)
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const Userid = jwt(cookies.jwt);

  const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {
    getPortfolio();
    }, []);
    console.log("a",portfolio)

    const getPortfolio = async () => {
      const response = await axios.get("http://localhost:3060/portfolio");
      if(response.data){
          if(active === "All"){
              setPortfolio(response.data);
          }else{
              const filteredPortfolio = response.data.filter((portfolio) => portfolio.category === active && portfolio.user === Userid.id);
              setPortfolio(filteredPortfolio);
          }
      }
  };
  
  

  return (
    <article className="portfolio active" >
        <header>
          <h2 className="h2 article-title">Portfolio</h2>
        </header>

        <section className="projects">

          <ul className="filter-list">

            <li className="filter-item">
              <button onClick={()=>setActive("All")}>All</button>
            </li>

            <li className="filter-item">
              <button onClick={()=>setActive("Web-design")}>Web design</button>
            </li>

            <li className="filter-item">
              <button onClick={()=>setActive("Applications")}>Applications</button>
            </li>

            <li className="filter-item">
              <button onClick={()=>setActive("Web-development")}>Web development</button>
            </li>

          </ul>

          <div className="filter-select-box">

            <button className={show ? "filter-select active" : "filter-select"} onClick={() => setShow(!show)} >

              <div className="select-value">Select category</div>

              <div className="select-icon">
              <IonIcon icon={chevronDown} ></IonIcon>

              </div>

            </button>

            <ul className="select-list">

              <li className="select-item">
                <button onClick={() => {setActive("All");setShow(!show)}}>All</button>
              </li>

              <li className="select-item">
                <button onClick={()=>{setActive("Web-design");setShow(!show)}}>Web design</button>
              </li>

              <li className="select-item">
                <button onClick={()=>{setActive("Applications");setShow(!show)}}>Applications</button>
              </li>

              <li className="select-item">
                <button onClick={()=>{setActive("Web-development");setShow(!show)}}>Web development</button>
              </li>

            </ul>


          </div>

          <ul className="project-list">
                {active==="All" ? portfolio.map((portfolio) => (
                  <PortfolioCards portfolio={portfolio} key={portfolio._id} />
                )) : portfolio.filter(portfolio => portfolio.categorie === active).map((portfolio) => (
                  <PortfolioCards key={portfolio._id} portfolio={portfolio} />
                ))}
          </ul>
        </section>

      </article>
  )
}

export default Portfolio