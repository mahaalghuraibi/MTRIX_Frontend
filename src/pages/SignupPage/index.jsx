import "./styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import * as usersAPI from "../../utilities/users-api"; 

//-----------------------------------------------------------------------------------------
export default function SignupPage({ setUser }) {
  const navigate = useNavigate();

  const initialState = { username: "", password: "", confirmPassword: "", email: "" };
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const disabledSubmitBtn =
    Object.values(errors).every((val) => val === "") &&
    Object.values(formData).every((val) => val !== "")
      ? false
      : true;

  //---------------------------------------------------------------------------------------
  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    checkErrors(evt);
  }

  //---------------------------------------------------------------------------------------
  function checkErrors({ target }) {
    const updateErrors = { ...errors };

    if (target.name === "username") {
      updateErrors.username =
        target.value.length < 3
          ? "Username must be at least 3 characters long."
          : "";
    }
    if (target.name === "password") {
      updateErrors.password =
        target.value.length < 3
          ? "Password must be at least 3 characters long."
          : "";
    }
    if (target.name === "confirmPassword") {
      updateErrors.confirmPassword =
        target.value !== formData.password ? "Passwords must match." : "";
    }
    if (target.name === "email") {
      updateErrors.email = !target.value.includes("@")
        ? "Please enter a valid email (must include @)."
        : "";
    }

    setErrors(updateErrors);
  }

  //---------------------------------------------------------------------------------------
  async function handleSubmit(evt) {
    try {
      evt.preventDefault();
      const newUser = await usersAPI.signup(formData);
      setUser(newUser);
      setFormData(initialState);
      navigate(`/profile`);
    } catch (err) {
      console.log(err);
      setUser(null);
    }
  }

  //---------------------------------------------------------------------------------------
  return (
    <div className="page signup-page">
      <div className="page-header">
        <h1>Sign Up</h1>
      </div>

      <form onSubmit={handleSubmit} className="form-container signup">
        <table>
          <tbody>
            <tr>
              <th>
                <label htmlFor="id_username">Username:</label>
              </th>
              <td>
                <input
                  type="text"
                  value={formData.username}
                  name="username"
                  minLength="3"
                  maxLength="150"
                  onChange={handleChange}
                  required
                />
                {errors.username && <p className="error">{errors.username}</p>}
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="id_email">Email:</label>
              </th>
              <td>
                <input
                  type="email"
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                  required
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="id_password1">Password:</label>
              </th>
              <td>
                <input
                  type="password"
                  value={formData.password}
                  name="password"
                  minLength="3"
                  onChange={handleChange}
                  required
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="id_password2">Confirm Password:</label>
              </th>
              <td>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  name="confirmPassword"
                  onChange={handleChange}
                  required
                />
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword}</p>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <button
          type="submit"
          disabled={disabledSubmitBtn}
          className="btn submit"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
