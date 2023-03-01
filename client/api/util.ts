import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/",
});

api.interceptors.request.use(async (config) => {
  if (config.url?.includes("undefined")) {
    throw new axios.Cancel(
      "You are trying to access an undefined route. Please check your route and try again."
    );
  } else {
    return config;
  }
});

export default api;
