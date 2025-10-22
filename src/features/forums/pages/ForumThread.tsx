import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function ForumThread() {
  return (
    <>
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-10">
        <div className="h-16 flex items-center px-6">
          <Link
            to="/forum"
            className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Forum
          </Link>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                Web Development
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-3">
                Kesulitan memahami konsep asynchronous pada JavaScript
              </h1>
              <div className="flex items-center space-x-3 mt-4 text-sm text-gray-500">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2680&auto=format&fit=crop"
                  alt="User Avatar"
                />
                <span>
                  Posted by <span className="font-semibold text-gray-800">John Doe</span>
                </span>
                <span>•</span>
                <span>2 hours ago</span>
              </div>
              <div className="mt-6 text-gray-700 leading-relaxed space-y-4">
                <p>
                  Halo semua, saya sedang belajar JavaScript dan agak bingung dengan konsep asynchronous,
                  terutama Promise dan async/await. Saya sudah membaca beberapa tutorial tapi masih belum
                  "klik".
                </p>
                <p>
                  Apakah ada yang bisa memberikan analogi atau contoh sederhana yang mudah dipahami untuk
                  pemula? Misalnya, kapan kita harus menggunakan `.then()` dan kapan lebih baik pakai
                  `async/await`?
                </p>
                <p>Terima kasih sebelumnya!</p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">12 Replies</h2>

              <div className="flex items-start space-x-4 mb-6">
                <img
                  className="h-10 w-10 rounded-full object-cover mt-1"
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop"
                  alt="User Avatar"
                />
                <div className="flex-1 bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">Jane Smith</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                  <p className="mt-2 text-gray-700">
                    Analogi sederhananya: bayangkan kamu pesan kopi. `Promise` itu seperti struk pesanan
                    yang kamu dapat. Kamu bisa lanjut melakukan hal lain sambil menunggu (kode lain
                    berjalan), dan ketika kopi siap (Promise fulfilled), pelayan akan memanggilmu
                    (`.then()`).
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-6">
                <img
                  className="h-10 w-10 rounded-full object-cover mt-1"
                  src="https://images.unsplash.com/photo-1528763380143-65b3ac89a3ff?q=80&w=2574&auto=format&fit=crop"
                  alt="User Avatar"
                />
                <div className="flex-1 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-blue-800">Andi Pratama</p>
                    <p className="text-xs text-blue-600">1 hour ago</p>
                  </div>
                  <p className="mt-2 text-gray-700">
                    Setuju dengan Jane! Kalau `async/await` itu seperti kamu menunggu di depan konter
                    sampai kopinya jadi. Kodenya terlihat lebih 'synchronous' dan mudah dibaca, seolah-olah
                    kamu menunggu baris per baris, padahal di belakang layar tetap asynchronous.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                  rows={4}
                  placeholder="Write your reply..."
                ></textarea>
                <button className="mt-3 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                  Post Reply
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-3">Thread Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-semibold text-blue-600">Web Development</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Created:</span>
                  <span className="font-semibold text-gray-800">Oct 4, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Replies:</span>
                  <span className="font-semibold text-gray-800">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Views:</span>
                  <span className="font-semibold text-gray-800">1.2k</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-3">Participants</h3>
              <div className="flex -space-x-2">
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2680"
                  alt="Participant 1"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561"
                  alt="Participant 2"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1528763380143-65b3ac89a3ff?q=80&w=2574"
                  alt="Participant 3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
