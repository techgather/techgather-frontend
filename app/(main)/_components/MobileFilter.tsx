'use client';

import { Site } from '@/app/constans/site';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import FilterResetIcon from '@/public/icons/filter-reset.svg';
import FilterIcon from '@/public/icons/list-filter.svg';
import { CategoryResponse } from '@/types/api';
import { XIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  menu: CategoryResponse[];
  sourceSite: { label: string; value: Site }[];
  site: Site[];
  selectSite: (value: Site | Site[]) => void;
  currentCategory?: string;
}

const MobileFilter = ({
  menu,
  sourceSite,
  selectSite,
  site,
  currentCategory,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const resetFilter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    router.push('/');
    selectSite([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-6">
          <FilterIcon
            className={cn(
              'size-16 transition ease-in',
              site.length > 0 || currentCategory
                ? 'stroke-gray_90'
                : 'stroke-gray_10'
            )}
          />
          필터
          {(site.length > 0 || currentCategory) && (
            <div role="button" onClick={resetFilter}>
              <FilterResetIcon className="size-16" />
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="flex h-dvh min-w-screen flex-col gap-28 rounded-none border-none p-20"
        aria-describedby={undefined}
        showCloseButton={false}
      >
        <DialogHeader
          aria-describedby="undefined"
          className="flex w-full flex-row items-center justify-between"
        >
          <DialogTitle className="text-[18px] leading-20 font-bold">
            필터
          </DialogTitle>
          <XIcon
            className="size-26 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </DialogHeader>
        <div className="flex flex-col gap-28 overflow-y-scroll">
          <div className="flex flex-col gap-12">
            <div className="text-[16px] leading-18 font-bold">카테고리</div>
            <div className="grid grid-cols-2 gap-8">
              <Link
                href="/"
                className={cn(
                  'text-gray_10 border-gray_10 flex-1 rounded-[6px] border py-12 text-center text-[16px] leading-17',
                  !currentCategory && 'text-gray_90 border-gray_90'
                )}
              >
                전체
              </Link>
              {menu.map((item) => (
                <Link
                  href={`/category/${item.slug}`}
                  key={item.id}
                  className={cn(
                    'text-gray_10 border-gray_10 flex-1 rounded-[6px] border py-12 text-center text-[16px] leading-17 capitalize',
                    currentCategory === item.slug &&
                      'text-gray_90 border-gray_90'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <div className="text-[16px] leading-18 font-bold">
              테크 블로그 선택
            </div>
            <div className="grid grid-cols-2 gap-8">
              {sourceSite.map((item) => (
                <div
                  onClick={() => selectSite(item.value)}
                  key={item.value}
                  className={` ${site.find((value) => value === item.value) ? 'border-gray_90 text-gray_90' : 'border-gray_10 text-gray_10'} flex-1 cursor-pointer rounded-[6px] border py-12 text-center text-[16px] leading-17`}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MobileFilter;
