import axios from "axios";
import { useAuthStore } from "@/store/AuthStore";

axios.interceptors.request.use(function (config) {
  config.baseURL = process.env.VUE_APP_API_URL;
  config.withCredentials = true;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    let authStore = useAuthStore();
    if (error.response.status === 401) {
      authStore.logout();
    }
    return Promise.reject(error);
  }
);

export default axios;
