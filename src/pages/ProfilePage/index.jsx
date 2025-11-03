import "./styles.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import * as usersAPI from "../../utilities/users-api";
import * as profileAPI from "../../utilities/profile-api";

export default function ProfilePage({ user, setUser }) {
    const navigate = useNavigate();
    const [role, setRole] = useState("");

    //---------------------------------------------------------------------------------------
    // Init scroll animation
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const navOptions = {
        "Admin": "/admin",
        "Technician": "/technician",
        "Staff": "/staff",
        "home": "/home"
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const updatedUser = await profileAPI.saveProfile(role);

            setUser(updatedUser);
            console.log({ updatedUser })
            const r = updatedUser?.profile?.role || "home"    
            navigate(navOptions[r]);

        } catch (err) {
            console.log(err);
            alert("Failed to save role. Try again.");
        }
    }

    return (
        <main className="profile-page">
            <div className="profile-card" data-aos="fade-up">
                <h1>Complete Your Profile</h1>

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
