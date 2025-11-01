import "./styles.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/setting.svg"; 


//-----------------------------------------------------------------------------------------
// Ticket Card Component 
export default function TicketCard({ ticket }) {
  return (
    <div className="ticket-card">
      <Link to={`/tickets/${ticket.id}`}>
        <div className="ticket-card-content">
          <img src={logo} alt="Ticket logo" />
          <h2>{ticket.title}</h2>
          <p>{ticket.description}</p>
          <p>Status: {ticket.status}</p>
        </div>
      </Link>
    </div>
  );
}
