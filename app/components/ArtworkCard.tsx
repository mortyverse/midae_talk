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
    <Link href={`/post/${post.id}`} className="block group">
      <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 ease-in-out group-hover:shadow-xl">
        <Image
          src={post.image_url}
          alt={post.title}
          width={500}
          height={500}
          className="object-cover w-full h-64 transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 truncate">
            {post.title}
          </h3>
        </div>
      </div>
    </Link>
  )
}
