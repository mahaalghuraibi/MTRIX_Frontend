import sendRequest from "./sendRequest";


//-----------------------------------------------------------------------------------------

const BASE_URL = "/tickets/";

//-----------------------------------------------------------------------------------------

export function index(ticketId) {
  return sendRequest(`${BASE_URL}${ticketId}/reactions/`);
}

//-----------------------------------------------------------------------------------------
export function create(ticketId, formData) {
  return sendRequest(`${BASE_URL}${ticketId}/reactions/`, "POST", formData);
}
