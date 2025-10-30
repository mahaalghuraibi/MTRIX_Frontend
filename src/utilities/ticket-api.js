import sendRequest from "./sendRequest";
const url = "/tickets/";

// GET all tickets
export async function index() {
  return sendRequest(url);
}

// POST 
export async function create(formData) {
  return sendRequest(url, "POST", formData);
}


// put
export async function update(formData, ticketId) {
  return sendRequest(`${url}${ticketId}/`, "PUT", formData);
}

// delete
export async function deleteTicket(ticketId) {
  return sendRequest(`${url}${ticketId}/`, "DELETE");
}

export async function show(ticketId) {
  return sendRequest(`${url}${ticketId}/`);
}