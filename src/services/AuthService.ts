import api from "./api";

const AuthService = {
  login: async (data: {email: string; password: string}) => {
    const res = await api.post("/auth/login", data);
    return res.data;
  },
  register: async (data: {firstName: string, lastName: string, email: string, password: string}) => {
    const res = await api.post("/auth/register", data);
    return res.data;
  },
  refreshToken: async () => {
    const res = await api.post("/auth/refresh-token");
    return res.data;
  }
}

export default AuthService;