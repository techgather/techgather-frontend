'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Post } from '@/types/post';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { formatDate } from '../../app/utils';
import { Button } from '../ui/button';

interface Props {
  post: Post;
  keyword?: string;
  checked: boolean;
  handleCheck: (postId: number) => void;
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

const AdminPostCard = ({ post, keyword, handleCheck, checked }: Props) => {
  const [imgSrc, setImgSrc] = useState(
    post.thumbnail ? post.thumbnail : FALLBACK_IMAGE
  );

  return (
    <div
      className={cn(
        'group hover:border-main_2 flex h-323 w-257 cursor-pointer flex-col rounded-2xl border border-transparent p-12 transition-colors duration-200 hover:bg-[#E3FDF5]',
        { 'border-main_2 bg-[#E3FDF5]': checked }
      )}
      onClick={() => handleCheck(post.postId)}
    >
      <div className="rounded-12 border-gray_5 relative aspect-video max-w-233 border">
        <div className="absolute top-9 left-9 z-10">
          {checked ? (
            <Image
              src="/icons/admin-check-active.svg"
              alt="체크 아이콘"
              width={20}
              height={20}
            />
          ) : (
            <Image
              src="/icons/admin-check.svg"
              alt="체크 전 아이콘"
              width={20}
              height={20}
            />
          )}
        </div>

        <Image
          src={imgSrc}
          alt="썸네일"
          fill
          draggable={false}
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
            <p className="text-[13px]">{post.sourceSiteName}</p>
          </div>
          <p className="text-gray_15 text-[11px]">{formatDate(post.pubDate)}</p>
        </div>
      </div>
      <div className="relative mb-18 h-18">
        <div className="flex gap-6 overflow-x-hidden">
          {post.tags.map((item, index) => (
            <Badge key={index}>{item}</Badge>
          ))}
        </div>
        <div className="pointer-events-none absolute top-0 right-0 h-full w-40 bg-linear-to-l from-white to-transparent transition-colors duration-200 group-hover:from-[#E3FDF5]" />
      </div>
      <Link href={post.url} target="_blank">
        <Button className="text-gray_20 border-gray_5 hover:bg-gray_2 w-full border bg-white">
          바로가기
        </Button>
      </Link>
    </div>
  );
};

export default AdminPostCard;
