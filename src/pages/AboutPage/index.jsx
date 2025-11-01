import "./styles.css";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";



//-----------------------------------------------------------------------------------------
// About Page (simple intro for MTRIX)
export default function AboutPage() {

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
    <main className="about">
      <section className="about-landing">
        <div className="about-card" data-aos="fade-up">
          <h1 className="about-title" data-aos="fade-up">About MTRIX</h1>

          <p className="about-text" data-aos="fade-up">
            MTRIX is a smart maintenance & support system. It helps staff submit
            issues, helps technicians track work, and gives admins live status and
            reporting.
          </p>
        </div>
      </section>
    </main>
  );
}
