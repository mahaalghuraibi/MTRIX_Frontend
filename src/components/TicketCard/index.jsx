import "./styles.css";
import setting from "../../assets/images/setting.svg";

export default function TicketCard({ ticket }) {
  return (
    <div className="ticket-card">
      <div className="ticket-card-content">
        <img src={setting} alt="Ticket icon" />
        <h2>{ticket.title}</h2>
        <p>{ticket.description}</p>
        <p>Status: {ticket.status}</p>
      </div>
    </div>
  );
}
