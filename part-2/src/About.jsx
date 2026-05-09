import { useState } from "react";
import "./About.css";
import profilePic from "./assets/professional-profile-pic.jpeg";

function About() {
  const [showGame, setShowGame] = useState(false);
  const [jumping, setJumping] = useState(false);

  function jump() {
    if (jumping) return;

    setJumping(true);

    setTimeout(() => {
      setJumping(false);
    }, 600);
  }

  return (
    <div className="about-page">
      <h1>About</h1>

      <img src={profilePic} alt="me" className="about-pic" />

      <p className="about-desc">
        Hi, I am Courtney, but I go by Mel. I am graduating.I have nothing else to talk about, i made a "game".
      </p>

      <button className="game-button" onClick={() => setShowGame(true)}>
         Click here to play the "dinosaur" game
      </button>

      {showGame && (
        <div className="dino-overlay">
          <div className="dino-modal">
            <h2>Jump jump game</h2>
            <p>It does not work, just pretend theres a score. This is only to fulfill the extra credit portion</p>

            <div className="dino-game" onClick={jump}>
              <div className={jumping ? "dino jump" : "dino"}>( ͡° ͜ʖ ͡°)</div>
              <div className="cactus">==\</div>
              <div className="ground"></div>
            </div>

            <p className="game-help">Click the game area to jump.</p>

            <button className="close" onClick={() => setShowGame(false)}>
              Exit Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default About;