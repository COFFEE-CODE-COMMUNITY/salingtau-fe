import React, { useState } from "react"
import useForgotPasswordProfile from "../hooks/useForgotPasswordProfile.ts"

export default function Settings() {
  const [email, setEmail] = useState("")
  const { sendResetLink, loading } = useForgotPasswordProfile()
  const [popup, setPopup] = useState<{ show: boolean; message: string; type: "success" | "error" }>({
    show: false,
    message: "",
    type: "success",
  })

  const handleSendReset = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await sendResetLink(email)
    setPopup({
      show: true,
      message: res.message,
      type: res.success ? "success" : "error",
    })
  }

  const closePopup = () => setPopup({ ...popup, show: false })

  return (
    <div className="p-0.5 max-w-9xl mx-auto">
      {/* Popup */}
      {popup.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm text-center">
            <h3 className={`text-lg font-semibold "text-green-600"`}>
              {popup.message}
            </h3>
            <button
              onClick={closePopup}
              className={`mt-6 w-full py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700`}
            >
              Oke
            </button>
          </div>
        </div>
      )}

      {/* Card */}
      <div className="bg-white rounded-xl shadow-md border p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pengaturan Akun</h2>
        <form onSubmit={handleSendReset}>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ganti password</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email Anda"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 md:mt-5.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition"
            >
              {loading ? "Mengirim..." : "Kirim"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
