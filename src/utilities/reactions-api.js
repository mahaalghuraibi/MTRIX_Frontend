import sendRequest from "./sendRequest";


//-----------------------------------------------------------------------------------------

const BASE_URL = "/tickets/";

//-----------------------------------------------------------------------------------------

export function indexByTicket(ticketId) {
  return sendRequest(`${BASE_URL}${ticketId}/reactions/`);
}

//-----------------------------------------------------------------------------------------
export function createByTicket(ticketId, formData) {
  return sendRequest(`${BASE_URL}${ticketId}/reactions/`, "POST", formData);
}

//-----------------------------------------------------------------------------------------
export async function update(formData, reactionId) {
  return sendRequest(`/reactions/${reactionId}/`, "PUT", formData);
}

//-----------------------------------------------------------------------------------------
export async function deleteReaction(reactionId) {
  return sendRequest(`/reactions/${reactionId}/`, "DELETE");
}
