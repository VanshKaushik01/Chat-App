import axios from "axios";

// In development: use proxy configured in vite.config.js
// In production: use relative path
export const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});
