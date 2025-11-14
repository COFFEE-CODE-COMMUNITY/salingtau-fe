// Transaction DTOs sesuai dengan backend

export interface CreateTransactionDto {
  userId: string;      // UUID format
  courseId: string;    // UUID format
  amount: number;      // Minimal 1
  currency: string;    // Default: "IDR"
}

export interface CreateTransactionResponseDto {
  transactionId: string;
  snapToken: string;
  redirectUrl: string;
}

// Payment enums
export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED"
}

// Transaction entity
export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  paymentGateway: string;
  transactionId?: string;
  status: PaymentStatus;
  paymentDetails?: Record<string, any>;
  userId: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}
