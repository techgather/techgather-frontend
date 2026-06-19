'use client';

import { getSiteInfo, Site } from '@/app/constans/site';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { PostResponse } from '@/types/api';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { formatDate } from '../../app/utils';
import { Button } from '../ui/button';

interface Props {
  post?: PostResponse;
  keyword?: string;
  checked: boolean;
  handleCheck: (postId: string) => void;
}

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
  const siteName = (post?.sourceSiteName ?? '') as Site;
  const fallbackImage = `/thumbnails/${siteName}.png`;
  const fallbackImageList = ['woowahan', 'gccompany', 'kakao-pay', 'stripe'];

  const [imgSrc, setImgSrc] = useState(
    post?.thumbnail && !fallbackImageList.includes(siteName)
      ? post.thumbnail
      : fallbackImage
  );

  return (
    <div
      className={cn(
        'group hover:border-main_2 flex w-full min-w-0 cursor-pointer flex-col rounded-2xl border border-transparent p-10 transition-colors duration-200 hover:bg-[#E3FDF5] xl:p-12',
        { 'border-main_2 bg-[#E3FDF5]': checked }
      )}
      onClick={() => handleCheck(post?.postId?.toString() ?? '')}
    >
      <div className="rounded-12 border-gray_5 relative aspect-video w-full border">
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
          onError={() => setImgSrc(fallbackImage)}
        />
      </div>
      <div className="flex min-w-0 flex-col gap-8 pt-12 pb-16">
        <h2 className="block h-22 w-full truncate text-[15px] font-bold md:h-44 md:text-wrap">
          {keyword ? highlightKeyword(post?.title ?? '', keyword) : post?.title}
        </h2>
        <div className="flex min-w-0 items-center gap-8">
          <div className="flex min-w-0 items-center gap-6">
            <div
              className={cn(
                'border-gray_5 relative flex size-24 shrink-0 items-center justify-center rounded-full border',
                {
                  'bg-black':
                    post?.sourceSiteName === 'musinsa' ||
                    post?.sourceSiteName === 'gaeraeblog',
                }
              )}
            >
              <Image
                src={getSiteInfo(siteName).icon}
                alt={getSiteInfo(siteName).label}
                fill
                className="rounded-full"
              />
            </div>

            <p className="truncate text-[13px]">
              {getSiteInfo(siteName).label}
            </p>
          </div>
          <p className="text-gray_15 shrink-0 text-[11px]">
            {formatDate(post?.pubDate?.toString() ?? '')}
          </p>
        </div>
      </div>

      <div className="relative mb-10 h-18">
        {post?.categories && post.categories.length > 0 ? (
          <>
            <div className="flex gap-6 overflow-x-hidden">
              {post?.categories?.map((item, index) => (
                <Badge key={index}>{item.categoryName}</Badge>
              ))}
            </div>
            <div className="pointer-events-none absolute top-0 right-0 h-full w-40 bg-linear-to-l from-white to-transparent transition-colors duration-200 group-hover:from-[#E3FDF5]" />
          </>
        ) : (
          <Badge>카테고리 없음</Badge>
        )}
      </div>
      <Link href={post?.url ?? ''} target="_blank">
        <Button className="text-gray_20 border-gray_5 hover:bg-gray_2 w-full border bg-white">
          바로가기
        </Button>
      </Link>
    </div>
  );
};

export default AdminPostCard;
