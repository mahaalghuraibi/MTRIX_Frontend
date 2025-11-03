import "./styles.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as ticketAPI from "../../utilities/ticket-api";
import logo from "../../assets/images/setting.svg";
import WorkLogForm from "../../components/Forms/WorkLogForm";

import * as worklogsAPI from "../../utilities/worklogs-api";
import * as reactionsAPI from "../../utilities/reactions-api"; 

//-----------------------------------------------------------------------------------------
// WorkLog Types

const TYPES = { 
  'F': 'Fix',
  'C': 'Check',
  'R': 'Fixed'
}; 

//-----------------------------------------------------------------------------------------
const EMOJI = { 1: "😐", 2: "🙂", 3: "🤩" };

//-----------------------------------------------------------------------------------------
// Ticket Detail Page
export default function TicketDetailPage({ user }) {
  const [ticketDetail, setTicketDetail] = useState(null);
  const { id } = useParams();

  const [ticketLogs, setTicketLogs] = useState([]);

 //-----------------------------------------------------------------------------------------
  // Reactions state
  const [reactions, setReactions] = useState([]);
  const [reactionForm, setReactionForm] = useState({ staff_id: 1, score: 1 }); 
  const [editingReaction, setEditingReaction] = useState(null);

   //-----------------------------------------------------------------------------------------
  // Fetch ticket + worklogs + reactions
  useEffect(() => {
    async function getAndSetDetail() {
      try {
        const ticket = await ticketAPI.show(id);
        setTicketDetail(ticket);

        const logs = await worklogsAPI.ticketLogs(id);
        setTicketLogs(logs);

        const reactions = await reactionsAPI.indexByTicket(id);
        setReactions(Array.isArray(reactions) ? reactions : []);
      } catch (err) {
        console.log(err);
        setTicketDetail(null);
      }
    }
    if (id) getAndSetDetail();
  }, [id]);

  //-----------------------------------------------------------------------------------------
  // Update emoji
  function handleReactionChange(evt) {
    setReactionForm({ ...reactionForm, score: Number(evt.target.value) });
  }

//-----------------------------------------------------------------------------------------
  // Submit reaction
  async function handleReactionSubmit(evt) {
    evt.preventDefault();
    try {
      const updated = await reactionsAPI.createByTicket(id, reactionForm);
      setReactions(Array.isArray(updated) ? updated : reactions);
      setReactionForm({ staff_id: 1, score: 1 });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteReaction(reactionId) {
    if (!window.confirm("Are you sure you want to delete this reaction?")) {
      return;
    }
    try {
      await reactionsAPI.deleteReaction(reactionId);
      setReactions(reactions.filter(r => r.id !== reactionId));
    } catch (err) {
      console.log(err);
      alert("Failed to delete reaction");
    }
  }

  function handleStartEdit(reaction) {
    setEditingReaction({ ...reaction });
  }

  function handleCancelEdit() {
    setEditingReaction(null);
  }

  async function handleSaveEdit(evt) {
    evt.preventDefault();
    try {
      const dataToSend = {
        ticket: Number(editingReaction.ticket),
        staff_id: Number(editingReaction.staff_id),
        score: Number(editingReaction.score)
      };
      const updated = await reactionsAPI.update(dataToSend, editingReaction.id);
      setReactions(reactions.map(r => r.id === editingReaction.id ? updated : r));
      setEditingReaction(null);
    } catch (err) {
      console.log(err);
      alert("Failed to update reaction");
    }
  }

  //---------------------------------------------------------------------------------------
  // Update ticket status (for Technician)
  async function handleStatusChange(newStatus) {
    try {
      const dataToSend = {
        title: ticketDetail.title,
        description: ticketDetail.description,
        status: newStatus
      };
      const updated = await ticketAPI.update(dataToSend, ticketDetail.id);
      setTicketDetail(updated);
    } catch (err) {
      console.log(err);
      alert("Failed to update ticket status");
    }
  }

  if (!ticketDetail) return <h3>Your ticket details will display soon...</h3>;

//-----------------------------------------------------------------------------------------
  // Count reactions for UI
  const counts = reactions.reduce((acc, r) => {
    acc[r.score] = (acc[r.score] || 0) + 1;
    return acc;
  }, { 1: 0, 2: 0, 3: 0 });

//-----------------------------------------------------------------------------------------
  // Page UI
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
        {user?.profile?.role === "Technician" ? (
          <>
            <button 
              onClick={() => handleStatusChange("open")} 
              className={`btn ${ticketDetail.status === "open" ? "warn" : "secondary"}`}
              disabled={ticketDetail.status === "open"}
            >
              Open
            </button>
            <button 
              onClick={() => handleStatusChange("close")} 
              className={`btn ${ticketDetail.status === "close" ? "danger" : "secondary"}`}
              disabled={ticketDetail.status === "close"}
            >
              Close
            </button>
          </>
        ) : (
          <>
            <Link to={`/tickets/edit/${ticketDetail.id}`} className="btn warn">
              Edit
            </Link>
            <Link to={`/tickets/confirm_delete/${ticketDetail.id}`} className="btn danger">
              Delete
            </Link>
          </>
        )}
      </div>
      {/*-------------------------------------------------------------------------------------*/}
      {(user?.profile?.role === "Technician" || user?.profile?.role === "Admin") && (
        <div className="worklogs-container">
          <section className="worklogs">
            <div className="subsection-title">
              <h2>Work Logs</h2> 
            </div>

            <h3>Add a Work Log</h3>
            <WorkLogForm 
              ticketDetail={ticketDetail} 
              ticketLogs={ticketLogs} 
              setTicketLogs={setTicketLogs} 
            />

            {ticketLogs.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {ticketLogs.map((log, ind) => (  
                    <tr key={ind}>
                      <td>{log.date}</td>
                      <td>{TYPES[log.type]}</td> 
                      <td>{log.note}</td> 
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="subsection-content">
                <p>⚠️ This ticket has no work logs yet!</p>
              </div>
            )}
          </section>
        </div>
      )}

      {/*-------------------------------------------------------------------------------------*/}
      {user?.profile?.role === "Staff" && (
        <div className="worklogs-container">
          <section className="worklogs">
            <div className="subsection-title">
              <h2>Work Logs</h2> 
            </div>

            {ticketLogs.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {ticketLogs.map((log, ind) => (  
                    <tr key={ind}>
                      <td>{log.date}</td>
                      <td>{TYPES[log.type]}</td> 
                      <td>{log.note}</td> 
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="subsection-content">
                <p>⚠️ This ticket has no work logs yet!</p>
              </div>
            )}
          </section>
        </div>
      )}

      {/*-------------------------------------------------------------------------------------*/}
      {/* Reactions Section */}
      <div className="worklogs-container">
        <section className="worklogs">
          <div className="subsection-title">
            <h2>Reactions</h2>
          </div>

          {user?.profile?.role !== "Technician" && (
            <>
              <h3>Add a Reaction</h3>
              <form className="form-container" onSubmit={handleReactionSubmit}>
            <p>
              <label htmlFor="rx_score">Choose:</label>
              <div id="rx_score" style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                <label>
                  <input
                    type="radio"
                    name="score"
                    value={1}
                    checked={reactionForm.score === 1}
                    onChange={handleReactionChange}
                  />{" "}
                  😐
                </label>
                <label>
                  <input
                    type="radio"
                    name="score"
                    value={2}
                    checked={reactionForm.score === 2}
                    onChange={handleReactionChange}
                  />{" "}
                  🙂
                </label>
                <label>
                  <input
                    type="radio"
                    name="score"
                    value={3}
                    checked={reactionForm.score === 3}
                    onChange={handleReactionChange}
                  />{" "}
                  🤩
                </label>
              </div>
            </p>
            <button type="submit" className="btn submit">Add Reaction</button>
          </form>
            </>
          )}

          {/*---------------------------------------------------------------------------------*/}
          {reactions.length > 0 && (
            <div className="subsection-content" style={{ marginTop: "12px" }}>
              <h3>All Reactions</h3>
              <table>
                <thead>
                  <tr>
                    <th>Staff ID</th>
                    <th>Reaction</th>
                    {user?.profile?.role !== "Technician" && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {reactions.map((r) => (
                    user?.profile?.role !== "Technician" && editingReaction && editingReaction.id === r.id ? (
                      <tr key={r.id}>
                        <td>
                          <input
                            type="number"
                            value={editingReaction.staff_id}
                            onChange={(e) => setEditingReaction({ ...editingReaction, staff_id: Number(e.target.value) })}
                            style={{ width: "80px" }}
                          />
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: "8px" }}>
                            {[1, 2, 3].map(s => (
                              <label key={s} style={{ cursor: "pointer" }}>
                                <input
                                  type="radio"
                                  name={`edit_score_${r.id}`}
                                  value={s}
                                  checked={editingReaction.score === s}
                                  onChange={() => setEditingReaction({ ...editingReaction, score: s })}
                                />
                                {" "}{EMOJI[s]}
                              </label>
                            ))}
                          </div>
                        </td>
                        <td>
                          <button
                            onClick={handleSaveEdit}
                            className="btn submit"
                            style={{ marginRight: "4px" }}
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="btn secondary"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={r.id}>
                        <td>{r.staff_id}</td>
                        <td>{EMOJI[r.score] || r.score}</td>
                        {user?.profile?.role !== "Technician" && (
                          <td>
                            <button
                              onClick={() => handleStartEdit(r)}
                              className="btn warn"
                              style={{ marginRight: "4px" }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteReaction(r.id)}
                              className="btn danger"
                            >
                              Delete
                            </button>
                          </td>
                        )}
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/*---------------------------------------------------------------------------------*/}
          {/* Reactions summary */}
          <div className="subsection-content" style={{ marginTop: "12px" }}>
            <p>
              Current reactions: &nbsp;
              <span title="😐">{counts[1]} 😐</span>&nbsp;&nbsp;
              <span title="🙂">{counts[2]} 🙂</span>&nbsp;&nbsp;
              <span title="🤩">{counts[3]} 🤩</span>
            </p>
          </div>
        </section>
      </div>
      {/*-------------------------------------------------------------------------------------*/}
    </section>
  );
}
