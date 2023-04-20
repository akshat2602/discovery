import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/",
});

api.interceptors.request.use(async (config) => {
  if (config.url?.includes("undefined")) {
    throw new axios.Cancel(
      "You are trying to access an undefined route. Please check your route and try again."
    );
  } else {
    if (localStorage.getItem("access_token")) {
      config.headers["Authorization"] = `Token ${localStorage.getItem(
        "access_token"
      )} `;
    }
    return config;
  }
});

export const dspawnApi = axios.create({
  baseURL: "http://localhost:8080/",
});

dspawnApi.interceptors.request.use(async (config) => {
  if (config.url?.includes("undefined")) {
    throw new axios.Cancel(
      "You are trying to access an undefined route. Please check your route and try again."
    );
  }
  return config;
});
