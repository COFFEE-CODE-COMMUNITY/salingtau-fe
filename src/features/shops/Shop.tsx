import { Search, ShoppingCart, Star, Sparkles, Bookmark, Eye, List, ChevronRight } from 'lucide-react';

export default function Shop() {
  return (
    <>
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-10">
        <div className="h-16 flex items-center justify-end px-6">
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Search className="w-6 h-6 text-gray-600" />
            </button>
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                3
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <a
              href="#"
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <Star className="w-6 h-6 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Badge Baru</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <Sparkles className="w-6 h-6 text-purple-500" />
              <span className="text-sm font-medium text-gray-700">Limited Edition</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <Bookmark className="w-6 h-6 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Event</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <Eye className="w-6 h-6 text-red-500" />
              <span className="text-sm font-medium text-gray-700">Achievement</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <List className="w-6 h-6 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Lihat Semua</span>
            </a>
          </div>
          <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden group transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="relative bg-gray-200">
              <img
                className="h-52 w-full object-contain p-4"
                src="https://cdn-icons-png.flaticon.com/512/3176/3176298.png"
                alt="Badge Image"
              />
              <span className="absolute top-2 left-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded">
                LIMITED
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold text-gray-800 truncate">Badge: "Early Bird"</h3>
            </div>
            <div className="bg-blue-600 text-white p-3 text-center font-bold text-lg">Rp 50.000</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden group transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="relative bg-gray-200">
              <img
                className="h-52 w-full object-contain p-4"
                src="https://cdn-icons-png.flaticon.com/512/2928/2928928.png"
                alt="Badge Image"
              />
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold text-gray-800 truncate">Badge: "Code Master"</h3>
            </div>
            <div className="bg-blue-600 text-white p-3 text-center font-bold text-lg">Rp 150.000</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden group transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="relative bg-gray-200">
              <img
                className="h-52 w-full object-contain p-4"
                src="https://cdn-icons-png.flaticon.com/512/860/860228.png"
                alt="Badge Image"
              />
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold text-gray-800 truncate">Badge: "Top Contributor"</h3>
            </div>
            <div className="bg-blue-600 text-white p-3 text-center font-bold text-lg">Rp 125.000</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden group transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="relative bg-gray-200">
              <img
                className="h-52 w-full object-contain p-4"
                src="https://cdn-icons-png.flaticon.com/512/5732/5732997.png"
                alt="Badge Image"
              />
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                EVENT
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold text-gray-800 truncate">Badge: "Hackathon 2025"</h3>
            </div>
            <div className="bg-blue-600 text-white p-3 text-center font-bold text-lg">Rp 75.000</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden group transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="relative bg-gray-200">
              <img
                className="h-52 w-full object-contain p-4"
                src="https://cdn-icons-png.flaticon.com/512/10005/10005011.png"
                alt="Badge Image"
              />
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold text-gray-800 truncate">Badge: "Community Helper"</h3>
            </div>
            <div className="bg-blue-600 text-white p-3 text-center font-bold text-lg">Rp 110.000</div>
          </div>
        </div>
      </div>
    </>
  );
}
