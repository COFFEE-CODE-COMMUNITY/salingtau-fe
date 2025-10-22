export default function ProfileHome() {
  return (
    <div className="space-y-8">
      {/* Informasi umum */}
      <div className="bg-white rounded-xl shadow-md border p-6">
        <h3 className="text-lg font-bold text-gray-900">Informasi Pribadi</h3>
        <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <dt className="text-sm text-gray-500">Email</dt>
            <dd className="mt-1 text-gray-900">andi.pratama@example.com</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Username</dt>
            <dd className="mt-1 text-gray-900">@andipratama</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Tanggal Bergabung</dt>
            <dd className="mt-1 text-gray-900">Januari 2023</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Role</dt>
            <dd className="mt-1 text-gray-900">Instructor</dd>
          </div>
        </dl>
      </div>

      {/* Aktivitas Terakhir */}
      <div className="bg-white rounded-xl shadow-md border p-6">
        <h3 className="text-lg font-bold text-gray-900">Aktivitas Terbaru</h3>
        <ul className="mt-4 space-y-4">
          <li className="flex items-center justify-between">
            <p className="text-gray-700">Mengupdate course "React Basics"</p>
            <span className="text-sm text-gray-500">2 hari lalu</span>
          </li>
          <li className="flex items-center justify-between">
            <p className="text-gray-700">Mengganti foto profil</p>
            <span className="text-sm text-gray-500">1 minggu lalu</span>
          </li>
          <li className="flex items-center justify-between">
            <p className="text-gray-700">Bergabung sebagai Instructor</p>
            <span className="text-sm text-gray-500">Januari 2023</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
