import mock from "../mock/recommend.json";

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";
const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export async function getRecommendation(payload) {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 600)); // fake network delay
    return { ...mock, language: payload.language };
  }

  const res = await fetch(`${BASE_URL}/recommend/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const details = await res.json().catch(() => ({}));
    const error = new Error("Request failed");
    error.status = res.status;
    error.details = details;
    throw error;
  }
  return res.json();
}

export function pdfUrl(reportId) {
  return `${BASE_URL}/report/${reportId}/pdf/`;
}