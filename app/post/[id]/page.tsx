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
    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="mb-2">
        <h1 className="text-3xl font-bold">{typedPost.title}</h1>
        <p className="text-sm text-gray-500 mt-2">
          작성자: {typedPost.profiles?.name ?? '알 수 없음'}
        </p>
      </div>
      <div className="mb-6">
        <Image
          src={typedPost.image_url}
          alt={typedPost.title}
          width={800}
          height={600}
          className="w-full h-auto rounded-lg object-contain"
        />
      </div>
      <div className="prose max-w-none mb-8">
        <p>{typedPost.description}</p>
      </div>

      <hr />

      {/* Feedback Section */}
      <div className="mt-8">
        <FeedbackForm postId={typedPost.id} />
        <FeedbackList feedbacks={typedFeedbacks} />
      </div>
    </div>
  )
}
