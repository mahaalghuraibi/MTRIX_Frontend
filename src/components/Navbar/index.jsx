import { Link, useLocation, useNavigate } from "react-router";
import "./styles.css";
import * as usersAPI from "../../utilities/users-api";

//--------------------------------------------------------
export default function Navbar({ user, setUser }) {
  // const location = useLocation();
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    usersAPI.logout();
    setUser(null);
    navigate("/home");
  }

  return (
    <header className="nav-wrapper">
      <div className="nav-inner">
        {/* left -- logo */}
        <div className="logo">MTRIX</div>

        {/* right -- links */}
        <nav className="links">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>

          {user ? (
            <>
              <Link to="/profile" className="nav-link">Profile</Link>
              <Link to="/staff" className="nav-link">Staff</Link>
              <Link to="/technician" className="nav-link">Technician</Link>
              <Link to="/admin" className="nav-link">Admin</Link>
              <Link to="/tickets" className="nav-link">Tickets</Link>
              <Link to="/tickets/new" className="nav-link">Create New Ticket</Link>

              <form id="logout-form" onSubmit={handleLogout} style={{ display: "inline" }}>
                <button type="submit" className="nav-link btn-as-link">Log out</button>
              </form>
            </>
          ) : (
            <>
              <Link to="/signup" className="nav-link">Sign Up</Link>
              <Link to="/login" className="nav-link">Log In</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

