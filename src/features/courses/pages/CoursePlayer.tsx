import { MessageSquare } from 'lucide-react';

export default function CoursePlayer() {
  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="bg-black aspect-video flex items-center justify-center text-white">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/qz0aGYrrlhU"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="p-6 bg-white border-b border-t border-gray-200">
          <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
            Web Development
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mt-3">Full-Stack Web Developer Bootcamp</h1>
          <p className="mt-2 text-gray-600">
            Materi 1: Introduction to HTML & CSS. Di video ini kita akan membahas dasar-dasar HTML dan
            bagaimana cara menata-nya menggunakan CSS.
          </p>
        </div>

        <div className="p-6 bg-white border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <img
              className="h-12 w-12 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2680&auto=format&fit=crop"
              alt="Instructor Avatar"
            />
            <div>
              <p className="font-semibold text-gray-900">John Doe</p>
              <p className="text-sm text-gray-500">Instructor</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center bg-gray-100 text-gray-800 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              <MessageSquare className="w-5 h-5 mr-2" />
              Diskusi
            </button>
            <button className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Selesai & Lanjutkan
            </button>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-96 flex flex-col bg-white border-l border-gray-200 h-full">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-lg text-gray-900">Daftar Materi</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ul className="divide-y divide-gray-200">
            <li className="flex items-start p-4 space-x-3 bg-blue-50 border-l-4 border-blue-600">
              <div className="flex-shrink-0 bg-blue-600 text-white w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold">
                1
              </div>
              <div>
                <a href="#" className="font-semibold text-blue-700">
                  Introduction to HTML & CSS
                </a>
                <p className="text-xs text-gray-500 mt-0.5">12:45</p>
              </div>
            </li>
            <li className="flex items-start p-4 space-x-3 hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 bg-gray-200 w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold text-gray-600">
                2
              </div>
              <div>
                <a href="#" className="font-semibold text-gray-800">
                  Deep Dive into Flexbox
                </a>
                <p className="text-xs text-gray-500 mt-0.5">18:30</p>
              </div>
            </li>
            <li className="flex items-start p-4 space-x-3 hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 bg-gray-200 w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold text-gray-600">
                3
              </div>
              <div>
                <a href="#" className="font-semibold text-gray-800">
                  JavaScript DOM Manipulation
                </a>
                <p className="text-xs text-gray-500 mt-0.5">25:10</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
