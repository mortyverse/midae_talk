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
    return (
      <div className="text-center py-12">
        <div className="max-w-sm mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">아직 피드백이 없습니다</h3>
          <p className="text-slate-600">첫 피드백을 남겨보세요!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {feedbacks.map((feedback, index) => (
        <div key={feedback.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-sm font-semibold text-white">
                  {feedback.profiles?.name?.charAt(0)?.toUpperCase() || '?'}
                </span>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-slate-900">
                  {feedback.profiles?.name ?? '익명'}
                </h4>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <time>
                    {format(new Date(feedback.created_at), 'yyyy년 MM월 dd일 HH:mm')}
                  </time>
                </div>
              </div>
              
              <div className="prose prose-sm max-w-none">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {feedback.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
