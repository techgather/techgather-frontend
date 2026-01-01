'use client';

import { Badge } from '@/components/ui/badge';
import { Post } from '@/types/post';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { formatDate } from '../../app/utils';

interface Props {
  post: Post;
  keyword?: string;
}

const FALLBACK_IMAGE = '/images/thumbnail-default.png';

const highlightKeyword = (text: string, keyword: string) => {
  if (!keyword) return text;

  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');

  return text.split(regex).map((part, index) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <span key={index} className="text-main">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const PostCard = ({ post, keyword }: Props) => {
  const [imgSrc, setImgSrc] = useState(
    post.thumbnail ? post.thumbnail : FALLBACK_IMAGE
  );

  return (
    <Link
      href={post.url}
      target="_blank"
      className="group hover:bg-gray_2 flex h-277 w-257 cursor-pointer flex-col rounded-2xl p-12 transition-colors duration-200"
    >
      <div className="rounded-12 border-gray_5 relative aspect-video max-w-233 border">
        <Image
          src={imgSrc}
          alt="thumbnail"
          fill
          className="rounded-12 object-cover object-center"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />
      </div>
      <div className="flex flex-col gap-8 pt-12 pb-16">
        <h2 className="block h-44 truncate text-[15px] font-bold text-wrap whitespace-pre-wrap">
          {keyword ? highlightKeyword(post.title, keyword) : post.title}
        </h2>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="bg-gray_10 relative size-24 rounded-full" />
            <p className="text-[13px]">이름</p>
          </div>
          <p className="text-gray_15 text-[11px]">{formatDate(post.pubDate)}</p>
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
