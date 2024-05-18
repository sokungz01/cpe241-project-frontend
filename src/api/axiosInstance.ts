import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 5000,
  withCredentials: true,
  headers: { Authorization: `Bearer ${accessToken}` },
});
