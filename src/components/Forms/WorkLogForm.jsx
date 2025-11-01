import { useState } from "react";
import * as worklogsAPI from "../../utilities/worklogs-api";

//-----------------------------------------------------------------------------------------
// WorkLog Form 
export default function WorkLogForm({ ticketDetail, ticketLogs, setTicketLogs }) {
    const today = new Date().toISOString().slice(0, 10);

//---------------------------------------------------------------------------------------
// Initial form state
    const initialState = {
        date: today,
        type: "F",
        note: "",
        ticket: ticketDetail.id
    };

    const [formData, setFormData] = useState(initialState);

//---------------------------------------------------------------------------------------
// Handle inputs
    function handleChange(evt) {
        const updatedData = { ...formData, [evt.target.name]: evt.target.value };
        setFormData(updatedData);
    }

//---------------------------------------------------------------------------------------
// Submit to API → update list → reset form    
    async function handleSubmit(evt) {
        try {
            evt.preventDefault();
            const updatedLogs = await worklogsAPI.create(formData, ticketDetail.id);
            setTicketLogs(updatedLogs);
            setFormData(initialState);
        } catch (err) {
            console.log(err);
            setTicketLogs([...ticketLogs]);
        }
    }

//---------------------------------------------------------------------------------------
// Today logs count 
    const todaysLogs = ticketLogs.filter(
        log => new Date(log.date).toISOString().slice(0, 10) === today
    );

//---------------------------------------------------------------------------------------
// UI
    return (
        <form className="form-container" onSubmit={handleSubmit}>

            {todaysLogs.length >= 3 ? (
                <p className="fed">✅ All work logs are complete for today!</p>
            ) : (
                <p className="unfed">⚠️ Pending work logs for today.</p>
            )}

            <p>
                <label htmlFor="id_date">Work Log Date:</label>
                <input
                    value={formData.date}
                    type="date"
                    name="date"
                    placeholder="Select a date"
                    onChange={handleChange}
                />
            </p>
            <p>
                <label htmlFor="id_type">Type:</label>
                <select
                    value={formData.type}
                    name="type"
                    id="id_type"
                    onChange={handleChange}
                >
                    <option value="F">Fix</option>
                    <option value="C">Check</option>
                    <option value="R">Replace</option>
                </select>
            </p>
            <p>
                <label htmlFor="id_note">Note:</label>
                <input
                    value={formData.note}
                    type="text"
                    name="note"
                    placeholder="Write a note..."
                    onChange={handleChange}
                />
            </p>
            <button type="submit" className="btn submit">Add Work Log</button>
        </form>
    );
}
