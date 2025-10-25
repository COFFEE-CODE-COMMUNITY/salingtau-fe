import { MessageSquare } from 'lucide-react'

type Props = {
  message?: string
  description?: string
}

export function EmptyState({
                             message = 'No threads found',
                             description = 'Be the first to create a thread!',
                           }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <MessageSquare className="w-16 h-16 text-gray-300 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{message}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  )
}