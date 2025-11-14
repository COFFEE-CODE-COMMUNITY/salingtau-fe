import { useState, useEffect } from "react"
import api from "./api"
import type { Course } from "./exploreCourse"

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export interface Transaction {
  id: string
  amount: number
  currency: string
  paymentGateway: string
  transactionId?: string
  status: PaymentStatus
  paymentDetails?: Record<string, any>
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
  course: Course
  createdAt: string
  updatedAt: string
}

// Service function
export const getTransactionHistory = async (userId: string): Promise<Transaction[]> => {
  const response = await api.get(`/transaction/student/${userId}/history`)
  
  if (response.status !== 200) {
    throw new Error(response.data?.message || "Failed to fetch transaction history")
  }
  
  // API might return array directly or wrapped in data property
  return Array.isArray(response.data) ? response.data : response.data?.data || []
}

// Custom hook
export const useTransactionHistory = (userId: string | undefined) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTransactionHistory = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await getTransactionHistory(id)
      setTransactions(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch transaction history")
      console.error("Error fetching transaction history:", err)
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    if (userId) {
      fetchTransactionHistory(userId)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchTransactionHistory(userId)
    } else {
      setLoading(false)
    }
  }, [userId])

  return {
    transactions,
    loading,
    error,
    refetch,
  }
}
