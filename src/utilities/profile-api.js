// src/utilities/profile-api.js
import sendRequest from "./sendRequest";

// GET /api/profile/me/
export function getMyProfile() {
  return sendRequest("/api/profile/me/");
}

// PUT /api/profile/me/
export function updateProfile(data) {
  // data شكلها: { role: "Staff" | "Technician" | "Admin" }
  return sendRequest("/api/profile/me/", "PUT", data);
}
