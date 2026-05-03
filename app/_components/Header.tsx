'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import SearchIcon from '@/public/icons/search.svg';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';
import useCategory from '../admin/_hooks/useCategory';

const DEFAULT_GROUPID = '292680441089056769';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const { data } = useCategory(DEFAULT_GROUPID);

  const currentSlug = pathname.startsWith('/category/')
    ? pathname.split('/category/')[1]
    : null;

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
      const timer = setTimeout(() => mobileInputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen || isCategoryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isCategoryOpen]);

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
              className="group relative hidden md:block"
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
              <div className="flex items-center justify-end md:hidden">
                <motion.div
                  key={isCategoryOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  <Image
                    src={
                      isCategoryOpen
                        ? '/icons/x.svg'
                        : '/icons/hamburger-icon.svg'
                    }
                    alt="모바일 메뉴 아이콘"
                    width={24}
                    height={24}
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="cursor-pointer"
                  />
                </motion.div>
              </div>
            )}
            {!isOpen && !isCategoryOpen && (
              <div className="block md:hidden">
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
                ref={mobileInputRef}
                minLength={2}
                id="keyword-mobile"
                name="keyword"
                type="text"
                placeholder="글 제목, 태그명 검색"
                className="border-gray_30 focus-visible:ring-none focus-visible:border-main h-46 w-full px-12 py-6 text-[13px] text-white transition ease-in"
              />
              <button
                type="submit"
                className="absolute top-1/2 right-12 -translate-y-1/2"
              >
                <SearchIcon className="stroke-gray_30 size-20 transition ease-in group-focus-within:stroke-white" />
              </button>
            </form>
          </div>
        </div>
        <div
          className={cn(
            'bg-gray_90 h-dvh w-full overflow-hidden transition-all duration-250 ease-in',
            isCategoryOpen
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none max-h-0 -translate-y-2 opacity-0'
          )}
        >
          <ul className="flex flex-col gap-8 px-24 pt-12 pb-24">
            <li>
              <Link
                href="/"
                onClick={() => setIsCategoryOpen(false)}
                className={cn(
                  'text-gray_5 hover:bg-gray_80 block cursor-pointer rounded-lg p-12 text-[16px] leading-22 transition-colors duration-150',
                  !currentSlug && 'bg-gray_70 font-bold'
                )}
              >
                전체
              </Link>
            </li>
            {data?.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/category/${item.slug}`}
                  onClick={() => setIsCategoryOpen(false)}
                  className={cn(
                    'text-gray_5 hover:bg-gray_80 block cursor-pointer rounded-lg p-12 text-[16px] leading-22 transition-colors duration-150',
                    currentSlug === item.slug && 'bg-gray_70 font-bold'
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
