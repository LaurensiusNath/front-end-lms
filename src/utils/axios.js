import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { STORAGE_KEY } from "./constants";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const apiInstance = axios.create({
  baseURL,
  timeout: 3000,
});

export const apiInstanceAuth = axios.create({
  baseURL,
  timeout: 3000,
});

apiInstanceAuth.interceptors.request.use((config) => {
  const session = secureLocalStorage.getItem(STORAGE_KEY);
  if (!session) {
    return config;
  }
  config.headers.Authorization = `JWT ${session.token}`;
  return config;
});

apiInstanceAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend sends JSON { message: "Token Expired" }
    if (error.response?.data?.message === "Token Expired") {
      // Clear storage
      secureLocalStorage.removeItem(STORAGE_KEY);

      // Redirect to login page
      window.location.href = "/manager/sign-in";
    }

    return Promise.reject(error);
  }
);

export default apiInstance;
