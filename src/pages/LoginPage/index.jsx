import "./styles.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as usersAPI from "../../utilities/users-api";

//-----------------------------------------------------------------------------------------
// Login Page
export default function LoginPage({ setUser }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  //---------------------------------------------------------------------------------------
  // Init scroll animation
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  //---------------------------------------------------------------------------------------
  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  //---------------------------------------------------------------------------------------
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersAPI.login(formData);
      console.log({user})
      if (user) {
        setUser(user);
        navigate("/profile"); 
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong during login");
    }
  }

  //---------------------------------------------------------------------------------------
  return (
    <main className="login-page">
      <section className="landing">
        <div className="content-box" data-aos="fade-up">
          <h1 className="main-title" data-aos="fade-up">
            <span className="gradient-word">Login</span>
          </h1>

          <div className="login-box" data-aos="fade-up">
            <form onSubmit={handleSubmit}>
          <label htmlFor="id_username">Username:</label>
          <input
            type="text"
            name="username"
            id="id_username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="id_password">Password:</label>
          <input
            type="password"
            name="password"
            id="id_password"
            value={formData.password}
            onChange={handleChange}
            required
          />

              <button type="submit" className="btn submit">
                Log In
              </button>
            </form>

            {error && <p className="error">{error}</p>}
          </div>
        </div>
      </section>
    </main>
  );
}
