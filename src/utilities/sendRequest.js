export default async function sendRequest(url, method = "GET", payload) {
//---------------------------------------------------------------------------------------
  
const token = localStorage.getItem("accessToken");

// Setup options
  const options = { method };

  if (payload) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(payload);
  }
  //---------------------------------------------------------------------------------------

   if (token) {
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }
//---------------------------------------------------------------------------------------
// Send request
  try {
    const res = await fetch(`http://localhost:8000${url}`, options);
    const data = await res.json(); 
    if (res.ok) return data; 
    console.error('API Error:', res.status, data); 
    const errorMsg = data.error || data.detail || (typeof data === 'object' ? JSON.stringify(data) : data) || `Request failed with status ${res.status}`; // جديد
    throw new Error(errorMsg); 
  } catch (err) {
    console.log(err, "error in send-request");
    throw err; 
  }
}
