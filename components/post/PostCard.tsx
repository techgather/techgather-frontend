'use client';

import { getSiteInfo, Site } from '@/app/constans/site';
import { useI18n } from '@/app/i18n/I18nProvider';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
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
  const { locale, t } = useI18n();
  const siteName = (post?.sourceSiteName ?? '') as Site;
  const siteInfo = getSiteInfo(siteName, locale);
  const fallbackImage = `/thumbnails/${siteName}.png`;
  const fallbackImageList = ['woowahan', 'gccompany', 'kakao-pay', 'stripe'];

  const [imgSrc, setImgSrc] = useState(
    post?.thumbnail && !fallbackImageList.includes(siteName)
      ? post.thumbnail
      : fallbackImage
  );
  const [isThumbnailLoading, setIsThumbnailLoading] = useState(true);
  const [isMobileIconLoading, setIsMobileIconLoading] = useState(true);

  return (
    <>
      <Link
        href={post?.url ?? ''}
        target="_blank"
        className="group hover:bg-gray_2 hidden h-fit w-full cursor-pointer flex-col rounded-2xl p-12 transition-all duration-200 hover:-translate-y-4 sm:block sm:w-257 md:h-277"
      >
        <div className="rounded-12 border-gray_5 relative aspect-video w-full border sm:max-w-233">
          {isThumbnailLoading && (
            <Skeleton className="rounded-12 absolute inset-0 h-full w-full" />
          )}
          <Image
            src={imgSrc}
            alt={`'${post?.title ?? t('common.postThumbnailFallback')}' ${t('image.thumbnailAlt')}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 257px"
            className={cn(
              'rounded-12 object-cover object-center transition-opacity duration-200',
              isThumbnailLoading ? 'opacity-0' : 'opacity-100'
            )}
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            onLoad={() => setIsThumbnailLoading(false)}
            onError={() => {
              if (imgSrc === fallbackImage) {
                setIsThumbnailLoading(false);
                return;
              }

              setIsThumbnailLoading(true);
              setImgSrc(fallbackImage);
            }}
          />
        </div>
        <div className="flex flex-col gap-8 pt-12 pb-16">
          <h3 className="block h-22 truncate text-[15px] font-bold md:h-44 md:text-wrap">
            {keyword
              ? highlightKeyword(post?.title ?? '', keyword)
              : post?.title}
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
                  src={siteInfo.icon}
                  alt={`${siteInfo.label} ${t('image.siteIconAlt')}`}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              </div>

              <p className="text-[13px]">{siteInfo.label}</p>
            </div>

            <p className="text-gray_15 text-[11px]">
              {formatDate(post?.pubDate?.toString() ?? '')}
            </p>
          </div>
        </div>
        <div className="relative min-h-18">
          {post?.categories && post.categories.length > 0 ? (
            <div className="flex gap-6 overflow-x-hidden">
              {post?.categories?.map((item, index) => (
                <Badge key={index}>{item.categoryName}</Badge>
              ))}
            </div>
          ) : (
            <Badge>{t('common.noCategory')}</Badge>
          )}
        </div>
      </Link>
      <div className="border-gray_5 border-b pb-20 sm:hidden">
        <Link
          href={post?.url ?? ''}
          target="_blank"
          className="group flex h-fit w-full cursor-pointer justify-between rounded-2xl transition-all duration-200 hover:-translate-y-4"
        >
          <div className="mr-9 flex min-w-0 flex-col gap-8">
            <h3 className="line-clamp-2 h-44 text-[15px] font-bold">
              {keyword
                ? highlightKeyword(post?.title ?? '', keyword)
                : post?.title}
            </h3>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-6">
                <p className="text-[13px]">{siteInfo.label}</p>
              </div>
              <p className="text-gray_15 text-[11px]">
                {formatDate(post?.pubDate?.toString() ?? '')}
              </p>
              <div className="relative min-h-18">
                {post?.categories && post.categories.length > 0 ? (
                  <div className="flex gap-6 overflow-x-hidden">
                    {post?.categories?.map((item, index) => (
                      <Badge key={index}>{item.categoryName}</Badge>
                    ))}
                  </div>
                ) : (
                  <Badge>{t('common.noCategory')}</Badge>
                )}
              </div>
            </div>
          </div>
          <div
            className={cn(
              'rounded-12 border-gray_5 relative aspect-square size-74 border',
              {
                'bg-black':
                  post?.sourceSiteName === 'musinsa' ||
                  post?.sourceSiteName === 'gaeraeblog',
              }
            )}
          >
            {isMobileIconLoading && (
              <Skeleton className="rounded-12 absolute inset-0 h-full w-full" />
            )}
            <Image
              src={siteInfo.icon}
              alt={`'${post?.title ?? t('common.postThumbnailFallback')}' ${t('image.thumbnailAlt')}`}
              fill
              sizes="72px"
              className={cn(
                'rounded-12 object-contain object-center transition-opacity duration-200',
                isMobileIconLoading ? 'opacity-0' : 'opacity-100'
              )}
              priority={priority}
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : undefined}
              onLoad={() => setIsMobileIconLoading(false)}
              onError={() => setIsMobileIconLoading(false)}
            />
          </div>
        </Link>
      </div>
    </>
  );
};

export default PostCard;
