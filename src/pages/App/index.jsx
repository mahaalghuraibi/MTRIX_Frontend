import "./styles.css";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "../HomePage";
import AboutPage from "../AboutPage";
import LoginPage from "../LoginPage";
import SignupPage from "../SignupPage";
import StaffPage from "../StaffPage";
import TechnicianPage from "../TechnicianPage";
import AdminPage from "../AdminPage";
import logo from "../../assets/images/MTRIX.jpeg";

export default function App() {
  return (
    <>
      <header>
        <img src={logo} alt="MTRIX Logo" className="logo" />


        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/about">About</Link> |{" "}
          <Link to="/login">Login</Link> |{" "}
          <Link to="/signup">Signup</Link> |{" "}
          <Link to="/staff">Staff</Link> |{" "}
          <Link to="/technician">Technician</Link> |{" "}
          <Link to="/admin">Admin</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/technician" element={<TechnicianPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}
