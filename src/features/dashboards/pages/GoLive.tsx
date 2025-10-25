import {Link} from "react-router-dom";
import {Upload} from "lucide-react";

export default function GoLive() {
  return (
    <>
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b z-10">
        <div className="h-16 flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold text-gray-900">Setup Your Live Stream</h2>
          <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Cancel
          </Link>
        </div>
      </header>

      <div className="p-8 max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <div className="space-y-6">
            <div>
              <label htmlFor="stream-title" className="block text-sm font-medium text-gray-700 mb-1">
                Stream Title
              </label>
              <input
                type="text"
                id="stream-title"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Live Coding Session..."
              />
            </div>

            <div>
              <label htmlFor="stream-desc" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="stream-desc"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                rows={5}
                placeholder="Jelaskan apa yang akan dibahas di live stream ini..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <button className="bg-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">
                Start Live Stream
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
