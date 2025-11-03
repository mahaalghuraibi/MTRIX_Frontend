import "./styles.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams, Link } from "react-router-dom";
import setting from "../../assets/images/setting.svg";
import * as ticketAPI from "../../utilities/ticket-api";

//-----------------------------------------------------------------------------------------
export default function TicketFormPage({ createTicket, editTicket, deleteTicket, user }) { 
   //---------------------------------------------------------------------------------------
  // Local state
  const initialState = { title: "", description: "", status: "", priority: "" };
  const [formData, setFormData] = useState(initialState);
  const [currTicket, setCurrTicket] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

   //---------------------------------------------------------------------------------------
  // Init scroll animation
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

   //---------------------------------------------------------------------------------------
  // Load ticket for edit/delete
  useEffect(() => {
    async function load() {
      const t = await ticketAPI.show(id);
      setCurrTicket(t);
      setFormData(t);
    }
    if ((editTicket || deleteTicket) && id) load();
  }, [id, editTicket, deleteTicket]);

  //---------------------------------------------------------------------------------------
  // Handle inputs
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

   //---------------------------------------------------------------------------------------
  // Submit create/update
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { priority, ...dataToSend } = formData; 
      if (user?.profile?.role === "Staff" && !dataToSend.status) { 
        dataToSend.status = "open"; 
      }
      if (!dataToSend.title || !dataToSend.description || !dataToSend.status) { 
        alert('Please fill in all required fields'); 
        return; 
      }
      console.log('Sending data:', dataToSend); 
      const saved = editTicket
        ? await ticketAPI.update(dataToSend, currTicket.id) 
        : await ticketAPI.create(dataToSend); 
      console.log('Response:', saved);
      if (saved && saved.id) { 
        setFormData(initialState);
        navigate(`/tickets`);
      } else { 
        alert('Failed to save ticket. Please check console for details.'); 
      }
    } catch (err) { 
      console.error('Error saving ticket:', err); 
      alert('Error: ' + (err.message || 'Failed to save ticket')); 
    }
  }

  //---------------------------------------------------------------------------------------
  // Confirm delete
  async function handleDelete(e) {
    e.preventDefault();
    await ticketAPI.deleteTicket(currTicket.id);
    navigate("/tickets");
  }

   //---------------------------------------------------------------------------------------
  // Delete mode UI (loading)
  if (deleteTicket && !currTicket) return <h3>Loading...</h3>;
   //---------------------------------------------------------------------------------------
  // Delete mode UI (confirm)
  if (deleteTicket && currTicket) {
    return (
      <>
        <div className="page-header" data-aos="fade-up">
          <h1>Delete Ticket?</h1>
          <img src={setting} alt="Ticket icon" />
        </div>
        <h2 data-aos="fade-up">Delete "{currTicket.title}"?</h2>
        <form onSubmit={handleDelete} data-aos="fade-up">
          <Link to={`/tickets/${currTicket.id}`} className="btn secondary">Cancel</Link>
          <button type="submit" className="btn danger">Yes - Delete</button>
        </form>
      </>
    );
  }
  //---------------------------------------------------------------------------------------
  // Edit mode UI (loading)

  if (editTicket && !currTicket) return <h3>Loading...</h3>;

  //---------------------------------------------------------------------------------------
  // Create / Edit form
  return (
    <>
      <div className="page-header" data-aos="fade-up">
        <h1>{editTicket ? "Edit Ticket" : "Add a Ticket"}</h1>
        <img src={setting} alt="Ticket icon" />
      </div>

      <form className="form-container" onSubmit={handleSubmit} data-aos="fade-up">
        <table>
          <tbody>
            <tr>
              <th><label htmlFor="id_title">Title:</label></th>
              <td>
                <input
                  id="id_title"
                  name="title"
                  type="text"
                  maxLength="100"
                  required
                  value={formData.title || ""}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th><label htmlFor="id_description">Description:</label></th>
              <td>
                <textarea
                  id="id_description"
                  name="description"
                  rows="10"
                  maxLength="250"
                  required
                  value={formData.description || ""}
                  onChange={handleChange}
                />
              </td>
            </tr>
            {user?.profile?.role !== "Staff" && (
              <>
                <tr>
                  <th><label htmlFor="id_status">Status:</label></th>
                  <td>
                    <input
                      id="id_status"
                      name="status"
                      type="text"
                      required
                      value={formData.status || ""}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th><label htmlFor="id_priority">Priority:</label></th>
                  <td>
                    <input
                      id="id_priority"
                      name="priority"
                      type="text"
                      required
                      value={formData.priority || ""}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>

        <button type="submit" className="btn end submit">Submit!</button>
      </form>

      {createTicket && (
        <div style={{ textAlign: "center", marginTop: "1rem" }} data-aos="fade-up">
          <Link to="/staff" className="btn end submit">Back</Link>
        </div>
      )}
    </>
  );
}
