import "./styles.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as ticketAPI from "../../utilities/ticket-api";
import logo from "../../assets/images/setting.svg";
import AddProfileForm from "../../components/Forms/AddProfileForm"; 


//-----------------------------------------------------------------------------------------
// User Detail Page
export default function UserDetailPage({ initialUser = null }) {
  const [userDetail, setUserDetail] = useState(initialUser);
  const { id } = useParams();

  //---------------------------------------------------------------------------------------
  // Role state (Admin / Staff / Technician)
  const [roleForm, setRoleForm] = useState({ role: "Staff" });

  //---------------------------------------------------------------------------------------
  // On mount: hydrate from initialUser 
  useEffect(() => {
    if (initialUser) {
      setUserDetail(initialUser);
      setRoleForm({ role: initialUser?.profile?.role ?? "Staff" });
    }
  }, [initialUser]);

  //---------------------------------------------------------------------------------------
  // Handle role change
  function handleRoleChange(evt) {
    setRoleForm({ role: evt.target.value });
  }

  //---------------------------------------------------------------------------------------
  // Submit role (creates/updates One-to-One Profile)
  async function handleRoleSubmit(evt) {
    evt.preventDefault();
    try {
      const updatedUser = await ticketAPI.updateProfile(id, roleForm);
      setUserDetail(updatedUser);
      setRoleForm({ role: updatedUser?.profile?.role ?? "Staff" });
    } catch (err) {
      console.log(err);
      setUserDetail({ ...userDetail });
    }
  }

  //---------------------------------------------------------------------------------------
  // Function to pass to AddProfileForm (same idea as addPhoto in lesson)
  async function updateProfile(userId, formData) {
    try {
      const updatedUser = await ticketAPI.updateProfile(userId, formData);
      setUserDetail(updatedUser);
    } catch (err) {
      console.log(err);
      setUserDetail({ ...userDetail });
    }
  }

  if (!userDetail) return <h3>Your user details will display soon...</h3>;

  //---------------------------------------------------------------------------------------
  // Page UI
  return (
    <section className="detail-user-container">
      <div className="detail-user-img">
        <img src={logo} alt="User logo" />
      </div>

      <div className="user-details">
        <h1>{userDetail.username}</h1>
        <h2>Email: {userDetail.email || "—"}</h2>
        <p>
          <strong>Role:</strong>{" "}
          {userDetail.profile?.role ? userDetail.profile.role : "Staff"}
        </p>
      </div>

      <div className="user-actions">
        <Link to={`/users`} className="btn">
          Back
        </Link>
        <Link to={`/users/${id}/edit`} className="btn warn">
          Edit
        </Link>
      </div>

      {/*-----------------------------------------------------------------------------------*/}
      {/* Update Role Section  */}
      <div className="worklogs-container">
        <section className="worklogs">
          <div className="subsection-title">
            <h2>Update Role</h2>
          </div>

          {/*---------------------------------------------------------------------------------*/}
          {/* AddProfileForm Component  */}
          <AddProfileForm user={userDetail} updateProfile={updateProfile} />
          {/*---------------------------------------------------------------------------------*/}

          {/*---------------------------------------------------------------------------------*/}
          {/* Old form can be kept for reference or removed */}
          <form className="form-container" onSubmit={handleRoleSubmit}>
            <p>
              <label htmlFor="role_select">Choose role:</label>
              <div
                id="role_select"
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "center",
                }}
              >
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="Staff"
                    checked={roleForm.role === "Staff"}
                    onChange={handleRoleChange}
                  />{" "}
                  Staff
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="Technician"
                    checked={roleForm.role === "Technician"}
                    onChange={handleRoleChange}
                  />{" "}
                  Technician
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="Admin"
                    checked={roleForm.role === "Admin"}
                    onChange={handleRoleChange}
                  />{" "}
                  Admin
                </label>
              </div>
            </p>
            <button type="submit" className="btn submit">
              Save Role
            </button>
          </form>

          {/*---------------------------------------------------------------------------------*/}
          {/* Summary */}
          <div className="subsection-content" style={{ marginTop: "12px" }}>
            <p>
              Current role:&nbsp;
              <strong>{userDetail.profile?.role ?? "Staff"}</strong>
            </p>
          </div>
        </section>
      </div>
      {/*-----------------------------------------------------------------------------------*/}
    </section>
  );
}
