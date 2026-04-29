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
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  sourceSite: { label: string; value: Site }[];
  site: Site[];
  selectSite: (value: Site | Site[]) => void;
  currentCategory?: string;
}

const MobileFilter = ({
  sourceSite,
  selectSite,
  site,
  currentCategory,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSites, setSelectedSites] = useState<Site[]>(site);
  const router = useRouter();

  const resetFilter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    router.push('/');
    selectSite([]);
  };

  const handleApply = () => {
    selectSite(selectedSites);
    setIsOpen(false);
  };

  useEffect(() => {
    setSelectedSites(site);
  }, [site]);

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
        <div className="custom-scrollbar flex flex-col gap-28 overflow-y-scroll">
          {/* <div className="flex flex-col gap-12 px-20">
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
          </div> */}
          <div className="flex flex-col gap-12 px-20 pb-20">
            <div className="text-[16px] leading-18 font-bold">
              테크 블로그 선택
            </div>
            <div className="grid grid-cols-2 gap-8">
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
                  className={` ${selectedSites.find((value) => value === item.value) ? 'border-gray_90 text-gray_90' : 'border-gray_10 text-gray_10'} flex-1 cursor-pointer rounded-[6px] border py-12 text-center text-[16px] leading-17`}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
          {selectedSites.length > 0 && (
            <div className="border-gray_5 fixed bottom-0 left-0 w-full border border-t bg-white p-20">
              <Button
                onClick={handleApply}
                className="bg-gray_90 hover:bg-gray_70 w-full"
              >
                적용
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MobileFilter;
