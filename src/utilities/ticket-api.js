import sendRequest from "./sendRequest";
const url = "/tickets/";

export async function index() {
  return sendRequest(url);
}
