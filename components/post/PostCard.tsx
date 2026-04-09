'use client';

import { Site, SITE_MAP } from '@/app/constans/site';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { PostResponse } from '@/types/api';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { formatDate } from '../../app/utils';

interface Props {
  post?: PostResponse;
  keyword?: string;
  priority?: boolean;
}

const FALLBACK_IMAGE = '/images/thumbnail-default.png';

const highlightKeyword = (text: string, keyword: string) => {
  if (!keyword) return text;

  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');

  return text.split(regex).map((part, index) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <span key={index} className="text-main_2">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const PostCard = ({ post, keyword, priority = false }: Props) => {
  const [imgSrc, setImgSrc] = useState(
    post?.thumbnail ? post.thumbnail : FALLBACK_IMAGE
  );

  const siteName = (post?.sourceSiteName ?? '') as Site;

  return (
    <Link
      href={post?.url ?? ''}
      target="_blank"
      className="group hover:bg-gray_2 flex h-fit w-full cursor-pointer flex-col rounded-2xl p-12 transition-colors duration-200 sm:w-257 md:h-277"
    >
      <div className="rounded-12 border-gray_5 relative aspect-video w-full border sm:max-w-233">
        <Image
          src={imgSrc}
          alt={`'${post?.title ?? '블로그'}' 포스트 썸네일`}
          fill
          className="rounded-12 object-cover object-center"
          priority={priority}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />
      </div>
      <div className="flex flex-col gap-8 pt-12 pb-16">
        <h3 className="block h-22 truncate text-[15px] font-bold md:h-44 md:text-wrap">
          {keyword ? highlightKeyword(post?.title ?? '', keyword) : post?.title}
        </h3>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6">
            <div
              className={cn(
                'border-gray_5 flex size-24 items-center justify-center rounded-full border',
                {
                  'bg-black':
                    post?.sourceSiteName === 'musinsa' ||
                    post?.sourceSiteName === 'gaeraeblog',
                }
              )}
            >
              <Image
                src={SITE_MAP[siteName].icon}
                alt={`${SITE_MAP[siteName].label} 아이콘`}
                width={18}
                height={18}
              />
            </div>

            <p className="text-[13px]">{SITE_MAP[siteName].label}</p>
          </div>

          <p className="text-gray_15 text-[11px]">
            {formatDate(post?.pubDate?.toString() ?? '')}
          </p>
        </div>
      </div>
      <div className="relative mb-18 min-h-18">
        {post?.categories && post.categories.length > 0 ? (
          <div className="flex gap-6 overflow-x-hidden">
            {post?.categories?.map((item, index) => (
              <Badge key={index}>{item.categoryName}</Badge>
            ))}
          </div>
        ) : (
          <Badge>카테고리 없음</Badge>
        )}
      </div>
    </Link>
  );
};

export default PostCard;
