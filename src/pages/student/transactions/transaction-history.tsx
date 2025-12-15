import { Calendar, CreditCard, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTransactionHistory, PaymentStatus } from "@/services/transactionHistory.ts";
import { useUser } from "@/utils/user-context.tsx";

export function buildImageUrl(path: string | null | undefined): string {
  const API_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || 'http://localhost:8081/api/v1';
  const DEFAULT_IMAGE = '/placeholder-image.jpg';

  if (!path) {
    return DEFAULT_IMAGE;
  }

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${API_BASE_URL}/${cleanPath}`;
}

export default function TransactionHistory() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { transactions, loading, error } = useTransactionHistory(user?.id);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const getStatusBadge = (status: PaymentStatus) => {
    const statusConfig = {
      [PaymentStatus.COMPLETED]: {
        label: "Completed",
        className: "bg-green-50 text-green-700",
      },
      [PaymentStatus.PENDING]: {
        label: "Pending",
        className: "bg-yellow-50 text-yellow-700",
      },
      [PaymentStatus.FAILED]: {
        label: "Failed",
        className: "bg-red-50 text-red-700",
      },
      [PaymentStatus.CANCELLED]: {
        label: "Cancelled",
        className: "bg-gray-50 text-gray-700",
      },
    };
    return statusConfig[status] || statusConfig[PaymentStatus.PENDING];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar (disamakan dengan Explore & MyCourse) */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <div className="h-16 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-900">
            Transaction History
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <p className="text-gray-600">Loading transactions...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Transactions List */}
        {!loading && !error && transactions && transactions.length > 0 && (
          <div className="space-y-4">
            {transactions.map((transaction) => {
              const statusBadge = getStatusBadge(transaction.status);
              
              return (
                <div
                  key={transaction.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow p-6"
                >
                  <div className="flex items-start gap-4">
                    {/* Course Thumbnail */}
                    <img
                      src={buildImageUrl(transaction.course.thumbnail.path)}
                      alt={transaction.course.title}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />

                    {/* Transaction Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                          {transaction.course.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusBadge.className}`}
                        >
                          {statusBadge.label}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(transaction.createdAt)}</span>
                        </div>
                        {transaction.transactionId && (
                          <>
                            <div className="h-4 w-px bg-gray-300"></div>
                            <div className="font-mono text-xs">
                              {transaction.transactionId}
                            </div>
                          </>
                        )}
                        <div className="h-4 w-px bg-gray-300"></div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          <span className="capitalize">{transaction.paymentGateway}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(transaction.amount)}
                        </div>
                        
                        {transaction.status === PaymentStatus.COMPLETED && (
                          <button
                            onClick={() => navigate(`/dashboard/student/course/${transaction.course.id}`)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <ShoppingBag className="w-4 h-4" />
                            View Course
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && transactions.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-20 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No transactions yet
            </h2>
            <p className="text-gray-600">
              Your purchased courses will appear here once available.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
