import { useNavigate } from 'react-router-dom';

/* Komponen ikon sederhana untuk membedakan perangkat */
const DeviceIcon = ({ deviceType }: { deviceType: 'desktop' | 'mobile' }) => {
  const iconPath = deviceType === 'desktop'
    ? "M10 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2h-8zM10 4h8v10h-8V4z"
    : "M12 2a2 2 0 00-2 2v16a2 2 0 002 2h4a2 2 0 002-2V4a2 2 0 00-2-2h-4zM12 4h4v14h-4V4z";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
    </svg>
  );
};

/* Data dummy untuk aktivitas login */
const loginActivity = [
  {
    device: 'Windows 10, Chrome',
    location: 'Bandung, Indonesia',
    date: '10 Okt 2025, 16:08',
    isCurrent: true,
    deviceType: 'desktop' as const,
  },
  {
    device: 'iPhone 15 Pro',
    location: 'Jakarta, Indonesia',
    date: '9 Okt 2025, 08:21',
    isCurrent: false,
    deviceType: 'mobile' as const,
  },
  {
    device: 'Macbook Pro, Safari',
    location: 'Bandung, Indonesia',
    date: '7 Okt 2025, 19:54',
    isCurrent: false,
    deviceType: 'desktop' as const,
  },
];

export default function Security() {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-md border p-8">
        {/* Card Header */}
        <h2 className="text-2xl font-bold text-gray-900">Aktivitas Login</h2>
        <p className="mt-1 text-gray-500 mb-8">Lihat dan kelola perangkat yang terhubung dengan akun Anda.</p>

        {/* Login Activity List */}
        <div className="space-y-6">
          {loginActivity.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center space-x-4">
                <DeviceIcon deviceType={item.deviceType} />
                <div>
                  <p className="font-semibold text-gray-800">{item.device}</p>
                  <p className="text-sm text-gray-500">{item.location} - <span className="text-gray-400">{item.date}</span></p>
                </div>
              </div>
              <div>
                {item.isCurrent ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Sesi saat ini
                  </span>
                ) : (
                  <button className="text-sm font-semibold text-red-600 hover:text-red-800">
                    Keluar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tombol kembali */}
      <div className="flex justify-start mt-8">
        <button
          type="button"
          onClick={() => navigate('/profile')}
          className="bg-white py-2 px-5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Kembali ke Profil
        </button>
      </div>
    </div>
  );
}