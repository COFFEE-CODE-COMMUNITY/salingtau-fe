import { Link } from 'react-router-dom';

export default function CreatePost() {
  return (
    <>
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-10">
        <div className="h-16 flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold text-gray-900">Create New Post</h2>
          <Link to="/forum" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Cancel
          </Link>
        </div>
      </header>

      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <div className="space-y-6">
            <div>
              <label htmlFor="post-title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="post-title"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition text-lg"
                placeholder="e.g., Kesulitan memahami asynchronous JavaScript"
              />
            </div>

            <div>
              <label htmlFor="post-category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="post-category"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition bg-white"
              >
                <option>-- Select a category --</option>
                <option>Web Development</option>
                <option>Data Science</option>
                <option>AI & ML</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>General Discussion</option>
              </select>
            </div>

            <div>
              <label htmlFor="post-content" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="p-2 bg-gray-50 border-b border-gray-300">
                  <span className="text-xs text-gray-500">Markdown is supported.</span>
                </div>
                <textarea
                  id="post-content"
                  className="w-full p-4 border-0 focus:ring-0"
                  rows={12}
                  placeholder="Tuliskan isi diskusimu di sini..."
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-200">
              <button className="bg-gray-100 text-gray-800 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                Save Draft
              </button>
              <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
