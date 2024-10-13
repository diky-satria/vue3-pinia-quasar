import axios from "axios";

axios.interceptors.request.use(function (config) {
  config.baseURL = process.env.VUE_APP_API_URL;
  config.withCredentials = true;
  return config;
});

export default axios;
