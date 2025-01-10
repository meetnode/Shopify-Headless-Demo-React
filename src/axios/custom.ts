import { Axios } from "axios";

const axiosInterceptor = new Axios({
  baseURL: "http://localhost:3000/api",
  headers: {
    Accept: "application/json",
  },
});

// Add a request interceptor
axiosInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config; 
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInterceptor;
