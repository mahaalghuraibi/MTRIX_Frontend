import "./styles.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as reactionsAPI from "../../utilities/reactions-api";

const EMOJI = { 1: "😐", 2: "🙂", 3: "🤩" };

export default function ReactionPage() {
  // نتوقع فتح الصفحة على مسار مثل: /tickets/:id/reactions
  const { id } = useParams();           // ticket id
  const [reactions, setReactions] = useState([]);
  const [formData, setFormData] = useState({ staff_id: "", score: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        if (!id) return;
        const data = await reactionsAPI.index(id);
        // ممكن يرجع مصفوفة مباشرة من السيرفر
        setReactions(Array.isArray(data) ? data : (data.items || []));
      } catch (e) {
        setReactions([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  function pickScore(s) {
    setFormData(prev => ({ ...prev, score: s }));
  }

  function handleChange(e) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!id) return;
    try {
      // { staff_id, score }
      const updated = await reactionsAPI.create(id, formData);
      setReactions(Array.isArray(updated) ? updated : (updated.items || []));
      // خليه جاهز لإدخال جديد
      setFormData(prev => ({ ...prev, score: 1 }));
    } catch (err) {
      console.log(err);
    }
  }

  if (loading) return <h1>Loading…</h1>;

  return (
    <section className="reactions-page" style={{ maxWidth: 720, margin: "0 auto" }}>
      <div className="page-header">
        <h1>Reactions for Ticket #{id}</h1>
      </div>

      {/* فورم الإضافة (إيموجي فقط) */}
      <form className="form-container" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="id_staff">Staff ID:</label>
          <input
            id="id_staff"
            name="staff_id"
            type="number"
            value={formData.staff_id}
            placeholder="Enter your staff ID"
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label>Reaction:</label>
          <div style={{ display: "flex", gap: 10 }}>
            {[1, 2, 3].map(s => (
              <button
                key={s}
                type="button"
                onClick={() => pickScore(s)}
                className="btn"
                style={{
                  padding: "8px 14px",
                  borderRadius: 12,
                  border: formData.score === s
                    ? "1px solid rgba(160,130,255,.8)"
                    : "1px solid rgba(160,130,255,.4)",
                  background: formData.score === s
                    ? "rgba(160,130,255,.25)"
                    : "rgba(12,12,32,.55)",
                  color: "#fff",
                  fontSize: 18
                }}
                aria-pressed={formData.score === s}
                title={`Choose ${EMOJI[s]}`}
              >
                {EMOJI[s]}
              </button>
            ))}
          </div>
        </p>

        <button type="submit" className="btn submit">Submit</button>
      </form>

      {/* قائمة الرياكشنز الحالية */}
      <div className="subsection-content" style={{ marginTop: 24 }}>
        <h3>Current Reactions</h3>
        {reactions.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Staff</th>
                <th>Reaction</th>
              </tr>
            </thead>
            <tbody>
              {reactions.map((r, i) => (
                <tr key={i}>
                  <td>{r.staff_id}</td>
                  <td style={{ fontSize: "1.25rem" }}>{EMOJI[r.score] || r.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No reactions yet.</p>
        )}
      </div>
    </section>
  );
}
