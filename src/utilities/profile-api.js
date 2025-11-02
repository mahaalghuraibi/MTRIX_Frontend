// src/utilities/profile-api.js
import sendRequest from "../utilities/sendRequest";

// 🟦 تحديث نوع البروفايل (Staff / Technician / Admin)
export async function saveProfile(type) {
  // نرسل القيمة للـ backend كـ { type: "staff" } أو { type: "tech" } أو { type: "admin" }
  return sendRequest("/profile/update/", "PUT", { type });
}

// 🟦 (اختياري) دالة لقراءة البروفايل الحالي لاحقًا إذا احتجتيها
export async function getProfile() {
  return sendRequest("/profile/", "GET");
}

