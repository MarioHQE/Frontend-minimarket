import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3600", // o el backend que uses
});

// Este interceptor agrega el token automáticamente si existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // o sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
