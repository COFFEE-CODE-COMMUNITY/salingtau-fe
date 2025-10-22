import { Link } from 'react-router-dom';
import { Plus, MessageCircle, Eye } from 'lucide-react';
import SearchBar from "../../../globals/components/SearchBar.tsx";

export default function Forum() {
  return (
    <>
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-10">
        <div className="h-16 flex items-center justify-between px-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Community Forum</h2>
          </div>
          {SearchBar("Search Topic...", "relative w-full sm:w-64 mx-auto mr-4")}
          <div className="flex items-center space-x-4">
            <Link
              to="/forum/create"
              className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Link>
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">Sort by:</span>
            <select className="text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition p-2">
              <option>Latest</option>
              <option>Popular</option>
              <option>Most Replies</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <ul className="divide-y divide-gray-200">
            <li className="p-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2680&auto=format&fit=crop"
                  alt="User Avatar"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link
                        to="/forum/thread"
                        className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                      >
                        Kesulitan memahami konsep asynchronous pada JavaScript
                      </Link>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                          Web Development
                        </span>
                        <p className="text-sm text-gray-500">by John Doe • 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 text-right">
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1.5" />
                        <span>12</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1.5" />
                        <span>1.2k</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li className="p-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop"
                  alt="User Avatar"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link
                        to="/forum/thread"
                        className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                      >
                        Bagaimana cara terbaik deploy model Machine Learning?
                      </Link>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                          AI & ML
                        </span>
                        <p className="text-sm text-gray-500">by Jane Smith • 1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 text-right">
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1.5" />
                        <span>42</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1.5" />
                        <span>5.8k</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li className="p-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=2574&auto=format&fit=crop"
                  alt="User Avatar"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link
                        to="/forum/thread"
                        className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                      >
                        Tips & Trik untuk Desain UI/UX yang Menarik
                      </Link>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                          Design
                        </span>
                        <p className="text-sm text-gray-500">by Emily White • 3 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 text-right">
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1.5" />
                        <span>25</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1.5" />
                        <span>3.1k</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
