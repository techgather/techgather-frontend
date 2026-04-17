'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import SearchIcon from '@/public/icons/search.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const keyword = formData.get('keyword')?.toString().trim();

    if (!keyword) return;

    setIsOpen(false);
    router.push(`/search/${keyword}`);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black transition-opacity duration-100',
          isOpen
            ? 'pointer-events-auto opacity-40'
            : 'pointer-events-none opacity-0'
        )}
        onClick={() => setIsOpen(false)}
      />
      <header className="bg-gray_90 fixed top-0 z-50 flex w-full flex-col items-center justify-center">
        <div className="bg-gray_90 flex h-52 w-full max-w-1440 items-center justify-between px-24 py-10">
          <Image
            alt="header logo"
            src="/icons/logo.svg"
            width={60}
            height={27.6}
            onClick={() => router.push('/')}
            className="cursor-pointer"
          />
          <div className="flex items-center gap-20 md:gap-36">
            <form
              onSubmit={handleSubmit}
              className="group relative hidden sm:block"
            >
              <Input
                minLength={2}
                id="keyword"
                name="keyword"
                type="text"
                placeholder="글 제목, 태그명 검색"
                className="border-gray_30 focus-visible:ring-none focus-visible:border-main h-30 w-240 px-12 py-6 text-[13px] text-white transition ease-in"
              />
              <SearchIcon className="sm:stroke-gray_30 absolute top-1/2 right-0 size-24 -translate-y-1/2 stroke-white transition ease-in group-focus-within:stroke-white sm:right-12 sm:size-16" />
            </form>
            {!isOpen && (
              <div className="block sm:hidden">
                <SearchIcon
                  className="size-24 cursor-pointer stroke-white transition ease-in"
                  onClick={() => setIsOpen((prev) => !prev)}
                />
              </div>
            )}
          </div>
        </div>
        <div
          className={cn(
            'bg-gray_90 w-full overflow-hidden transition-all duration-250 ease-in',
            isOpen
              ? 'pointer-events-auto max-h-200 translate-y-0 opacity-100'
              : 'pointer-events-none max-h-0 -translate-y-2 opacity-0'
          )}
        >
          <div className="px-24 py-12">
            <form onSubmit={handleSubmit} className="group relative w-full">
              <Input
                minLength={2}
                id="keyword-mobile"
                name="keyword"
                type="text"
                placeholder="글 제목, 태그명 검색"
                autoFocus={isOpen}
                className="border-gray_30 focus-visible:ring-none focus-visible:border-main h-46 w-full px-12 py-6 text-[13px] text-white transition ease-in"
              />
              <SearchIcon className="stroke-gray_30 absolute top-1/2 right-12 size-20 -translate-y-1/2 transition ease-in group-focus-within:stroke-white" />
            </form>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
