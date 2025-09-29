import { createClient } from '@/app/utils/supabase/server'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import FeedbackForm from './FeedbackForm'
import FeedbackList, { FeedbackWithProfile } from './FeedbackList'

type PostPageProps = {
  params: {
    id: string
  }
}

// Define a more specific type for the post data we are fetching
type PostWithDetails = {
  id: number;
  created_at: string;
  title: string;
  description: string | null;
  image_url: string;
  user_id: string;
  profiles: {
    name: string | null;
  } | null;
};


export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Convert string id to number for database query
  const postId = parseInt(id, 10)
  
  if (isNaN(postId)) {
    notFound()
  }

  // Fetch post data first
  const { data: post, error: postError } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .single()

  if (postError) {
    console.error('PostPage - Supabase post error:', postError)
    notFound()
  }

  if (!post) {
    notFound()
  }

  // Fetch author information separately
  const { data: profile } = await supabase
    .from('profiles')
    .select('name')
    .eq('id', post.user_id)
    .single()

  // Combine post and profile data
  const typedPost = {
    ...post,
    profiles: profile ? { name: profile.name } : null
  } as PostWithDetails

  // Fetch feedback separately
  const { data: feedbacks } = await supabase
    .from('feedback')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: false })

  // Fetch feedback authors separately
  let typedFeedbacks: FeedbackWithProfile[] = []
  if (feedbacks && feedbacks.length > 0) {
    const userIds = [...new Set(feedbacks.map(f => f.user_id))]
    const { data: feedbackProfiles } = await supabase
      .from('profiles')
      .select('id, name')
      .in('id', userIds)

    typedFeedbacks = feedbacks.map(feedback => ({
      ...feedback,
      profiles: feedbackProfiles?.find(p => p.id === feedback.user_id) || null
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="px-8 py-6 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{typedPost.title}</h1>
              <div className="flex items-center space-x-4 text-slate-600">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-white">
                      {typedPost.profiles?.name?.charAt(0)?.toUpperCase() || '?'}
                    </span>
                  </div>
                  <span className="font-medium">
                    {typedPost.profiles?.name ?? '알 수 없음'}
                  </span>
                </div>
                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                <span className="text-sm">
                  {new Date(typedPost.created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-sm">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm font-medium text-slate-700">작품 감상</span>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="p-8">
          <div className="relative group">
            <div className="overflow-hidden rounded-2xl bg-slate-100 shadow-lg">
              <Image
                src={typedPost.image_url}
                alt={typedPost.title}
                width={800}
                height={600}
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            {/* Image overlay info */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>클릭하여 확대</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        {typedPost.description && (
          <div className="px-8 pb-8">
            <div className="bg-slate-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                작품 설명
              </h3>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {typedPost.description}
              </p>
            </div>
          </div>
        )}

        {/* Feedback Section */}
        <div className="px-8 pb-8">
          <div className="border-t border-slate-200 pt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                <svg className="w-6 h-6 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                피드백
              </h2>
              <div className="text-sm text-slate-500">
                {typedFeedbacks.length}개의 피드백
              </div>
            </div>
            
            <FeedbackForm postId={typedPost.id} />
            <FeedbackList feedbacks={typedFeedbacks} />
          </div>
        </div>
      </div>
    </div>
  )
}
