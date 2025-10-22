import {Search} from "lucide-react";

export default function (placeholder: string, layout: string) {
  return (
    <div className={layout}>
      <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
      />
    </div>
  )
}