import { useState } from "react"
import {
  Menu,
  X, // Tambah icon X untuk close menu
  Users,
  Globe,
  Radio,
} from "lucide-react"
import { Link } from "react-router-dom"

export default function LandingPage() {
  const [isMenuOpen, setMenuOpen] = useState(false)

  return (
    // Tambahkan selection styling agar lebih premium
    <div className="text-slate-700 bg-slate-50 font-[Inter] selection:bg-blue-100 selection:text-blue-700">
      
      {/* Header / Navbar */}
      <header className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-200 transition-all duration-300">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center max-w-7xl">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-slate-800 hover:opacity-90 transition-opacity">
            saling<span className="text-blue-600">tau</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {["Fitur", "Konsep", "Kreator"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {item === "Kreator" ? "Untuk Kreator" : item}
              </a>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-slate-600 hover:text-blue-600 font-medium px-4 py-2 transition-colors duration-200"
            >
              Masuk
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Daftar Gratis
            </Link>
          </div>

          {/* Mobile Burger Button */}
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu Dropdown */}
        {/* Menggunakan absolute agar tidak mendorong konten hero ke bawah secara kasar */}
        <div 
          className={`md:hidden absolute w-full bg-white border-b border-slate-200 shadow-xl transition-all duration-300 ease-in-out origin-top ${
            isMenuOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-0 invisible"
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {["Fitur", "Konsep", "Kreator"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="block text-lg font-medium text-slate-700 hover:text-blue-600 hover:pl-2 transition-all duration-200"
              >
                {item === "Kreator" ? "Untuk Kreator" : item}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-100 grid gap-3">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center text-slate-600 hover:text-blue-600 font-medium py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all"
              >
                Daftar Gratis
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32 text-center max-w-7xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight tracking-tight">
          Bukan Sekadar Belajar, <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Tapi Tumbuh Bersama.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed">
          Selamat datang di salingtau, ekosistem pembelajaran kolaboratif di mana
          setiap pertanyaan, jawaban, dan konten yang Anda bagikan akan dihargai.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Gabung Sekarang
          </Link>
          <a
             href="#fitur"
             className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
          >
            Pelajari Lebih Lanjut
          </a>
        </div>
      </main>

      {/* Fitur Section */}
      {/* scroll-mt-28 agar title tidak ketutup header saat di klik dari menu */}
      <section id="fitur" className="bg-white py-16 sm:py-24 scroll-mt-28 border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
              Kenapa{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                salingtau
              </span>{" "}
              Berbeda?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
              Kami bukan platform kursus biasa. Kami adalah sebuah gerakan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: "Ekosistem Berbasis Komunitas",
                color: "text-blue-600 bg-blue-50",
                desc: "Forum interaktif untuk tanya jawab dan berbagi pengalaman antar pengguna.",
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Platform Pembelajaran Terpusat",
                color: "text-blue-600 bg-blue-50",
                desc: "Platform terpadu video belajar, forum diskusi, dan live stream dalam satu tempat.",
              },
              {
                icon: <Radio className="w-6 h-6" />,
                title: "Belajar Mengajar Interaktif",
                color: "text-blue-600 bg-blue-50",
                desc: "Live stream real-time agar pembelajaran terasa langsung dan seru.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group h-full bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center sm:items-start text-center sm:text-left"
              >
                <div
                  className={`rounded-xl h-14 w-14 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${item.color}`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kreator Section */}
      <section id="kreator" className="bg-slate-50 py-16 sm:py-24 scroll-mt-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="relative bg-slate-900 overflow-hidden text-white p-8 sm:p-12 md:p-16 rounded-3xl text-center shadow-2xl">
            {/* Hiasan background abstrak */}
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Siap Berbagi Keahlian?
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-slate-300 mb-10 leading-relaxed">
                Jadilah kreator di salingtau. Bangun reputasimu, capai level
                verifikasi, dan mulailah membuat kursus berbayar untuk mendapatkan
                penghasilan dari keahlianmu.
              </p>
              <Link
                to="/register#creator"
                className="inline-flex items-center justify-center w-full sm:w-auto bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 hover:text-blue-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                Mulai Menjadi Kreator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 text-center">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <Link to="/" className="inline-block text-2xl font-bold text-slate-800 mb-4 hover:opacity-80 transition-opacity">
            saling<span className="text-blue-600">tau</span>
          </Link>
          <p className="text-slate-500">
            &copy; {new Date().getFullYear()} salingtau. Semua hak cipta dilindungi.
          </p>
        </div>
      </footer>
    </div>
  )
}