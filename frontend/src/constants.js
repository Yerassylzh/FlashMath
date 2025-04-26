import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_API_BASE_URL;
export const AI_MODEL = "llama-3.3-70b-versatile";
export const CARDS_CNT = 10;

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});
