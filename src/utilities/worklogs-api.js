import sendRequest from "./sendRequest";

const BASE_URL = "/tickets/";

export function ticketLogs(ticketId) {
  return sendRequest(`${BASE_URL}${ticketId}/worklogs/`);
}

export function create(formData, ticketId) {
  return sendRequest(`${BASE_URL}${ticketId}/worklogs/`, "POST", formData);
}
