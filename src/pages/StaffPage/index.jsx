// IMPORTS
import "./styles.css";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

//-----------------------------------------------------------------------------------------
// Staff Page 
export default function StaffPage() {
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
              Staff{" "}
              <span className="greeting" data-aos="fade-up">
                !
              </span>
            </span>
          </h1>

          <p className="tagline" data-aos="fade-up">
            Smart Maintenance & Support Platform
          </p>

          <div className="staff-cards" data-aos="fade-up">
            <Link to="/tickets/new" className="staff-card">
              <h2>New Ticket</h2>
            </Link>
            <Link to="/tickets" className="staff-card">
              <h2>Tickets</h2>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
