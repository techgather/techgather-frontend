'use client';

import { Site } from '@/app/constans/site';
import { getLanguageParam } from '@/app/utils/language';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import CheckboxIcon from '@/public/icons/checkbox.svg';
import FilterResetIcon from '@/public/icons/filter-reset.svg';
import FilterIcon from '@/public/icons/list-filter.svg';
import ResetIcon from '@/public/icons/reset.svg';
import { CategoryResponse } from '@/types/api';
import { XIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  sourceSite: { label: string; value: Site }[];
  site: Site[];
  selectSite: (value: Site | Site[]) => void;
  categoryList: CategoryResponse[];
  categorySlug?: string;
}

const MobileFilter = ({
  sourceSite,
  selectSite,
  site,
  categoryList,
  categorySlug,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSites, setSelectedSites] = useState<Site[]>(site);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    categorySlug
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const language = getLanguageParam(searchParams.get('language'));

  const isChanged =
    selectedSites.length !== site.length ||
    !selectedSites.every((value) => site.includes(value)) ||
    selectedCategory !== categorySlug;

  const resetFilter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    selectSite([]);
    router.push(`/?language=${language}`);
  };

  const handleApply = () => {
    const params = new URLSearchParams();
    params.set('language', language);
    selectedSites.forEach((v) => params.append('site', v));
    const query = params.toString();
    const path = selectedCategory ? `/category/${selectedCategory}` : '/';
    router.push(query ? `${path}?${query}` : path);
    setIsOpen(false);
  };

  useEffect(() => {
    setSelectedSites(site);
  }, [site]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedSites(site);
      setSelectedCategory(categorySlug);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-6">
          <FilterIcon
            className={cn(
              'size-16 transition ease-in',
              site.length > 0 ? 'stroke-gray_90' : 'stroke-gray_10'
            )}
          />
          필터
          {site.length > 0 && (
            <div role="button" onClick={resetFilter}>
              <FilterResetIcon className="size-16" />
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="flex h-dvh min-w-screen flex-col gap-28 rounded-none border-none p-0"
        aria-describedby={undefined}
        showCloseButton={false}
      >
        <DialogHeader
          aria-describedby="undefined"
          className="flex w-full flex-row items-center justify-between px-20 pt-20"
        >
          <DialogTitle className="text-[18px] leading-20 font-bold">
            필터
          </DialogTitle>
          <XIcon
            className="size-26 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </DialogHeader>
        <div
          className={cn(
            'custom-scrollbar flex flex-col gap-40 overflow-y-scroll',
            isChanged ? 'pb-90' : 'pb-20'
          )}
        >
          <div className="flex flex-col gap-12 px-20">
            <div className="text-[16px] leading-18 font-bold">글 주제</div>
            <div className="flex flex-wrap gap-8">
              <div
                onClick={() => setSelectedCategory(undefined)}
                className={cn(
                  'cursor-pointer rounded-full border px-12 py-6 text-center text-[15px] leading-17',
                  !selectedCategory
                    ? 'border-gray_90 text-gray_90 bg-gray_3'
                    : 'border-gray_10 text-gray_10'
                )}
              >
                전체
              </div>
              {categoryList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedCategory(item.slug)}
                  className={cn(
                    'cursor-pointer rounded-full border px-12 py-6 text-center text-[15px] leading-17 capitalize',
                    selectedCategory === item.slug
                      ? 'border-gray_90 text-gray_90 bg-gray_3'
                      : 'border-gray_10 text-gray_10'
                  )}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-12 px-20 pb-40">
            <div className="text-[16px] leading-18 font-bold">
              테크 블로그 선택
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-12">
              {sourceSite.map((item) => (
                <div
                  onClick={() => {
                    const isSelected = selectedSites.includes(item.value);
                    if (isSelected) {
                      setSelectedSites(
                        selectedSites.filter((v) => v !== item.value)
                      );
                    } else {
                      setSelectedSites([...selectedSites, item.value]);
                    }
                  }}
                  key={item.value}
                  className={cn(
                    'border-gray_3 flex w-fit cursor-pointer items-center gap-4 rounded-full border px-12 py-6 text-center text-[15px] leading-17 font-semibold text-nowrap',
                    selectedSites.find((value) => value === item.value)
                      ? 'border-gray_90 text-gray_90 bg-gray_3'
                      : 'border-gray_10 text-gray_10'
                  )}
                >
                  <CheckboxIcon
                    className={cn(
                      'size-18 fill-white',
                      selectedSites.find((value) => value === item.value)
                        ? 'fill-gray_90 stroke-white'
                        : 'stroke-gray_5'
                    )}
                  />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
        {isChanged && (
          <div className="border-gray_5 animate-in fade-in fixed bottom-0 left-0 w-full border border-t bg-white p-20 duration-200">
            <div className="flex flex-col gap-13">
              <Button
                onClick={handleApply}
                className="bg-gray_90 hover:bg-gray_70 w-full"
              >
                적용
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedSites([]);
                  setSelectedCategory(undefined);
                }}
                className="text-gray_70 flex h-fit w-full items-center gap-2 p-0! font-semibold"
              >
                <ResetIcon />
                선택 초기화
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MobileFilter;
