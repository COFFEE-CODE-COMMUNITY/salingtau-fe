import { Calendar, CreditCard, ShoppingBag, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Course {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
}

interface Transaction {
  id: string;
  orderId: string;
  courses: Course[];
  subtotal: number;
  total: number;
  date: string;
  paymentMethod: string;
  status: "completed" | "pending" | "failed";
}

export default function TransactionHistory() {
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const navigate = useNavigate();

  // Mock data
  const mockTransactions: Transaction[] = [
    {
      id: "1",
      orderId: "TRX-001",
      courses: [
        {
          id: "c1",
          title: "Complete SQL and Databases Bootcamp",
          thumbnail: "https://via.placeholder.com/80x80?text=SQL",
          price: 149000,
        },
        {
          id: "c2",
          title: "Web Security & Bug Bounty: Learn Penetration Testing",
          thumbnail: "https://via.placeholder.com/80x80?text=Security",
          price: 149000,
        },
        {
          id: "c3",
          title: "Complete NodeJS Developer (GraphQL, MongoDB, + more)",
          thumbnail: "https://via.placeholder.com/80x80?text=NodeJS",
          price: 149000,
        },
        {
          id: "c4",
          title: "The Complete Python Developer",
          thumbnail: "https://via.placeholder.com/80x80?text=Python",
          price: 299000,
        },
      ],
      subtotal: 746000,
      total: 746000,
      date: "2025-11-10",
      paymentMethod: "Bank Transfer to Bank Permata",
      status: "completed",
    },
    {
      id: "2",
      orderId: "TRX-002",
      courses: [
        {
          id: "c5",
          title: "React - The Complete Guide 2025",
          thumbnail: "https://via.placeholder.com/80x80?text=React",
          price: 199000,
        },
      ],
      subtotal: 199000,
      total: 199000,
      date: "2025-11-08",
      paymentMethod: "Credit Card",
      status: "completed",
    },
  ];

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

  const toggleTransaction = (id: string) =>
    setSelectedTransaction(selectedTransaction === id ? null : id);

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
        <div className="space-y-4">
          {mockTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Transaction Header */}
              <button
                onClick={() => toggleTransaction(transaction.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>{formatDate(transaction.date)}</span>
                  </div>
                  <div className="h-4 w-px bg-gray-300"></div>
                  <div className="text-sm text-gray-600 font-mono">
                    {transaction.orderId}
                  </div>
                  <div className="h-4 w-px bg-gray-300"></div>
                  <div className="text-sm font-medium text-gray-900">
                    {formatCurrency(transaction.total)}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      transaction.status === "completed"
                        ? "bg-blue-50 text-blue-700"
                        : transaction.status === "pending"
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {transaction.status === "completed"
                      ? "Completed"
                      : transaction.status === "pending"
                      ? "Pending"
                      : "Failed"}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      selectedTransaction === transaction.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Transaction Details */}
              {selectedTransaction === transaction.id && (
                <div className="border-t border-gray-200">
                  <div className="grid lg:grid-cols-3 gap-6 p-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-4">
                          Order Details ({transaction.courses.length} Courses)
                        </h2>

                        <div className="space-y-3">
                          {transaction.courses.map((course) => (
                            <div key={course.id} className="flex gap-3">
                              <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-20 h-20 object-cover rounded"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "https://via.placeholder.com/80x80?text=Course";
                                }}
                              />
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                                  {course.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  {formatCurrency(course.price)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div className="border-t pt-4">
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">
                          Payment Method
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                          <span>{transaction.paymentMethod}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Summary */}
                    <div className="lg:col-span-1">
                      <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">
                          Order Summary
                        </h2>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="font-medium text-gray-900">
                              {formatCurrency(transaction.subtotal)}
                            </span>
                          </div>

                          <div className="border-t border-gray-300 pt-3 flex justify-between">
                            <span className="font-semibold text-gray-900">
                              Total ({transaction.courses.length} courses):
                            </span>
                            <span className="text-xl font-bold text-blue-700">
                              {formatCurrency(transaction.total)}
                            </span>
                          </div>
                        </div>

                        {/* View Courses Button */}
                        {transaction.status === "completed" && (
                          <button
                            onClick={() =>
                              navigate("/dashboard/student/my-course")
                            }
                            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <ShoppingBag className="w-4 h-4" />
                            View Courses
                          </button>
                        )}

                        {transaction.status === "pending" && (
                          <div className="mt-6 space-y-2">
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                              Continue Payment
                            </button>
                            <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-300 transition-colors">
                              Cancel Order
                            </button>
                          </div>
                        )}

                        <p className="text-xs text-gray-500 mt-4 text-center">
                          30-Day Money Back Guarantee
                        </p>
                        <p className="text-xs text-gray-500 text-center">
                          Not satisfied? Get a full refund within 30 days.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {mockTransactions.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
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
