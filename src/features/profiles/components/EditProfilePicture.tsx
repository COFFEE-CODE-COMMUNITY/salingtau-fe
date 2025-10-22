import React, { useRef, useState } from "react"
import { Pencil } from "lucide-react"
import UserService from "../../../services/UserService"

interface EditProfilePictureProps {
  avatarUrl: string
  onUpdated?: (newUrl: string) => void
}

export default function EditProfilePicture({ avatarUrl, onUpdated }: EditProfilePictureProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [previewUrl, setPreviewUrl] = useState(avatarUrl)
  const [loading, setLoading] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    try {
      setLoading(true)
      await UserService.updateProfilePicture(formData)
      const newUrl = URL.createObjectURL(file)
      setPreviewUrl(newUrl)
      onUpdated?.(newUrl)
      setShowPopup(false)
    } catch (err) {
      console.error("Gagal memperbarui foto profil:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleClick = () => setShowPopup(true)

  const handleClose = () => {
    setShowPopup(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <>
      {/* Foto profil */}
      <div
        className="relative group cursor-pointer"
        onClick={handleClick}
      >
        <img
          src={previewUrl}
          alt="User avatar"
          className="h-24 w-24 rounded-full object-cover ring-4 ring-blue-100 transition-all duration-200 group-hover:brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
          <Pencil className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Popup modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Edit Foto Profil</h3>

            <div className="flex flex-col items-center space-y-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover border border-gray-300"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                disabled={loading}
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition"
              >
                {loading ? "Mengunggah..." : "Pilih Foto Baru"}
              </button>
            </div>

            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}
