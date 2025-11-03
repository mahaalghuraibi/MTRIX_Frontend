// IMPORTS
import "./styles.css";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

// APIs
import * as usersAPI from "../../utilities/users-api";

//-----------------------------------------------------------------------------------------
// Home Page 
export default function HomePage({ user, setUser }) {
  const navigate = useNavigate(); 

  //---------------------------------------------------------------------------------------
  // Init scroll animation 
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  //---------------------------------------------------------------------------------------
  // Login 
  const initialState = { username: "", password: "" };
  const [formData, setFormData] = useState(initialState);

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }
  
//---------------------------------------------------------------------------------------

 async function handleLogin(evt) {
    try {
      evt.preventDefault();
      const loggedInUser = await usersAPI.login(formData); 
      setUser(loggedInUser); 
      navigate("/home"); 
    } catch (err) {
      console.log(err);
      setUser(null);
    }
  }

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
