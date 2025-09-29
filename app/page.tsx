import { createClient } from '@/app/utils/supabase/server'
import ArtworkCard from '@/app/components/ArtworkCard'

export default async function Home() {
  const supabase = await createClient()
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })


  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          작품 갤러리
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          입시 미술 학생들의 작품을 감상하고 전문적인 피드백을 받아보세요
        </p>
      </div>
      
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {posts.map((post) => (
            <ArtworkCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-3">아직 업로드된 작품이 없습니다</h3>
            <p className="text-slate-600 mb-6">학생으로 로그인하여 첫 작품을 업로드해보세요!</p>
            <div className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              새로운 작품을 기다리고 있어요
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
