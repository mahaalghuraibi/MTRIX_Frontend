import "./styles.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom"; 
import computer from "../../assets/images/computer.svg";
import setting from "../../assets/images/setting.svg";
import TicketCard from "../../components/TicketCard";
import * as ticketAPI from "../../utilities/ticket-api";

//-----------------------------------------------------------------------------------------
// Tickets Page (list all tickets)
export default function TicketsPage() {
    //---------------------------------------------------------------------------------------
  // State

  const [allTickets, setAllTickets] = useState([]);
  const location = useLocation(); 

  //---------------------------------------------------------------------------------------
  // Init scroll animation
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  //---------------------------------------------------------------------------------------
  // Fetch tickets
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
    const timer = setTimeout(() => {
      getAllTickets(); 
    }, 100); 
    return () => clearTimeout(timer); 
  }, [location.pathname]); 

   //---------------------------------------------------------------------------------------
  // Map each ticket
  const displayAllTickets = allTickets.map((t, i) => (
    <div key={i} data-aos="fade-up">
      <TicketCard ticket={t} />
    </div>
  ));

  //---------------------------------------------------------------------------------------
  // UI
  return (
    <>
      <section className="page-header" data-aos="fade-up">
        <h1>All Tickets</h1>
        <img src={computer} alt="Computer icon" />
        <img src={setting} alt="Settings icon" />
      </section>

      <div style={{ textAlign: "center", marginBottom: "1rem" }} data-aos="fade-up">
        <Link to="/staff" className="btn end submit">Back</Link>
      </div>

      <section className="index-card-container">
        {displayAllTickets}
      </section>
    </>
  );
}
