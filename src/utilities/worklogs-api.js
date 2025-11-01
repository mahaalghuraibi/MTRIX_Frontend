import sendRequest from "./sendRequest";

//-----------------------------------------------------------------------------------------
// Base URL
const BASE_URL = "/tickets/";

//-----------------------------------------------------------------------------------------
// Get all worklogs for one ticket

export function ticketLogs(ticketId) {
  return sendRequest(`${BASE_URL}${ticketId}/worklogs/`);
}

//-----------------------------------------------------------------------------------------
// Create new worklog
export function create(formData, ticketId) {
  return sendRequest(`${BASE_URL}${ticketId}/worklogs/`, "POST", formData);
}
