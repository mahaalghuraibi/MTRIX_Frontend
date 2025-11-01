import sendRequest from "./sendRequest";

const BASE_URL = "/tickets/";

// ✅ جلب كل الرياكشنز لتيكِت محدد
export function index(ticketId) {
  return sendRequest(`${BASE_URL}${ticketId}/reactions/`);
}

// ✅ إضافة رياكشن جديد (😐/🙂/🤩) لتيكِت محدد
export function create(ticketId, formData) {
  // formData: { staff_id: <number>, score: 1|2|3 }
  return sendRequest(`${BASE_URL}${ticketId}/reactions/`, "POST", formData);
}
