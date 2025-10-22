import React, { useState } from "react"
import InputPassword from "../components/InputPassword.tsx"
import { useForgotPasswordChange } from "../hooks/useForgotPasswordChange.ts"
import { useNavigate } from "react-router-dom"

export default function ChangePassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { submitChange, loading } = useForgotPasswordChange()

  const [popup, setPopup] = useState<{
    show: boolean
    type: "success" | "error"
    message: string
  }>({ show: false, type: "success", message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!password || !confirmPassword) {
      setPopup({
        show: true,
        type: "error",
        message: "Semua field wajib diisi.",
      })
      return
    }

    if (password !== confirmPassword) {
      setPopup({
        show: true,
        type: "error",
        message: "Password tidak cocok.",
      })
      return
    }

    try {
      const res = await submitChange({ password, confirmPassword })

      // ✅ Backend balas sukses
      setPopup({
        show: true,
        type: "success",
        message:
          res?.message || "Password berhasil diganti. Silakan tutup halaman ini.",
      })
    } catch (err: any) {
      // 🔥 Tangkap error Unauthorized
      if (err.response?.status === 401) {
        setPopup({
          show: true,
          type: "error",
          message: "Sesi ganti password sudah habis. Silakan kirim ulang email reset.",
        })
      } else {
        setPopup({
          show: true,
          type: "error",
          message:
            err.response?.data?.message ||
            err.message ||
            "Terjadi kesalahan saat mengganti password.",
        })
      }
    }
  }

  const handlePopupClose = () => {
    setPopup({ ...popup, show: false })
    if (popup.type === "success") {
      navigate("/blankpage")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg relative">
        {/* Logo */}
        <div className="mb-6">
          <img src="/SalingTau.png" alt="Logo" className="w-20 mx-auto" />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">Ganti Password</h2>

        <form onSubmit={handleSubmit}>
          <InputPassword
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password Baru"
          />
          <InputPassword
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Konfirmasi Password"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white font-medium rounded bg-blue-600 hover:bg-blue-700 transition"
          >
            {loading ? "Mengubah..." : "Ubah Password"}
          </button>
        </form>
      </div>

      {/* === POPUP === */}
      {popup.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg text-center">
            <h3
              className={`text-lg font-semibold mb-2 ${
                popup.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {popup.type === "success" ? "Berhasil" : "Gagal"}
            </h3>
            <p className="text-gray-700 mb-4">{popup.message}</p>
            <button
              onClick={handlePopupClose}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
            >
              Oke
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
