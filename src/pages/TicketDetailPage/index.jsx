import "./styles.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as ticketAPI from "../../utilities/ticket-api";
import logo from "../../assets/images/setting.svg";
import WorkLogForm from "../../components/Forms/WorkLogForm";

import * as worklogsAPI from "../../utilities/worklogs-api";
import * as reactionsAPI from "../../utilities/reactions-api"; // ✅ جديد

const TYPES = { 
  'F': 'Fix',
  'C': 'Check',
  'R': 'Replace'
}; 

export default function TicketDetailPage() {
  const [ticketDetail, setTicketDetail] = useState(null);
  const { id } = useParams();

  const [ticketLogs, setTicketLogs] = useState([]);

  // ✅ جديد: حالات الرياكشنز
  const [reactions, setReactions] = useState([]);
  const [reactionForm, setReactionForm] = useState({ staff_id: 1, score: 1 }); // افتراضي: موظف 1 وتقييم 😐

  useEffect(() => {
    async function getAndSetDetail() {
      try {
        const ticket = await ticketAPI.show(id);
        setTicketDetail(ticket);

        const logs = await worklogsAPI.ticketLogs(id);
        setTicketLogs(logs);

        // ✅ جديد: جلب رياكشنز التيكِت
        const rx = await reactionsAPI.index(id);
        setReactions(Array.isArray(rx) ? rx : []);
      } catch (err) {
        console.log(err);
        setTicketDetail(null);
      }
    }
    if (id) getAndSetDetail();
  }, [id]);

  // ✅ جديد: تغيير قيمة الإيموجي المختار
  function handleReactionChange(evt) {
    setReactionForm({ ...reactionForm, score: Number(evt.target.value) });
  }

  // ✅ جديد: إرسال الرياكشن
  async function handleReactionSubmit(evt) {
    evt.preventDefault();
    try {
      // formData المتوقع: { staff_id: number, score: 1|2|3 }
      const updated = await reactionsAPI.create(id, reactionForm);
      // الـ API يرجّع قائمة محدّثة – نحافظ على السلوك نفسه
      setReactions(Array.isArray(updated) ? updated : reactions);
    } catch (err) {
      console.log(err);
    }
  }

  if (!ticketDetail) return <h3>Your ticket details will display soon...</h3>;

  // ✅ جديد: حساب عدّادات سريعة للواجهة
  const counts = reactions.reduce((acc, r) => {
    acc[r.score] = (acc[r.score] || 0) + 1;
    return acc;
  }, { 1: 0, 2: 0, 3: 0 });

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

      {/* ✅ جديد: قسم الرياكشنز — بسيط وخفيف، أسفل Work Logs */}
      <div className="worklogs-container">
        <section className="worklogs">
          <div className="subsection-title">
            <h2>Reactions</h2>
          </div>

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

          {/* ملخص صغير للرياكشنز الحالية */}
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
      {/* نهاية قسم الرياكشنز */}
    </section>
  );
}
