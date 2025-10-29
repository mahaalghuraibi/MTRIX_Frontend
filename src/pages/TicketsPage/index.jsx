import "./styles.css";
import { useState, useEffect } from "react";
import computer from "../../assets/images/computer.svg";
import setting from "../../assets/images/setting.svg";
import TicketCard from "../../components/TicketCard";
import * as ticketAPI from "../../utilities/ticket-api";

export default function TicketsPage() {
  const [allTickets, setAllTickets] = useState([]);

  useEffect(() => {
    async function getAllTickets() {
      try {
        const ticketData = await ticketAPI.index();
        console.log(ticketData);
        setAllTickets(ticketData);
      } catch (err) {
        console.log(err);
      }
    }
    if (allTickets.length === 0) getAllTickets();
  }, []);

  const displayAllTickets = allTickets.map((t, i) => (
    <TicketCard key={i} ticket={t} />
  ));

  return (
    <>
      <section className="page-header">
        <h1>All Tickets</h1>
        <img src={computer} alt="Computer icon" />
        <img src={setting} alt="Settings icon" />
      </section>

      <section className="index-card-container">
        {displayAllTickets}
      </section>
    </>
  );
}
