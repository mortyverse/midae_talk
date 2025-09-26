import { format } from 'date-fns'

// Define types for the props
type Profile = {
  name: string | null
}

export type FeedbackWithProfile = {
  id: number
  content: string
  created_at: string
  profiles: Profile | null
}

type FeedbackListProps = {
  feedbacks: FeedbackWithProfile[]
}

export default function FeedbackList({ feedbacks }: FeedbackListProps) {
  if (feedbacks.length === 0) {
    return <p className="text-sm text-gray-500 mt-6">아직 피드백이 없습니다. 첫 피드백을 남겨보세요!</p>
  }

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold">피드백</h2>
      <ul className="space-y-4">
        {feedbacks.map((feedback) => (
          <li key={feedback.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2">
              <p className="font-semibold text-sm text-gray-800">
                {feedback.profiles?.name ?? '익명'}
              </p>
              <time className="ml-auto text-xs text-gray-500">
                {format(new Date(feedback.created_at), 'yyyy년 MM월 dd일')}
              </time>
            </div>
            <p className="text-gray-700">{feedback.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
