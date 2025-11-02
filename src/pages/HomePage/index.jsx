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
  // Init scroll animation (cy)
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

      {!user && (
        <section className="login-section" data-aos="fade-up">
          <form onSubmit={handleLogin} className="form-container login">
            <h1>Login</h1>
            <p>
              <label htmlFor="id_username">Username:</label>
              <input
                id="id_username"
                name="username"
                type="text"
                maxLength="150"
                required
                value={formData.username}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="id_password">Password:</label>
              <input
                id="id_password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </p>
            <button type="submit" className="btn submit">
              Login
            </button>
          </form>
        </section>
      )}
    </main>
  );
}
