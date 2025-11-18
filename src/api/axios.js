// src/api/axios.js
import axios from "axios";

// Normalize base URL (remove trailing slash)
const BASE = import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, "");
console.log("API BASE URL:", import.meta.env.VITE_API_BASE_URL);
// Create Axios instance
const api = axios.create({
  baseURL: BASE, // SAFE ✔
  headers: {
    "Content-Type": "application/json",
  },
});

// Token helpers
const getAccess = () => localStorage.getItem("accessToken");
const getRefresh = () => localStorage.getItem("refreshToken");

// Attach access token automatically
api.interceptors.request.use((config) => {
  const token = getAccess();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle refresh flow
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // If not 401 → reject normally
    if (!err.response || err.response.status !== 401 || originalRequest._retry) {
      return Promise.reject(err);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    isRefreshing = true;

    const refresh = getRefresh();
    if (!refresh) {
      isRefreshing = false;
      return Promise.reject(err);
    }

    try {
      const refreshURL = `${BASE}/auth/refresh/`; // SAFE ✔

      const res = await axios.post(refreshURL, { refresh });

      const newAccess = res.data.access;
      localStorage.setItem("accessToken", newAccess);

      processQueue(null, newAccess);

      originalRequest.headers.Authorization = `Bearer ${newAccess}`;
      return api(originalRequest);
    } catch (refreshErr) {
      processQueue(refreshErr, null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
