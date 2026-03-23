import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (user?.name && config.data) {
    config.data.userName = user.name;
  }

  return config;
});

export default api;
