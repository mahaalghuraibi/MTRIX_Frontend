import "./styles.css";
import { Routes, Route } from "react-router-dom";

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
  return (
    <>
      
      <Navbar />

     
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/technician" element={<TechnicianPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/tickets" element={<TicketsPage />} />

      </Routes>
    </>
  );
}
