import "./styles.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// pages
import HomePage from "../HomePage";
import AboutPage from "../AboutPage";
import LoginPage from "../LoginPage";
import SignupPage from "../SignupPage";
import StaffPage from "../StaffPage";
import TechnicianPage from "../TechnicianPage";
import AdminPage from "../AdminPage";
import TicketsPage from "../TicketsPage";

// Navbar
import Navbar from "../../components/Navbar";

export default function App() {

  const location = useLocation();

  const routes = ["home", "about", "tickets"];
  const mainCSS = routes.filter(r => location.pathname.includes(r) ? r : "").join(" ");

  return (
    <>
      <Navbar />

      <main className={mainCSS}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/technician" element={<TechnicianPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </main>
    </>
  );
}
