import { Link, useLocation } from "react-router-dom";
import "./styles.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="nav-wrapper">
      <div className="nav-inner">
        {/* left -- logo */}
        <div className="logo">MTRIX</div>

        {/* right -- links */}
        <nav className="links">
          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/about" className="nav-link">
            About
          </Link>

          <Link to="/staff" className="nav-link">
            Staff
          </Link>

          <Link to="/technician" className="nav-link">
            Technician
          </Link>

          <Link to="/admin" className="nav-link">
            Admin
          </Link>

          <Link to="/tickets" className="nav-link">
            Tickets
          </Link>
          
          <Link to="/tickets/new" className="nav-link">
            Create New Ticket
          </Link>

        </nav>
      </div>
    </header>
  );
}
