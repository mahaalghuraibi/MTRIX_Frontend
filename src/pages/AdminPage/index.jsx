import "./styles.css";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

//-----------------------------------------------------------------------------------------
// Admin Page 
export default function AdminPage() {
  //---------------------------------------------------------------------------------------
  // Init scroll animation
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
              Welcome
            </span>
            <span className="gradient-word" data-aos="fade-up">
              Admin{" "}
              <span className="greeting" data-aos="fade-up">
                !
              </span>
            </span>
          </h1>

          <p className="tagline" data-aos="fade-up">
            Maintenance & Support Platform
          </p>

          <Link to="/tickets" className="tickets-link" data-aos="fade-up">
            Tickets
          </Link>
        </div>
      </section>
    </main>
  );
}
