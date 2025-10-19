import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshRes = await api.post("/auth/refresh");
        const newToken = refreshRes.data?.accessToken;

        localStorage.setItem("access_token", newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token gagal:", refreshError);
        localStorage.removeItem("access_token");
        window.location.href = "/login";
      }
    }

    if (error.response?.status === 500) {
      console.error("Server Error:", error.response.data);
    }

    return Promise.reject(error);
  }
);

export default api