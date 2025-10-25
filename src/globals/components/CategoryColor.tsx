export default function CategoryColor(categoryName: string): string {
  const colorMap: Record<string, string> = {
    "Web Development": "text-blue-600 bg-blue-100",
    "Data Science": "text-green-600 bg-green-100",
    "Marketing": "text-yellow-600 bg-yellow-100",
    "Design": "text-pink-600 bg-pink-100",
    "Business": "text-purple-600 bg-purple-100",
    "AI": "text-indigo-600 bg-indigo-100",
    "Mobile Development": "text-teal-600 bg-teal-100",
    "Photography": "text-orange-600 bg-orange-100",
  };

  const color = colorMap[categoryName] || "text-gray-600 bg-gray-100";

  return `text-xs font-semibold ${color} px-2 py-1 rounded-full`;
}
