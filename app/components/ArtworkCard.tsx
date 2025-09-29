import Image from 'next/image'
import Link from 'next/link'

// Define the type for a post
type Post = {
  id: number;
  title: string;
  image_url: string;
};

export default function ArtworkCard({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 ease-out group-hover:-translate-y-2">
        <div className="aspect-square overflow-hidden">
          <Image
            src={post.image_url}
            alt={post.title}
            width={500}
            height={500}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">
            {post.title}
          </h3>
          <div className="flex items-center text-sm opacity-90">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            작품 보기
          </div>
        </div>
        
        {/* Card content (visible by default) */}
        <div className="p-6 group-hover:hidden">
          <h3 className="font-semibold text-lg text-slate-900 line-clamp-2 mb-2">
            {post.title}
          </h3>
          <div className="flex items-center text-sm text-slate-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            클릭하여 자세히 보기
          </div>
        </div>
      </div>
    </Link>
  )
}
