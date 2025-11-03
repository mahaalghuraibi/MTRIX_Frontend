import sendRequest from "../utilities/sendRequest";

export async function saveProfile(type) {
  return sendRequest("/profile/update/", "PUT", { type });
}

export async function getProfile() {
  return sendRequest("/profile/", "GET");
}

