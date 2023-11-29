import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import img from "../../hero6.png"
import "./style.css";
import './main.css'

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('user');
    if (userToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <div className='Home'>
      <div className='body-wrap'>
        <header className="site-header">
                <div className=" container ">
                    <div className="site-header-inner">
                        <div className="brand header-brand">
                            <h1 className="m-0">
                                <Link to={'/'}>
                                    <img className="header-logo-image" src={process.env.PUBLIC_URL+"/dist/images/chatge-logo.png"} alt="Logo" width="100px"/>
                                </Link>
                            </h1>
                        </div>
                        
                    </div>
                </div>
            </header>

        <main>
          <section className='hero'>
            <div className='container'>
              <div className='hero-inner'>
                <div className='hero-copy'>
                  <h1 className='hero-title mt-0'>
                    Introducing Generative AI based Solution
                  </h1>
                  <p className='hero-paragraph' style={{color:"whitesmoke", fontWeight:"bold" }}>
                    This is a groundbreaking approach to information retrieval.
                  </p>
                  <p className='text-sm mb-1' style={{ fontSize: '28px', lineHeight: '1.7rem', fontWeight: '700' }} >
                    Components of our Solution <br/>
                     GPT-4 <br/>
                     Vector Database<br/>
                  </p>
                </div>
                <div className='hero-figure anime-element'>
                  <svg
                    className='placeholder'
                    width='528'
                    height='396'
                    viewBox='0 0 528 396'
                  >
                    <rect
                      width='528'
                      height='396'
                      style={{ fill: "transparent" }}
                    />
                  </svg>
                  <div
                    className='hero-figure-box hero-figure-box-01'
                    data-rotation='45deg'
                  ></div>
                  <div
                    className='hero-figure-box hero-figure-box-02'
                    data-rotation='-45deg'
                  ></div>
                  <div
                    className='hero-figure-box hero-figure-box-03'
                    data-rotation='0deg'
                  ></div>
                  <div
                    className='hero-figure-box hero-figure-box-04'
                    data-rotation='-135deg'
                  ></div>
                  <div className='hero-figure-box hero-figure-box-05 flex-it'>
                  <img src={img} alt=""/>
                  </div>
                  {/* <div className='hero-figure-box hero-figure-box-06'></div> */}
                  <div className='hero-figure-box hero-figure-box-07'></div>
                  <div
                    className='hero-figure-box hero-figure-box-08'
                    data-rotation='-22deg'
                  ></div>
                  <div
                    className='hero-figure-box hero-figure-box-09'
                    data-rotation='-52deg'
                  ></div>
                  <div
                    className='hero-figure-box hero-figure-box-10'
                    data-rotation='-50deg'
                  ></div>
                </div>
              </div>
            </div>
          </section>

          <section className='features section'>
            <div className='container'>
              <h1 className='hero-title mt-1' style={{textAlign:" center"}}>High-Level Architecture</h1>
              <div className='features-inner section-inner has-bottom-divider'>
               <img src={
                  process.env.PUBLIC_URL +
                  "dist/images/architecture.png"
                } />
              </div>
            </div>
          </section>

          <section className='features section'>
            <div className='container'>
              <h1 className='section-title mt-1' style={{textAlign:" center"}}>Products</h1>
              <div className='features-inner section-inner has-bottom-divider'>
                <div className='features-wrap'>
                  <div className='feature text-center is-revealing'>
                    <div className='feature-inner'>
                      <div className='feature-icon'>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "dist/images/feature-icon-01.svg"
                          }
                          alt='Feature 01'
                        />
                      </div>
                      <h4 className='feature-title mt-24' style={{textAlign:"left"}}>
                      ChatGene
                      </h4>
                      <p className='text-sm mb-1' style={{textAlign:"left"}}>
                        Cutting-Edge Solution: Introducing our revolutionary Generative AI, Retrieval Augmented Generation, powered by GPT-4 and Vector Database.
                      </p>
                     
                      <p  className='text-sm mb-1' style={{textAlign:"left"}}>Clarity Amid Chaos: Find clarity in scattered information, saving time and frustration.</p>
                      <p className='text-sm mb-1' style={{textAlign:"left"}}>Competitive Advantage: It's more than a product; it's a competitive edge in information management. Welcome to the future.</p>
                    </div>
                    <Link to={'/chat'} className={'try-me-btn'}>Try me</Link>
                  </div>
                  <div className='feature text-center is-revealing'>
                    <div className='feature-inner'>
                      <div className='feature-icon'>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "dist/images/feature-icon-02.svg"
                          }
                          alt='Feature 02'
                        />
                      </div>
                      <h4 className='feature-title mt-24' style={{textAlign:"left"}}>
                          ChatCsv
                      </h4>
                      <p className='text-sm mb-1' style={{textAlign:"left"}}>
                      Effortless Data Analysis: Our innovative product simplifies complex data analysis, generating graphs, tables, and text insights from CSV data.
                      </p>
                      <p className='text-sm mb-1' style={{textAlign:"left"}}>
                      User-Friendly: Say goodbye to data complexities. We provide a streamlined, user-friendly approach to data analysis, making it accessible for all.
                      </p>
                      <p className='text-sm mb-1' style={{textAlign:"left"}} >
                      Let Data Speak: Unleash your data.
                      </p>
                    </div>
                    <Link to={'/chat-sales'} className={'try-me-btn'}>Try me</Link >
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className='features section'>
            <div className='container'>
              <h1 className='hero-title mt-1' style={{textAlign:" center"}}>Problem Faced By Enterprises</h1>
              <div className='features-inner section-inner has-bottom-divider'>
                <div className='features-wrap'>
                  <div className='feature text-center is-revealing'>
                    <div className='feature-inner'>
                      <div className='feature-icon'>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "dist/images/feature-icon-01.svg"
                          }
                          alt='Feature 01'
                        />
                      </div>
                      <h4 className='feature-title mt-24' style={{textAlign:"left"}}>
                        Managing Diverse Data
                      </h4>
                      <p className='text-sm mb-1' style={{textAlign:"left"}}>
                        Tackles a variety of data formats effortlessly. Whether it's diverse data sources or contracts.
                      </p>
                      <p className='text-sm mb-1' style={{textAlign:"left"}}>
                      We simplifies the complexities, becoming your go-to solution.
                      </p>
                    </div>
                  </div>
                  <div className='feature text-center is-revealing'>
                    <div className='feature-inner'>
                      <div className='feature-icon'>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "dist/images/feature-icon-02.svg"
                          }
                          alt='Feature 02'
                        />
                      </div>
                      <h4 className='feature-title mt-24' style={{textAlign:"left"}}>
                        Complex Information Maze
                      </h4>
                      <p className='text-sm mb-1' style={{textAlign:"left"}}>
                        Information is scattered across documents, making it
                        hard to find.
                      </p>
                      <p className='text-sm mb-1' style={{textAlign:"left"}}> 
                        It's like trying to navigate a maze of data.
                      </p>
                    </div>
                  </div>
                  <div className='feature text-center is-revealing'>
                    <div className='feature-inner'>
                      <div className='feature-icon'>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "dist/images/feature-icon-03.svg"
                          }
                          alt='Feature 03'
                        />
                      </div>
                      <h4 className='feature-title mt-24' style={{textAlign:"left"}}>
                        Slow Response Time
                      </h4>
                      <p className='text-sm mb-1' style={{textAlign:"left"}}>
                        Providing answers to queries takes a significant amount
                        of time.
                      </p>
                      <p className='text-sm mb-1' style={{textAlign:"left"}}>
                        This slow response time can lead to delays in serving
                        clients and partners
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Home;
