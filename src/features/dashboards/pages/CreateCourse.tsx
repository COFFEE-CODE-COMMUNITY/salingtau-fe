import { Link } from "react-router-dom";
import { Upload } from "lucide-react";
import { useState } from "react";

export default function CreateCourse() {
  const [isFree, setIsFree] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-10">
        <div className="h-16 flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Create New Course
          </h2>
          <Link
            to="/dashboard"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Cancel
          </Link>
        </div>
      </header>

      {/* Body */}
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="course-title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Title
              </label>
              <input
                type="text"
                id="course-title"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="e.g., Introduction to Python"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="course-category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                id="course-category"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition bg-white"
              >
                <option value="webdev">Web Development</option>
                <option value="datasci">Data Science</option>
                <option value="ai">AI & ML</option>
                <option value="design">Design</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="course-desc"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="course-desc"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                rows={6}
                placeholder="Jelaskan secara singkat tentang kursus ini..."
              ></textarea>
            </div>

            {/* Language */}
            <div>
              <label
                htmlFor="course-lang"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Language
              </label>
              <select
                id="course-lang"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition bg-white"
              >
                <option value="en">English</option>
                <option value="id">Indonesian</option>
              </select>
            </div>

            {/* Currency & Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="currency"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Currency
                </label>
                <select
                  id="currency"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                  disabled={isFree}
                >
                  <option value="USD">USD</option>
                  <option value="IDR">IDR</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="e.g., 200000"
                  disabled={isFree}
                />
              </div>
            </div>

            {/* Is Free */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="is-free"
                checked={isFree}
                onChange={(e) => setIsFree(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="is-free"
                className="text-sm font-medium text-gray-700"
              >
                This course is free
              </label>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition bg-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Thumbnail
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                Save and Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
