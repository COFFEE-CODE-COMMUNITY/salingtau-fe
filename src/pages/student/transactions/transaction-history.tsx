// import { CreditCard, ArrowUpRight, ArrowDownLeft, Filter, Search } from 'lucide-react'
// import { useUser } from "@/utils/user-context.tsx"
// import { useState } from 'react'
//
// interface Transaction {
//   id: string
//   type: 'credit' | 'debit'
//   title: string
//   description: string
//   amount: number
//   date: string
//   status: 'completed' | 'pending' | 'failed'
// }
//
// export default function TransactionHistory() {
//   const { user } = useUser()
//   const [searchQuery, setSearchQuery] = useState('')
//   const [filterType, setFilterType] = useState<'all' | 'credit' | 'debit'>('all')
//
//   // Mock transaction data - replace with actual API call
//   const mockTransactions: Transaction[] = [
//     {
//       id: '1',
//       type: 'credit',
//       title: 'Course Purchase Refund',
//       description: 'Refund for Web Development Course',
//       amount: 299000,
//       date: '2025-11-06',
//       status: 'completed'
//     },
//     {
//       id: '2',
//       type: 'debit',
//       title: 'Course Purchase',
//       description: 'Data Science with Python',
//       amount: 450000,
//       date: '2025-11-05',
//       status: 'completed'
//     },
//     {
//       id: '3',
//       type: 'debit',
//       title: 'Course Purchase',
//       description: 'Full-Stack Web Developer Bootcamp',
//       amount: 550000,
//       date: '2025-11-03',
//       status: 'completed'
//     },
//     {
//       id: '4',
//       type: 'credit',
//       title: 'Wallet Top Up',
//       description: 'Added funds to wallet',
//       amount: 1000000,
//       date: '2025-11-01',
//       status: 'completed'
//     },
//     {
//       id: '5',
//       type: 'debit',
//       title: 'Course Purchase',
//       description: 'UI/UX Design Fundamentals',
//       amount: 350000,
//       date: '2025-10-28',
//       status: 'pending'
//     }
//   ]
//
//   const filteredTransactions = mockTransactions.filter(transaction => {
//     const matchesSearch = transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
//     const matchesFilter = filterType === 'all' || transaction.type === filterType
//     return matchesSearch && matchesFilter
//   })
//
//   const totalCredit = mockTransactions
//     .filter(t => t.type === 'credit' && t.status === 'completed')
//     .reduce((sum, t) => sum + t.amount, 0)
//
//   const totalDebit = mockTransactions
//     .filter(t => t.type === 'debit' && t.status === 'completed')
//     .reduce((sum, t) => sum + t.amount, 0)
//
//   const balance = totalCredit - totalDebit
//
//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0
//     }).format(amount)
//   }
//
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('id-ID', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     })
//   }
//
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'completed':
//         return 'text-green-600 bg-green-100'
//       case 'pending':
//         return 'text-yellow-600 bg-yellow-100'
//       case 'failed':
//         return 'text-red-600 bg-red-100'
//       default:
//         return 'text-gray-600 bg-gray-100'
//     }
//   }
//
//   return (
//     <>
//       <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10">
//         <div className="h-16 flex items-center justify-between px-6">
//           <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
//         </div>
//       </header>
//
//       <main className="w-full">
//         {/* Balance Overview Section */}
//         <section className="mb-8 px-4 sm:px-6 lg:px-8">
//           <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-xl shadow-lg text-white">
//             <div className="flex items-center space-x-3 mb-4">
//               <div className="bg-white/20 p-3 rounded-full">
//                 <CreditCard className="w-6 h-6" />
//               </div>
//               <div>
//                 <p className="text-sm opacity-90">Current Balance</p>
//                 <p className="text-3xl font-bold">{formatCurrency(balance)}</p>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4 mt-6">
//               <div className="bg-white/10 p-4 rounded-lg">
//                 <p className="text-xs opacity-75">Total Credit</p>
//                 <p className="text-lg font-semibold">{formatCurrency(totalCredit)}</p>
//               </div>
//               <div className="bg-white/10 p-4 rounded-lg">
//                 <p className="text-xs opacity-75">Total Debit</p>
//                 <p className="text-lg font-semibold">{formatCurrency(totalDebit)}</p>
//               </div>
//             </div>
//           </div>
//         </section>
//
//         {/* Filters Section */}
//         <section className="mb-6 px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col sm:flex-row gap-4">
//             {/* Search Bar */}
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search transactions..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//
//             {/* Filter Buttons */}
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setFilterType('all')}
//                 className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                   filterType === 'all'
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 All
//               </button>
//               <button
//                 onClick={() => setFilterType('credit')}
//                 className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                   filterType === 'credit'
//                     ? 'bg-green-600 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 Credit
//               </button>
//               <button
//                 onClick={() => setFilterType('debit')}
//                 className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                   filterType === 'debit'
//                     ? 'bg-red-600 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 Debit
//               </button>
//             </div>
//           </div>
//         </section>
//
//         {/* Transactions List */}
//         <section className="px-4 sm:px-6 lg:px-8 pb-8">
//           <div className="bg-white rounded-xl shadow-md overflow-hidden">
//             {filteredTransactions.length === 0 ? (
//               <div className="p-8 text-center text-gray-500">
//                 <p>No transactions found</p>
//               </div>
//             ) : (
//               <div className="divide-y divide-gray-200">
//                 {filteredTransactions.map((transaction) => (
//                   <div
//                     key={transaction.id}
//                     className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
//                   >
//                     <div className="flex items-center space-x-4">
//                       <div
//                         className={`p-3 rounded-full ${
//                           transaction.type === 'credit'
//                             ? 'bg-green-100'
//                             : 'bg-red-100'
//                         }`}
//                       >
//                         {transaction.type === 'credit' ? (
//                           <ArrowDownLeft className="w-5 h-5 text-green-600" />
//                         ) : (
//                           <ArrowUpRight className="w-5 h-5 text-red-600" />
//                         )}
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-gray-900">
//                           {transaction.title}
//                         </h3>
//                         <p className="text-sm text-gray-500">
//                           {transaction.description}
//                         </p>
//                         <p className="text-xs text-gray-400 mt-1">
//                           {formatDate(transaction.date)}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p
//                         className={`text-lg font-bold ${
//                           transaction.type === 'credit'
//                             ? 'text-green-600'
//                             : 'text-red-600'
//                         }`}
//                       >
//                         {transaction.type === 'credit' ? '+' : '-'}
//                         {formatCurrency(transaction.amount)}
//                       </p>
//                       <span
//                         className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
//                           transaction.status
//                         )}`}
//                       >
//                         {transaction.status}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>
//       </main>
//     </>
//   )
// }
