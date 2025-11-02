import { useState } from "react";

//-----------------------------------------------------------------------------------------
// AddProfileForm Component 
//-----------------------------------------------------------------------------------------
export default function AddProfileForm({ user, updateProfile }) {

  //---------------------------------------------------------------------------------------
  // Initial State
  const initialState = { role: "Staff" };
  const [formData, setFormData] = useState(initialState);

  //---------------------------------------------------------------------------------------
  // Handle change 
  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  //---------------------------------------------------------------------------------------
  // Handle submit 
  async function handleSubmit(evt) {
    evt.preventDefault();
    await updateProfile(user.id, formData);
    setFormData(initialState);
  }

  //---------------------------------------------------------------------------------------
  // Form UI
  return (
    <>
      <h3>Change {user.username}'s role</h3>

      <form onSubmit={handleSubmit} autoComplete="off">
        <p>
          <label htmlFor="id_role">Role:</label>
          <select
            id="id_role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="Staff">Staff</option>
            <option value="Technician">Technician</option>
            <option value="Admin">Admin</option>
          </select>
        </p>

        <button type="submit" className="btn submit">Update Role</button>
      </form>
    </>
  );
}
