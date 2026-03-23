import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (user?.name && config.data) {
    config.data.userName = user.name;
  }

  return config;
});

export default api;
