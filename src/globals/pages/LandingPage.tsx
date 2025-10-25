import { useState } from "react"
import {
  Menu,
  Users,
  Award,
  MessageCircle,
  HelpCircle,
  TrendingUp,
  BookOpen,
} from "lucide-react"
import { Link } from "react-router-dom"

export default function LandingPage() {
  const [isMenuOpen, setMenuOpen] = useState(false)

  return (
    <div className="text-slate-700 bg-slate-50 font-[Inter] scroll-smooth">
      {/* Header / Navbar */}
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-200">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-slate-800">
            saling<span className="text-indigo-600">tau</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#fitur" className="hover:text-indigo-600 transition-colors">
              Fitur
            </a>
            <a href="#konsep" className="hover:text-indigo-600 transition-colors">
              Konsep
            </a>
            <a href="#kreator" className="hover:text-indigo-600 transition-colors">
              Untuk Kreator
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
            >
              Masuk
            </Link>
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Daftar Gratis
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="md:hidden text-slate-700"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white p-6 border-b space-y-3">
          <a href="#fitur" className="block py-2 hover:text-indigo-600">
            Fitur
          </a>
          <a href="#konsep" className="block py-2 hover:text-indigo-600">
            Konsep
          </a>
          <a href="#kreator" className="block py-2 hover:text-indigo-600">
            Untuk Kreator
          </a>
          <div className="mt-4 pt-4 border-t">
            <Link
              to="/login"
              className="block w-full text-center text-slate-600 hover:text-indigo-600 font-medium py-2"
            >
              Masuk
            </Link>
            <Link
              to="/register"
              className="block w-full text-center mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Daftar Gratis
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
          Bukan Sekadar Belajar, <br />
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Tapi Tumbuh Bersama.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600">
          Selamat datang di salingtau, ekosistem pembelajaran kolaboratif di mana
          setiap pertanyaan, jawaban, dan konten yang Anda bagikan akan dihargai.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-transform hover:scale-105"
          >
            Gabung Sekarang
          </Link>
        </div>
      </main>

      {/* Fitur Section */}
      <section id="fitur" className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Kenapa{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                salingtau
              </span>{" "}
              Berbeda?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-slate-600">
              Kami bukan platform kursus biasa. Kami adalah sebuah gerakan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: "Ekosistem Berbasis Komunitas",
                color: "text-indigo-600 bg-indigo-100",
                desc: "Fokus utama kami adalah pembelajaran interaktif, diskusi, dan saling membantu. Belajar jadi lebih hidup saat dilakukan bersama.",
              },
              {
                icon: <Award className="w-6 h-6" />,
                title: "Jadilah Kreator Dan Tingkatkan Reputasi",
                color: "text-purple-600 bg-purple-100",
                desc: "Dapatkan uang dan reputasi untuk setiap kontribusi Anda. Buktikan keahlianmu dan jadilah panutan di komunitas.",
              },
              {
                icon: <MessageCircle className="w-6 h-6" />,
                title: "Forum Diskusi Cerdas",
                color: "text-sky-600 bg-sky-100",
                desc: "Bingung? Tanyakan ke komunitas atau dapatkan jawaban instan dari Asisten AI kami yang didukung oleh Gemini.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-slate-50 p-8 rounded-xl border border-slate-200 text-center md:text-left"
              >
                <div
                  className={`rounded-full h-12 w-12 flex items-center justify-center mx-auto md:mx-0 ${item.color}`}
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

      {/* Konsep Section */}
      <section id="konsep" className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Siklus Pengetahuan di{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                salingtau
              </span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-slate-600">
              Begini cara ekosistem kami bekerja untuk keuntungan semua orang.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: <HelpCircle className="w-12 h-12 text-indigo-500" />,
                title: "1. Bertanya & Berdiskusi",
                desc: "Punya kendala? Lemparkan ke forum. Jawaban terbaik akan mendapat upvote dan menjadi sorotan.",
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-purple-500" />,
                title: "2. Dapatkan Uang & Reputasi",
                desc: "Setiap jawaban berkualitas dan konten yang Anda buat akan diganjar uang dan reputasi sebagai apresiasi.",
              },
              {
                icon: <BookOpen className="w-12 h-12 text-sky-500" />,
                title: "3. Akses Pengetahuan Baru",
                desc: "Gunakan poin untuk membuka kursus premium atau mengikuti sesi diskusi live eksklusif dari para ahli.",
              },
            ].map((step) => (
              <div key={step.title} className="p-6">
                <div className="bg-white border-2 border-slate-200 rounded-full h-24 w-24 flex items-center justify-center mx-auto">
                  {step.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kreator Section */}
      <section id="kreator" className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="bg-slate-800 text-white p-10 md:p-16 rounded-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Siap Berbagi Keahlian?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-slate-300">
              Jadilah kreator di salingtau. Bangun reputasimu, capai level
              verifikasi, dan mulailah membuat kursus berbayar untuk mendapatkan
              penghasilan dari keahlianmu.
            </p>
            <div className="mt-8">
              <Link
                to="/register#creator"
                className="bg-white text-slate-800 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-slate-200 transition-transform hover:scale-105"
              >
                Mulai Menjadi Kreator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg font-bold">
            saling<span className="text-indigo-400">tau</span>
          </p>
          <p className="mt-4 text-sm text-slate-400">
            &copy; 2025 salingtau. Semua hak cipta dilindungi.
          </p>
        </div>
      </footer>
    </div>
  )
}
