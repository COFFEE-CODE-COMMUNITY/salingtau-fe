import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { coursesData } from "@/utils/courseData.ts"
import {
  CreditCard,
  Wallet,
  Building2,
  QrCode,
  Store,
  ArrowLeft,
  CheckCircle,
} from "lucide-react"

// --- DATA TAMBAHAN UNTUK SUB-METODE ---
const eWallets = [
  {
    id: "gopay",
    label: "GoPay",
    icon: <Wallet className="w-6 h-6 text-blue-500" />,
  },
  {
    id: "ovo",
    label: "OVO",
    icon: <Wallet className="w-6 h-6 text-purple-500" />,
  },
  {
    id: "shopeepay",
    label: "ShopeePay",
    icon: <Wallet className="w-6 h-6 text-orange-500" />,
  },
  {
    id: "dana",
    label: "DANA",
    icon: <Wallet className="w-6 h-6 text-blue-400" />,
  },
]

const banks = [
  {
    id: "bca",
    label: "BCA Virtual Account",
    icon: <Building2 className="w-6 h-6 text-blue-700" />,
  },
  {
    id: "bni",
    label: "BNI Virtual Account",
    icon: <Building2 className="w-6 h-6 text-orange-600" />,
  },
  {
    id: "mandiri",
    label: "Mandiri Virtual Account",
    icon: <Building2 className="w-6 h-6 text-blue-900" />,
  },
]

// --- KOMPONEN UTAMA ---
export default function BuyCourse() {
  const { id } = useParams()
  const navigate = useNavigate()

  const course = coursesData.find((c) => c.id === id)

  // --- STATE YANG DIPERLUAS ---
  const [selectedMethod, setSelectedMethod] = useState("")
  const [selectedSubMethod, setSelectedSubMethod] = useState("")
  const [formData, setFormData] = useState({
    creditCardName: "",
    creditCardNumber: "",
    creditCardExpiry: "",
    creditCardCvv: "",
    eWalletNumber: "",
  })

  const paymentMethods = [
    {
      id: "credit",
      label: "Kartu Kredit / Debit",
      description: "Bayar menggunakan Visa, Mastercard, JCB, atau Amex",
      icon: <CreditCard className="w-6 h-6 text-blue-600" />,
    },
    {
      id: "bank",
      label: "Transfer Bank",
      description: "Tersedia BCA, BNI, Mandiri, Permata, dan lainnya",
      icon: <Building2 className="w-6 h-6 text-green-600" />,
    },
    {
      id: "ewallet",
      label: "E-Wallet",
      description: "GoPay, OVO, ShopeePay, DANA, LinkAja",
      icon: <Wallet className="w-6 h-6 text-purple-600" />,
    },
    {
      id: "qris",
      label: "QRIS",
      description: "Bayar cepat melalui scan QR dari semua aplikasi e-wallet",
      icon: <QrCode className="w-6 h-6 text-orange-600" />,
    },
    {
      id: "retail",
      label: "Gerai Retail",
      description: "Bayar di Indomaret atau Alfamart terdekat",
      icon: <Store className="w-6 h-6 text-yellow-600" />,
    },
  ]

  // --- HANDLER ---
  const handleSelectMethod = (methodId: string) => {
    setSelectedMethod(methodId)
    setSelectedSubMethod("") // Reset sub-metode saat metode utama diganti
    setFormData({
      // Reset form data
      creditCardName: "",
      creditCardNumber: "",
      creditCardExpiry: "",
      creditCardCvv: "",
      eWalletNumber: "",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Cek apakah form siap untuk di-submit
  const isPaymentReady = () => {
    if (selectedMethod === "credit") {
      return (
        formData.creditCardName &&
        formData.creditCardNumber.length === 16 &&
        formData.creditCardExpiry.length === 5 &&
        formData.creditCardCvv.length === 3
      )
    }
    if (selectedMethod === "ewallet") {
      return selectedSubMethod && formData.eWalletNumber.length >= 10 // Validasi simpel
    }
    if (selectedMethod === "bank") {
      return selectedSubMethod // Cukup pilih bank
    }
    if (selectedMethod === "qris" || selectedMethod === "retail") {
      return true // Langsung siap
    }
    return false
  }

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isPaymentReady()) return

    // Logika untuk submit pembayaran
    console.log("Submitting payment with:", {
      method: selectedMethod,
      subMethod: selectedSubMethod,
      formData,
      courseId: course?.id,
      price: course?.price,
    })

    // Simulasi sukses
    alert(`Pembayaran untuk ${course?.title} berhasil!`)
    navigate(`/dashboard/student/course/${course?.id}`)
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Course tidak ditemukan
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Kembali
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- NAVBAR (DIMODIFIKASI) --- */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <div className="h-16 flex items-center justify-between px-6">
          {/* Judul di kiri, seperti di ExploreCourse */}
          <h2 className="text-xl font-semibold text-gray-900">Buy Course</h2>

          {/* Kontrol di kanan (ml-auto), seperti di ExploreCourse */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
          </div>
        </div>
      </header>
      {/* --- AKHIR NAVBAR --- */}

      {/* Course Info */}
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-60 object-cover"
          />
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {course.title}
            </h1>
            <p className="text-gray-500 text-sm mb-4">{course.category}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {course.instructor.name}
                  </p>
                  <p className="text-gray-500 text-sm">Instructor</p>
                </div>
              </div>
              <div className="ml-auto text-right">
                <p className="text-2xl font-bold text-blue-600">
                  {course.price === 0
                    ? "Free"
                    : `Rp ${course.price.toLocaleString("id-ID")}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        {course.price === 0 ? (
          <div className="text-center bg-green-50 border border-green-200 rounded-xl py-10">
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Kursus ini gratis!
            </h3>
            <p className="text-gray-600">
              Kamu bisa langsung mulai belajar tanpa pembayaran.
            </p>
            <button
              onClick={() => navigate(`/dashboard/student/course/${course.id}`)}
              className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
            >
              Mulai Kursus
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitPayment}>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Pilih Metode Pembayaran
            </h3>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => handleSelectMethod(method.id)}
                  className={`flex items-center gap-4 p-5 border rounded-xl cursor-pointer transition 
                    ${
                      selectedMethod === method.id
                        ? "border-blue-600 bg-blue-50 ring-2 ring-blue-300"
                        : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                >
                  {method.icon}
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">
                      {method.label}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {method.description}
                    </p>
                  </div>
                  {selectedMethod === method.id && (
                    <CheckCircle className="w-6 h-6 text-blue-600 ml-auto" />
                  )}
                </div>
              ))}
            </div>

            {/* --- KONTEN DINAMIS BERDASARKAN METODE --- */}
            <div className="mt-6">
              {/* --- 1. FORM KARTU KREDIT --- */}
              {selectedMethod === "credit" && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-4">
                    Detail Kartu Kredit / Debit
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama di Kartu
                      </label>
                      <input
                        type="text"
                        name="creditCardName"
                        value={formData.creditCardName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nomor Kartu
                      </label>
                      <input
                        type="text"
                        name="creditCardNumber"
                        value={formData.creditCardNumber}
                        onChange={handleInputChange}
                        placeholder="4111 1111 1111 1111"
                        maxLength={16}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date (MM/YY)
                        </label>
                        <input
                          type="text"
                          name="creditCardExpiry"
                          value={formData.creditCardExpiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="creditCardCvv"
                          value={formData.creditCardCvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength={3}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 2. PILIHAN BANK TRANSFER --- */}
              {selectedMethod === "bank" && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-4">
                    Pilih Bank Virtual Account
                  </h4>
                  <div className="space-y-3">
                    {banks.map((bank) => (
                      <div
                        key={bank.id}
                        onClick={() => setSelectedSubMethod(bank.id)}
                        className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer ${
                          selectedSubMethod === bank.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {bank.icon}
                        <span className="font-medium text-gray-800">
                          {bank.label}
                        </span>
                        {selectedSubMethod === bank.id && (
                          <CheckCircle className="w-5 h-5 text-blue-600 ml-auto" />
                        )}
                      </div>
                    ))}
                  </div>
                  {selectedSubMethod && (
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Nomor Virtual Account Anda:
                      </p>
                      <h3 className="text-xl font-bold text-gray-900 tracking-wider">
                        1234 8000 9876 5432
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">
                        Total Pembayaran:
                      </p>
                      <h3 className="text-lg font-bold text-blue-600">
                        Rp {course.price.toLocaleString("id-ID")}
                      </h3>
                      <p className="text-xs text-gray-500 mt-2">
                        Selesaikan pembayaran sebelum 1x24 jam.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* --- 3. PILIHAN E-WALLET --- */}
              {selectedMethod === "ewallet" && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-4">
                    Pilih E-Wallet
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {eWallets.map((wallet) => (
                      <div
                        key={wallet.id}
                        onClick={() => setSelectedSubMethod(wallet.id)}
                        className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer ${
                          selectedSubMethod === wallet.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {wallet.icon}
                        <span className="font-medium text-gray-800 mt-2">
                          {wallet.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  {selectedSubMethod && (
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nomor HP Terdaftar di{" "}
                        {eWallets.find((w) => w.id === selectedSubMethod)?.label}
                      </label>
                      <input
                        type="tel"
                        name="eWalletNumber"
                        value={formData.eWalletNumber}
                        onChange={handleInputChange}
                        placeholder="081234567890"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* --- 4. TAMPILAN QRIS --- */}
              {selectedMethod === "qris" && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
                  <h4 className="font-semibold text-gray-800 mb-4">
                    Scan QRIS
                  </h4>
                  <svg
                    className="w-48 h-48 mx-auto bg-white p-2 border rounded-lg"
                    viewBox="0 0 300 300"
                  >
                    <path
                      d="M0 0h100v100H0z M100 0v100h20V0z M0 100v20h120v-20z M200 0h100v100H200z M200 100v20h100v-20z M0 200h100v100H0z M100 200v20h20v-20z M200 200h100v100H200z M200 120h20v80h-20z M120 120h80v20h-80z M120 140v80h20v-80z M140 140h40v40h-40z"
                      fill="#000"
                    />
                    <text
                      x="150"
                      y="290"
                      textAnchor="middle"
                      fontSize="12"
                      fill="#555"
                    >
                      QRIS-PLACEHOLDER
                    </text>
                  </svg>
                  <p className="text-gray-600 mt-4">
                    Scan kode QR ini menggunakan aplikasi E-Wallet atau M-Banking
                    Anda.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Total:{" "}
                    <span className="font-bold text-blue-600">
                      Rp {course.price.toLocaleString("id-ID")}
                    </span>
                  </p>
                </div>
              )}

              {/* --- 5. INSTRUKSI RETAIL --- */}
              {selectedMethod === "retail" && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-4">
                    Instruksi Pembayaran di Gerai Retail
                  </h4>
                  <p className="text-gray-600 mb-2">
                    Tunjukkan kode pembayaran di bawah ini ke kasir Indomaret
                    atau Alfamart.
                  </p>
                  <div className="p-4 bg-gray-100 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Kode Pembayaran:</p>
                    <h3 className="text-2xl font-bold text-gray-900 tracking-widest">
                      S123 4567 8901
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    Total Pembayaran:
                  </p>
                  <h3 className="text-lg font-bold text-blue-600">
                    Rp {course.price.toLocaleString("id-ID")}
                  </h3>
                </div>
              )}
            </div>

            {/* --- TOMBOL SUBMIT DINAMIS --- */}
            {isPaymentReady() && (
              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg font-semibold transition w-full md:w-auto"
                >
                  Bayar Sekarang (Rp {course.price.toLocaleString("id-ID")})
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  )
}