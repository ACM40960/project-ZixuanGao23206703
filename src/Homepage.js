import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FaHandPointRight } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaExternalLinkAlt } from 'react-icons/fa';
import './Homepage.css';
import video from "./React-Blackjack.mp4";
import selfiePhoto from './selfiephoto.jpg';


class Homepage extends Component {
  render() {
    return (
      <main className="flex-shrink-0">

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container px-5">
            <a className="navbar-brand" href="index.html">React-Built Blackjack</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item"><Link className="nav-link active" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/blackjack">Play</Link></li>
              </ul>
            </div>
          </div>
        </nav>

        <header className="bg-burgundy py-5">
          <div className="container px-5">
            <div className="row gx-5 align-items-center justify-content-center">
              <div className="col-lg-7">
                <div className="my-5 text-center text-xl-start">
                  <h1 className="display-5 fw-bolder text-white mb-2">Blackjack game</h1>
                  <div className="intro-text lead fw-normal text-white text-start mb-4">
                     <p>Experience ultimate entertainment and strategy!</p>
                    <p> Enjoy a seamless and engaging experience!</p>
                    <p>Challenge your luck and skills to become a blackjack master!</p>
                  </div>
                  <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">                    
                    <Link className="btn btn-primary btn-lg btn-light px-4 me-sm-3 play-button" to="/blackjack">Play Now</Link>
                    <a className="btn btn-outline-light btn-lg px-4" href="#features">Learn More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 text-center">
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe title="video-demo" className="embed-responsive-item" src={video} frameBorder="0" mozallowfullscreen="true" allowFullScreen></iframe>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="py-5" id="features">
          <div className="container px-5 my-5">
            <div className="row gx-5 project-details-container">
              <div className="col-lg-4 mb-5 mb-lg-0">
                <div className="how-title">
                  <span className="how">How</span>
                  <span className="to-play">to play Blackjack</span>
                </div>
              </div>
              <div className="col-lg-8">
                <h3>Project Details</h3>
                <div className="project-details">            
                <ul className="list-group list-group-flush my-4">
                  <li className="list-group-item"><span><FaHandPointRight /></span> A Blackjack game built using React.js</li>
                  <li className="list-group-item"><span><FaHandPointRight /></span> On initial load, two cards are dealt.</li>
                  <li className="list-group-item"><span><FaHandPointRight /></span> Choose 'hit' to draw more cards or 'stand' to hold your total.</li>
                  <li className="list-group-item"><span><FaHandPointRight /></span> Rules:</li>
                  <li className="list-group-item" style={{ marginLeft: "20px" }}>
                    <ul>
                      <li><span></span> You win by having a hand total closer to 21 than the dealer's without going over 21.</li>
                      <li><span></span> The dealer wins if their hand total is closer to 21 than yours without exceeding 21.</li>
                      <li><span></span> If your initial two cards are the same, you can choose to "split" into two separate hands.</li>
                      <li><span></span> If you exceed 21, it's a "bust" and you lose.</li>
                      <li><span></span> If the dealer exceeds 21, they bust and you win.</li>
                    </ul>
                  </li>
                  <li className="list-group-item"><span><FaHandPointRight /></span> Click "New Game" to start a new game.</li>
                </ul>
                </div>   
              </div>
            </div>
          </div>
        </section>

        <div className="py-1 bg-light">
          <div className="container px-5 my-5">
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-4 mb-5">
                <img src={selfiePhoto} className="img-fluid biopic" alt="Developer of this app" />
              </div>
              <div className="col-lg-8 mb-5 biotext">
              <div className="biopic-container">
                <h3>Zixuan(Gia) Gao</h3>
                <p>Welcome one and all to my humble project. My name is Zixuan(Gia), and I created this Blackjack 
                game as part of the Math modeling project. I'm a software developer and data scientist with experience in a wide array of 
                technologies including: JavaScript, React, Python, R , SQL, and many more. 
                You can learn more about me by visiting <a href="https://www.linkedin.com/in/zixuan-gia/" target="_blank" rel="noreferrer">my linkedin</a>.</p>
                </div>
                <p className="text-center my-5">
                  <span>
                    <a href="https://www.linkedin.com/in/zixuan-gia/" target="_blank" rel="noreferrer"><FaLinkedin /></a>
                  </span>
                  <span className="mx-5">
                    <a href="https://github.com/ZixuanGao23206703" target="_blank" rel="noreferrer"><FaGithub /></a>
                  </span>
                  
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Homepage;