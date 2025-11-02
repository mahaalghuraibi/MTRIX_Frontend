import "./styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import * as usersAPI from "../../utilities/users-api";
import * as profileAPI from "../../utilities/profile-api";

export default function ProfilePage({ user, setUser }) {
    const navigate = useNavigate();
    const [role, setRole] = useState("");

    const navOptions = {
        "Admin": "/admin",
        "Technician": "/technician",
        "Staff": "/staff",
        "home": "/home"
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            // // احفظ الدور في الباك-إند
            const updatedUser = await profileAPI.saveProfile(role);

            // حدّث حالة المستخدم
            setUser(updatedUser);
            console.log({ updatedUser })
            // وجّهي حسب الدور
            const r = updatedUser?.profile?.role || "home"    
            navigate(navOptions[r]);

        } catch (err) {
            console.log(err);
            // خياري: عرض رسالة خطأ بسيطة
            alert("Failed to save role. Try again.");
        }
    }

    return (
        <main className="profile-page">
            <div className="profile-card">
                <h1>Complete Your Profile</h1>
                <p className="hint">Choose your role to continue</p>

                <form onSubmit={handleSubmit} className="profile-form">
                    <label htmlFor="role">Role</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="">— Select your role —</option>
                        <option value="Staff">Staff</option>
                        <option value="Technician">Technician</option>
                        <option value="Admin">Admin</option>
                    </select>

                    <button type="submit" className="btn submit">Save & Continue</button>
                </form>
            </div>
        </main>
    );
}
