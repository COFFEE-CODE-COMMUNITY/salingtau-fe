import { Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

export function RevenueChart() {
  const data = [
    { month: 'Jan', revenue: 4200, students: 45 },
    { month: 'Feb', revenue: 5100, students: 58 },
    { month: 'Mar', revenue: 6800, students: 72 },
    { month: 'Apr', revenue: 8200, students: 89 },
    { month: 'May', revenue: 9500, students: 105 },
    { month: 'Jun', revenue: 11200, students: 124 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full flex-1">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
          <p className="text-sm text-gray-500">Monthly revenue and student growth</p>
        </div>
        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-semibold">+23%</span>
        </div>
      </div>
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
            formatter={(value, name) => {
              if (name === 'revenue') return [`${value}`, 'Revenue'];
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
    </div>
  );
}

// Course Performance Chart
export function CoursePerformanceChart() {
  const data = [
    { course: 'Web Dev', students: 450, rating: 4.8, revenue: 13500 },
    { course: 'Data Science', students: 790, rating: 4.6, revenue: 23700 },
    { course: 'Mobile Dev', students: 320, rating: 4.9, revenue: 9600 },
    { course: 'UI/UX Design', students: 580, rating: 4.7, revenue: 17400 },
    { course: 'DevOps', students: 210, rating: 4.5, revenue: 6300 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Course Performance</h3>
        <p className="text-sm text-gray-500">Student enrollment by course</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="course" stroke="#6b7280" style={{ fontSize: '12px' }} />
          <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px 12px'
            }}
            formatter={(value, name) => {
              if (name === 'revenue') return [`$${value}`, 'Revenue'];
              if (name === 'rating') return [value, 'Rating'];
              return [value, 'Students'];
            }}
          />
          <Legend />
          <Bar dataKey="students" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Course Status Distribution
export function CourseStatusChart() {
  const data = [
    { name: 'Published', value: 8, color: '#10b981' },
    { name: 'Pending Review', value: 2, color: '#f59e0b' },
    { name: 'Draft', value: 3, color: '#6b7280' },
    { name: 'Archived', value: 1, color: '#ef4444' },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Course Status</h3>
        <p className="text-sm text-gray-500">Distribution across all courses</p>
      </div>
      <div className="flex items-center gap-8">
        <ResponsiveContainer width="60%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '8px 12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {item.value} ({Math.round((item.value / total) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Student Engagement Chart
export function StudentEngagementChart() {
  const data = [
    { week: 'Week 1', completed: 125, inProgress: 45, notStarted: 30 },
    { week: 'Week 2', completed: 145, inProgress: 38, notStarted: 17 },
    { week: 'Week 3', completed: 168, inProgress: 25, notStarted: 7 },
    { week: 'Week 4', completed: 185, inProgress: 12, notStarted: 3 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Student Engagement</h3>
        <p className="text-sm text-gray-500">Lecture completion progress</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="week" stroke="#6b7280" style={{ fontSize: '12px' }} />
          <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px 12px'
            }}
          />
          <Legend />
          <Bar dataKey="completed" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
          <Bar dataKey="inProgress" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
          <Bar dataKey="notStarted" stackId="a" fill="#6b7280" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Recent Transactions
export function RecentTransactionsChart() {
  const transactions = [
    { id: '1', course: 'Web Development Bootcamp', student: 'John Doe', amount: 299, status: 'completed', date: '2024-11-14' },
    { id: '2', course: 'Data Science with Python', student: 'Jane Smith', amount: 349, status: 'completed', date: '2024-11-13' },
    { id: '3', course: 'Mobile App Development', student: 'Mike Johnson', amount: 279, status: 'pending', date: '2024-11-13' },
    { id: '4', course: 'UI/UX Design Masterclass', student: 'Sarah Williams', amount: 299, status: 'completed', date: '2024-11-12' },
    { id: '5', course: 'DevOps Fundamentals', student: 'Tom Brown', amount: 249, status: 'completed', date: '2024-11-12' },
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'completed') {
      return <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">Completed</span>;
    }
    if (status === 'pending') {
      return <span className="px-2 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full">Pending</span>;
    }
    return <span className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">Failed</span>;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <p className="text-sm text-gray-500">Latest course purchases</p>
      </div>
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
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4 text-sm text-gray-900">{transaction.course}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{transaction.student}</td>
              <td className="py-3 px-4 text-sm font-semibold text-gray-900">${transaction.amount}</td>
              <td className="py-3 px-4">{getStatusBadge(transaction.status)}</td>
              <td className="py-3 px-4 text-sm text-gray-500">{transaction.date}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}