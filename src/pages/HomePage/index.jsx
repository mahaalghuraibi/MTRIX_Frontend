import "./styles.css";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";

//-----------------------------------------------------------------------------------------
// Home Page 
export default function HomePage() {

   //---------------------------------------------------------------------------------------
  // Init scroll animation (cy)
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
 //---------------------------------------------------------------------------------------
  // UI
  return (
    <main className="home">
      <section className="landing">
        <div className="content-box" data-aos="fade-up">
          <div className="icons-row">
            <div className="icon-box">💻</div>
            <div className="icon-box">👤</div>
            <div className="icon-box">🛠️</div>
          </div>

          <h1 className="main-title">
            <span className="greeting" data-aos="fade-up">
              Welcome To
            </span>
            <span className="gradient-word" data-aos="fade-up">
              MTRIX{" "}
              <span className="greeting" data-aos="fade-up">
                System
              </span>
            </span>
          </h1>

          <p className="tagline" data-aos="fade-up">
            Smart Maintenance & Support Platform
          </p>
        </div>
      </section>
    </main>
  );
}

