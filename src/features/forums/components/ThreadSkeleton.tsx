export function ThreadSkeleton() {
  return (
    <li className="p-5 animate-pulse">
      <div className="flex items-start space-x-4">
        <div className="h-10 w-10 rounded-full bg-gray-300" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-gray-300 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    </li>
  )
}