import { createClient } from '@/app/utils/supabase/server'
import ArtworkCard from '@/app/components/ArtworkCard'

export default async function Home() {
  const supabase = await createClient()
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })


  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">작품 갤러리</h1>
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <ArtworkCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-12">
          <p>아직 업로드된 작품이 없습니다.</p>
          <p>'학생'으로 로그인하여 첫 작품을 업로드해보세요!</p>
        </div>
      )}
    </div>
  )
}
