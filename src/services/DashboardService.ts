import api from "./api.ts";

const handleError = (error: any) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    "Terjadi kesalahan pada server"

  throw { message, status: error?.response?.status || 500 }
}

const DashboardService = {
  verifyStatus: async ()=> {
    try {
      const res = await api.get(
        "/instructors/me/verification",
        {
          withCredentials: true,
          skipAuth: false,
        })
      return res.data
    } catch(error) {
      handleError(error)
    }
  }
}

export default DashboardService