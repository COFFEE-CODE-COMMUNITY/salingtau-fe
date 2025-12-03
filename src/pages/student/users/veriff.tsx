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
    <div className="flex flex-col items-center justify-center py-16">
      <p className="text-gray-700 font-medium">
        Mengalihkan ke halaman verifikasi identitas...
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Jika tidak berpindah otomatis,{" "}
        <a
          href={sessionUrl}
          className="text-blue-600 underline"
        >
          klik di sini
        </a>
        .
      </p>
    </div>
  )
}
