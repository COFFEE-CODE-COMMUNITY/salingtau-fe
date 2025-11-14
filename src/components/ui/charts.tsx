import { Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface RevenueChartData {
  month: string
  revenue: number
  students: number
}

interface RevenueChartProps {
  data: RevenueChartData[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  // Calculate growth percentage
  const calculateGrowth = () => {
    if (data.length < 2) return 0
    const current = data[data.length - 1].revenue
    const previous = data[data.length - 2].revenue
    if (previous === 0) return 0
    return Math.round(((current - previous) / previous) * 100)
  }

  const growth = calculateGrowth()

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full flex-1">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
          <p className="text-sm text-gray-500">Monthly revenue and student growth</p>
        </div>
        <div className={`flex items-center gap-2 ${growth >= 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'} px-3 py-1 rounded-full`}>
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-semibold">{growth >= 0 ? '+' : ''}{growth}%</span>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center text-gray-500">
          No revenue data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '8px 12px'
              }}
              formatter={(value: any, name: string) => {
                if (name === 'revenue') return [`${value}K`, 'Revenue (IDR)'];
                return [value, 'Students'];
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorRevenue)"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="students"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: '#10b981', r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

// Recent Transactions
interface Transaction {
  id: string
  amount: number
  currency: string
  status: string
  createdAt: string
  user: {
    firstName: string
    lastName: string
  }
  course: {
    title: string
  }
}

interface RecentTransactionsChartProps {
  transactions: Transaction[]
}

export function RecentTransactionsChart({ transactions }: RecentTransactionsChartProps) {
  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase()

    if (statusLower === 'success' || statusLower === 'completed') {
      return <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">Completed</span>;
    }
    if (statusLower === 'pending') {
      return <span className="px-2 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full">Pending</span>;
    }
    if (statusLower === 'failed' || statusLower === 'cancelled') {
      return <span className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">Failed</span>;
    }
    return <span className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full">{status}</span>;
  };

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'IDR') {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount)
    }
    return `$${amount}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Take only last 5 transactions and sort by date
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <p className="text-sm text-gray-500">Latest course purchases</p>
      </div>

      {recentTransactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No transactions yet
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Course</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Student</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
            </tr>
            </thead>
            <tbody>
            {recentTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-900">{transaction.course.title}</td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {transaction.user.firstName} {transaction.user.lastName}
                </td>
                <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                  {formatCurrency(transaction.amount, transaction.currency)}
                </td>
                <td className="py-3 px-4">{getStatusBadge(transaction.status)}</td>
                <td className="py-3 px-4 text-sm text-gray-500">{formatDate(transaction.createdAt)}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}