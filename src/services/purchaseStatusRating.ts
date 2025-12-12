import api from "@/services/api.ts";

export const purchaseStatusRating = async (courseId: string) => {
  const response = await api.get(`/rating/${courseId}/purchase-status`, {
    withCredentials: true
  })

  return response.data
}