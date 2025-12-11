import { useEffect } from "react"

interface VeriffRedirectProps {
  sessionUrl: string
}

export default function Veriff({ sessionUrl }: VeriffRedirectProps) {
  useEffect(() => {
    if (!sessionUrl) return
    window.location.href = sessionUrl
  }, [sessionUrl])

  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
      {/* Animated Loading Icon */}
      <div className="relative mb-6 sm:mb-8">
        <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Main Message */}
      <p className="text-base sm:text-lg text-gray-900 font-semibold text-center mb-2 animate-fade-in">
        Mengalihkan ke halaman verifikasi identitas...
      </p>
      
      {/* Loading Indicator */}
      <div className="flex items-center gap-1 mb-4 sm:mb-6">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>

      {/* Fallback Link with Card Design */}
      <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 max-w-md w-full">
        <p className="text-xs sm:text-sm text-gray-600 text-center mb-3">
          Jika tidak berpindah otomatis dalam beberapa detik:
        </p>
        <a
          href={sessionUrl}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm sm:text-base font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 touch-manipulation group"
        >
          <span>Klik di sini untuk melanjutkan</span>
          <svg 
            className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>

      {/* Security Badge */}
      <div className="mt-6 sm:mt-8 flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Koneksi aman & terenkripsi</span>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}