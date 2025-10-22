import { ShoppingCart, Check } from 'lucide-react';

/* Data dummy untuk notifikasi */
const notificationsData = [
  {
    id: 1,
    user: {
      name: 'John Doe',
      email: 'johndoe@example.com',
    },
    courseTitle: 'Full-Stack Web Developer Bootcamp',
    timestamp: '5 menit yang lalu',
    isRead: false,
  },
  {
    id: 2,
    user: {
      name: 'Jane Smith',
      email: 'janesmith@example.com',
    },
    courseTitle: 'Advanced React & Redux',
    timestamp: '2 jam yang lalu',
    isRead: false,
  },
  {
    id: 3,
    user: {
      name: 'Ahmad Subagja',
      email: 'ahmad.s@example.com',
    },
    courseTitle: 'Full-Stack Web Developer Bootcamp',
    timestamp: '1 hari yang lalu',
    isRead: true,
  },
  {
    id: 4,
    user: {
      name: 'Siti Nurhaliza',
      email: 'siti.nh@example.com',
    },
    courseTitle: 'UI/UX Design for Beginners',
    timestamp: '3 hari yang lalu',
    isRead: true,
  },
];

export default function Notifications() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="h-16 bg-white flex items-center justify-between px-6 border-b">
        <h1 className="text-xl font-bold text-gray-800">Notifikasi</h1>
        <button className="flex items-center justify-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
          <Check className="w-4 h-4 mr-2" />
          Tandai semua telah dibaca
        </button>
      </header>

      {/* Body */}
      <main className="max-w-8xl mx-auto px-8 py-4">
        <div className="mt-2">
          <div className="bg-white rounded-xl shadow-md border p-6">
            <h3 className="text-lg font-bold text-gray-900">
              Semua Notifikasi
            </h3>
            <ul className="divide-y divide-gray-200 mt-4">
              {notificationsData.map((item) => (
                <li
                  key={item.id}
                  className={`py-4 px-2 flex items-start space-x-4 transition-colors ${
                    !item.isRead ? 'bg-blue-50' : 'bg-white'
                  }`}
                >
                  {/* Ikon */}
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>

                  {/* Konten Notifikasi */}
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">
                      <span className="font-semibold">{item.user.name}</span>{' '}
                      telah membeli kelas Anda{' '}
                      <span className="font-semibold">"{item.courseTitle}"</span>.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.timestamp}
                    </p>
                  </div>

                  {/* Indikator Belum Dibaca */}
                  {!item.isRead && (
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}