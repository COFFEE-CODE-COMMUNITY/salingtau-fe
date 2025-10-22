import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useCreatePost from "../hooks/UseCreateThread.ts"

export default function CreatePost() {
  const navigate = useNavigate()
  const { createPost, loading, error, success } = useCreatePost()

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = async (isDraft: boolean) => {
    try {
      await createPost({ title, category, content, isDraft })
      navigate("/forum") // redirect setelah sukses
    } catch (err) {
      console.error(err)
    }
  }

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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition text-lg"
                placeholder="e.g., Kesulitan memahami asynchronous JavaScript"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition bg-white"
              >
                <option value="">-- Select a category --</option>
                <option>Web Development</option>
                <option>Data Science</option>
                <option>AI & ML</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>General Discussion</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg"
                rows={12}
                placeholder="Tuliskan isi diskusimu di sini..."
              ></textarea>
            </div>

            {error && (
              <p className="text-red-600 text-sm mt-2">{error}</p>
            )}
            {success && (
              <p className="text-green-600 text-sm mt-2">Post berhasil dibuat!</p>
            )}

            <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                disabled={loading}
                onClick={() => handleSubmit(true)}
                className="bg-gray-100 text-gray-800 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
              >
                {loading ? "Saving..." : "Save Draft"}
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => handleSubmit(false)}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                {loading ? "Publishing..." : "Publish"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
