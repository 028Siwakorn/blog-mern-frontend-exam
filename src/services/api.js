import axios from "axios";
import TokenService from "./token.service";
const baseURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use((config) => {
  const token = TokenService.getAccessToken();
  console.log(baseURL);
  if (token) {
    config.headers["x-access-token"] = token;
  }
  return config;
});

export default instance;
