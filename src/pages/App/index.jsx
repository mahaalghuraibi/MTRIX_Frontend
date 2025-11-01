import "./styles.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

//-----------------------------------------------------------------------------------------
// pages
import HomePage from "../HomePage";
import AboutPage from "../AboutPage";
import LoginPage from "../LoginPage";
import SignupPage from "../SignupPage";
import StaffPage from "../StaffPage";
import TechnicianPage from "../TechnicianPage";
import AdminPage from "../AdminPage";
import TicketsPage from "../TicketsPage";
import TicketDetailPage from "../TicketDetailPage";
import TicketFormPage from "../TicketFormPage";
import ReactionPage from "../ReactionPage";

//-----------------------------------------------------------------------------------------
// Navbar
import Navbar from "../../components/Navbar";



//-----------------------------------------------------------------------------------------
// Main App
export default function App() {
  const location = useLocation();

  const routes = ["home", "about", "tickets" , "reactions"];
  const mainCSS = routes.filter((r) =>
    location.pathname.includes(r) ? r : ""
  ).join(" ");

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
          <Route path="/tickets/:id" element={<TicketDetailPage />} />

          <Route path="/tickets/new" element={<TicketFormPage createTicket={true} />} />
          <Route path="/tickets/edit/:id" element={<TicketFormPage editTicket={true} />} />
          <Route path="/tickets/confirm_delete/:id" element={<TicketFormPage deleteTicket={true} />} />


          <Route path="/tickets/:id/reactions" element={<ReactionPage />} />

          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </main>
    </>
  );
}
