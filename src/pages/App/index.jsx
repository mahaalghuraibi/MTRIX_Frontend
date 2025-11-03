import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react"; 
import { getUser } from "../../utilities/users-api";

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
import ProfilePage from "../ProfilePage";

//-----------------------------------------------------------------------------------------
// Navbar
import Navbar from "../../components/Navbar";

//-----------------------------------------------------------------------------------------
// Main App
export default function App() {
  const location = useLocation();

  const [user, setUser] = useState(null);

  //---------------------------------------------------------------------------------------
  // Auto-login: check token and restore user
  useEffect(() => {
    async function checkUser() {
      const foundUser = await getUser();
      setUser(foundUser);
    }
    checkUser();
  }, []);

  const routes = ["home", "about", "tickets", "reactions"];
  const mainCSS = routes
    .filter((r) => (location.pathname.includes(r) ? r : ""))
    .join(" ");


  console.log(user, "app jsx user")

  const hideNavbar = location.pathname === "/profile" && !user?.profile?.role;

  return (
    <>
      {!hideNavbar && <Navbar user={user} setUser={setUser} />}

      <main className={mainCSS}>
        <Routes>
          
          {user ? (
            <>
              <Route path="/home"                         element={<HomePage />} />
              <Route path="/about"                        element={<AboutPage />} />
              <Route path="/profile"                      element={<ProfilePage user={user} setUser={setUser} />} />
              
              {user?.profile?.role === "Staff" ? (
                <>
                  <Route path="/staff"                        element={<StaffPage />} />
                  <Route path="/tickets"                      element={<TicketsPage />} />
                  <Route path="/tickets/new"                  element={<TicketFormPage createTicket={true} user={user} />} />
                  <Route path="/tickets/edit/:id"             element={<TicketFormPage editTicket={true} user={user} />} />
                  <Route path="/tickets/confirm_delete/:id"   element={<TicketFormPage deleteTicket={true} />} />
                  <Route path="/tickets/:id"                  element={<TicketDetailPage user={user} />} />
                  <Route path="/*"                            element={<Navigate to="/home" />} />
                </>
              ) : (
                <>
                  <Route path="/staff"                        element={<StaffPage />} />
                  <Route path="/technician"                   element={<TechnicianPage />} />
                  <Route path="/admin"                        element={<AdminPage />} />
                  <Route path="/tickets"                      element={<TicketsPage />} />
                  <Route path="/tickets/new"                  element={<TicketFormPage createTicket={true} user={user} />} />
                  <Route path="/tickets/edit/:id"             element={<TicketFormPage editTicket={true} user={user} />} />
                  <Route path="/tickets/confirm_delete/:id"   element={<TicketFormPage deleteTicket={true} />} />
                  <Route path="/tickets/:id"                  element={<TicketDetailPage user={user} />} />
                  <Route path="/tickets/:id/reactions"        element={<ReactionPage />} />
                  <Route path="/*"                            element={<Navigate to="/home" />} />
                </>
              )}
            </>
          ) : (
            <>
              {/* Public routes */}
              <Route path="/home"   element={<HomePage />} />
              <Route path="/about"  element={<AboutPage />} />
              <Route path="/signup" element={<SignupPage setUser={setUser} />}/>
              <Route path="/login"  element={<LoginPage setUser={setUser}   />}/>
            </>
          )}
        </Routes>
      </main>
    </>
  );
}
