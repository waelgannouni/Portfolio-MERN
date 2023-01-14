import React,{useState,useEffect} from 'react'
import {IonIcon} from "@ionic/react";
import { chevronDown} from "ionicons/icons";
import PortfolioCards from '../../../Components/PortfolioCards';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Modal from 'react-responsive-modal';


function Portfolio() {
  const { id } = useParams();
  const[active,setActive]=useState('All')
  const [show, setShow] =useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [currentPortfolio, setCurrentPortfolio] = useState({});
  const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {
    getPortfolio();
    }, [id]);
    console.log("a",portfolio)

    const getPortfolio = async () => {
      const response = await axios.get("http://localhost:3060/portfolio");
      if(response.data){
          if(active === "All"){
              setPortfolio(response.data);
          }else{
              const filteredPortfolio = response.data.filter((portfolio) => portfolio.category === active && portfolio.user === id);
              setPortfolio(filteredPortfolio);
          }
      }
  };
  
  
  const openModal = (portfolio) => {
    setCurrentPortfolio(portfolio);
    setModalIsOpen(true);
  }
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
            <button onClick={() => setModalIsOpen(true)}>Open Modal</button>



          </div>

          <ul className="project-list">
                {active==="All" ? portfolio.map((portfolio) => (
                  <PortfolioCards portfolio={portfolio} key={portfolio._id} />
                )) : portfolio.filter(portfolio => portfolio.categorie === active).map((portfolio) => (
                  <PortfolioCards key={portfolio._id} portfolio={portfolio} />
                ))}
          </ul>
          <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)} center>
              <div>
                <h2>Modal Title</h2>
                <p>Modal description</p>

                <div>
                  <Slider {...settings}>
                    {portfolio.images.map((image, index) => (
                      <div key={index}>
                        <img src={`http://localhost:3060/images/${image}`} alt={image} />
                        <p>{portfolio.title}</p>
                        <p>{portfolio.description}</p>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </Modal>

        </section>

      </article>
  )
}

export default Portfolio