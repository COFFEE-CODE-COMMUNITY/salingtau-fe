import { useState } from "react"
import { Search } from "lucide-react"

export default function SearchBar(
  placeholder: string,
  layout: string,
  onSearch?: (query: string) => void
) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (onSearch) onSearch(query.trim())
    // Kalau kamu mau nanti navigate ke halaman pencarian, tambahkan di sini.
  }

  return (
    <form onSubmit={handleSubmit} className={layout}>
      <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
      />
    </form>
  )
}
