import { Badge } from '@/components/ui/badge';
import { Post } from '@/types/post';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <Link
      href={post.url}
      target="_blank"
      className="group hover:bg-gray_2 flex h-277 w-257 cursor-pointer flex-col rounded-2xl p-12 transition-colors duration-200"
    >
      <div className="rounded-12 border-gray_5 relative aspect-video max-w-233">
        <Image
          src={post.thumbnail}
          alt="thumbnail"
          fill
          className="rounded-12 object-cover object-center"
        />
      </div>
      <div className="flex flex-col gap-8 pt-12 pb-16">
        <h2 className="block h-44 truncate text-[15px] font-bold text-wrap whitespace-pre-wrap">
          {post.title}
        </h2>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="bg-gray_10 relative size-24 rounded-full" />
            <p className="text-[13px]">이름</p>
          </div>
          <p className="text-gray_15 text-[11px]">
            {new Date(post.pubDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="relative">
        <div className="flex gap-6 overflow-x-hidden">
          {post.tags.map((item, index) => (
            <Badge key={index}>{item}</Badge>
          ))}
        </div>
        <div className="group-hover:from-gray_2 pointer-events-none absolute top-0 right-0 h-full w-40 bg-linear-to-l from-white to-transparent transition-colors duration-200" />
      </div>
    </Link>
  );
};

export default PostCard;
