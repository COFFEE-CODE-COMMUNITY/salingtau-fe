import { useState } from "react"
import {
  Menu,
  Users,
  Globe,
  Radio,
} from "lucide-react"
import { Link } from "react-router-dom"

export default function LandingPage() {
  const [isMenuOpen, setMenuOpen] = useState(false)

  return (
    <div className="text-slate-700 bg-slate-50 font-[Inter] scroll-smooth">
      {/* Header / Navbar */}
      <header className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-200">
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-slate-800">
            saling<span className="text-blue-600">tau</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#fitur" className="hover:text-blue-600 transition-colors">Fitur</a>
            <a href="#konsep" className="hover:text-blue-600 transition-colors">Konsep</a>
            <a href="#kreator" className="hover:text-blue-600 transition-colors">Untuk Kreator</a>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-slate-600 hover:text-blue-600 font-medium">Masuk</Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Daftar Gratis
            </Link>
          </div>

          {/* Burger Button */}
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="md:hidden text-slate-700"
          >
            <Menu className="w-6 h-6"/>
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white p-4 sm:p-6 border-b space-y-3">
          <a href="#fitur" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-600">Fitur</a>
          <a href="#konsep" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-600">Konsep</a>
          <a href="#kreator" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-600">Untuk
            Kreator</a>
          <div className="mt-4 pt-4 border-t">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center text-slate-600 hover:text-blue-600 font-medium py-2"
            >
              Masuk
            </Link>
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              Daftar Gratis
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
          Bukan Sekadar Belajar, <br/>
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Tapi Tumbuh Bersama.
        </span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-slate-600">
          Selamat datang di salingtau, ekosistem pembelajaran kolaboratif di mana
          setiap pertanyaan, jawaban, dan konten yang Anda bagikan akan dihargai.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-transform hover:scale-105"
          >
            Gabung Sekarang
          </Link>
        </div>
      </main>

      {/* Fitur Section */}
      <section id="fitur" className="bg-white py-14 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
              Kenapa{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              salingtau
            </span>{" "}
              Berbeda?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-slate-600">
              Kami bukan platform kursus biasa. Kami adalah sebuah gerakan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-6 h-6"/>,
                title: "Ekosistem Berbasis Komunitas",
                color: "text-blue-600 bg-blue-100",
                desc: "Forum interaktif untuk tanya jawab dan berbagi pengalaman antar pengguna.",
              },
              {
                icon: <Globe className="w-6 h-6"/>,
                title: "Platform Pembelajaran Terpusat",
                color: "text-blue-600 bg-blue-100",
                desc: "Platform terpadu video belajar, forum diskusi, dan live stream dalam satu tempat.",
              },
              {
                icon: <Radio className="w-6 h-6"/>,
                title: "Belajar Mengajar Interaktif",
                color: "text-blue-600 bg-blue-100",
                desc: "Live stream real-time agar pembelajaran terasa langsung dan seru.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-slate-50 p-6 sm:p-8 rounded-xl border border-slate-200 text-center sm:text-left hover:shadow-lg transition-shadow"
              >
                <div
                  className={`rounded-full h-12 w-12 flex items-center justify-center mx-auto sm:mx-0 ${item.color}`}
                >
                  {item.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kreator Section */}
      <section id="kreator" className="bg-white py-14 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-slate-800 text-white p-8 sm:p-10 md:p-16 rounded-2xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Siap Berbagi Keahlian?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-300">
              Jadilah kreator di salingtau. Bangun reputasimu, capai level
              verifikasi, dan mulailah membuat kursus berbayar untuk mendapatkan
              penghasilan dari keahlianmu.
            </p>
            <div className="mt-8">
              <Link
                to="/register#creator"
                className="w-full sm:w-auto inline-block bg-white text-slate-800 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-slate-200 transition-transform hover:scale-105"
              >
                Mulai Menjadi Kreator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-14 sm:py-16 text-center">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-lg font-bold">
            saling<span className="text-blue-400">tau</span>
          </p>
          <p className="mt-4 text-sm text-slate-400">
            &copy; 2025 salingtau. Semua hak cipta dilindungi.
          </p>
        </div>
      </footer>
    </div>
  )
}