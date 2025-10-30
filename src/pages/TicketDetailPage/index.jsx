import "./styles.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as ticketAPI from "../../utilities/ticket-api";
import logo from "../../assets/images/setting.svg";

export default function TicketDetailPage() {
    const [ticketDetail, setTicketDetail] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        async function getAndSetDetail() {
            try {
                const ticket = await ticketAPI.show(id);
                setTicketDetail(ticket);
            } catch (err) {
                console.log(err);
                setTicketDetail(null);
            }
        }
        if (id) getAndSetDetail();
    }, [id]);

    if (!ticketDetail) return <h3>Your ticket details will display soon...</h3>;

    return (
        <section className="detail-ticket-container">
            <div className="detail-ticket-img">
                <img src={logo} alt="Ticket logo" />
            </div>
            <div className="ticket-details">
                <h1>{ticketDetail.title}</h1>
                <h2>Status: {ticketDetail.status}</h2>
                <p>{ticketDetail.description}</p>
                <p><small>Created by: {ticketDetail.created_by}</small></p>
            </div>
            <div className="ticket-actions">
                <Link to={`/tickets/edit/${ticketDetail.id}`} className="btn warn">
                    Edit
                </Link>
                <Link to={`/tickets/confirm_delete/${ticketDetail.id}`} className="btn danger">
                    Delete
                </Link>
            </div>
        </section>
    );
}
