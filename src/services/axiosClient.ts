import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const getToken = () => localStorage.getItem("accessToken");

const axiosClient: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      if (config.headers) {
        config.headers.set?.("Authorization", `Bearer ${token}`);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    return error.response ?? Promise.reject(error);
  }
);

export default axiosClient;
