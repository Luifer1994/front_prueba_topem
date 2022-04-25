import axios from "axios";

export const createInstaceAxios = axios.create({
  baseURL: process.env.VUE_APP_URL_API,
});


createInstaceAxios.interceptors.request.use(
  (config) => {
    const currentUser = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    if (currentUser) {
      config.headers["Authorization"] = `Bearer ${currentUser} `;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


