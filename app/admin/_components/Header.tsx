'use client';

import { ADMIN_MOBILE_MENU, AdminMenuType } from '@/app/constans/header';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import SearchIcon from '@/public/icons/search.svg';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import Tab from './Tab';

const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const currentTab =
    (searchParams.get('tab') as AdminMenuType) ?? AdminMenuType.All;

  const handleAction = (action: AdminMenuType) => {
    setIsOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', action);

    switch (action) {
      case AdminMenuType.All:
        router.push(`${pathname}?${params.toString()}`);
        break;
      case AdminMenuType.Deleted:
        router.push(`${pathname}?${params.toString()}`);
        break;

      case AdminMenuType.MyPage:
        router.push('/mypage');
        break;

      case AdminMenuType.Logout:
        // logout();
        break;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const keyword = formData.get('keyword')?.toString().trim();

    if (!keyword) return;

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
        <div className="relative grid h-48 w-full max-w-1440 grid-cols-2 items-center px-24 py-10 md:h-52 md:grid-cols-3">
          <Image
            alt="header logo"
            src="/icons/logo.svg"
            width={101}
            height={24}
            onClick={() => router.push('/')}
            className="cursor-pointer"
          />
          <div className="hidden justify-center md:flex">
            <Tab handleClick={handleAction} currentOption={currentTab} />
          </div>
          <div className="hidden items-center justify-end gap-36 md:flex">
            <form onSubmit={handleSubmit} className="group relative">
              <Input
                minLength={2}
                id="keyword"
                name="keyword"
                type="text"
                placeholder="글 제목, 태그명 검색"
                className="border-gray_30 focus-visible:ring-none focus-visible:border-main hidden h-30 w-full max-w-240 px-12 py-6 text-[13px] text-white transition ease-in sm:block"
              />
              <SearchIcon className="sm:stroke-gray_30 absolute top-1/2 right-0 size-24 -translate-y-1/2 stroke-white transition ease-in group-focus-within:stroke-white sm:right-12 sm:size-16" />
            </form>
            <div className="size-28 rounded-full bg-gray-600" />
          </div>
          <div className="flex items-center justify-end md:hidden">
            <motion.div
              key={isOpen ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.15 }}
            >
              <Image
                src={isOpen ? '/icons/x.svg' : '/icons/hamburger-icon.svg'}
                alt="모바일 메뉴 아이콘"
                width={24}
                height={24}
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer"
              />
            </motion.div>
          </div>
        </div>
        <div
          className={cn(
            'bg-gray_90 w-full overflow-hidden transition-all duration-250 ease-in',
            isOpen
              ? 'pointer-events-auto max-h-500 translate-y-0 opacity-100'
              : 'pointer-events-none max-h-0 -translate-y-2 opacity-0'
          )}
        >
          <ul className="flex flex-col gap-8 px-24 pt-12 pb-24">
            {ADMIN_MOBILE_MENU.map((item) => (
              <li
                key={item.value}
                className={cn(
                  'text-gray_5 hover:bg-gray_80 cursor-pointer rounded-lg p-12 text-[16px] leading-22 transition-colors duration-150',
                  currentTab === item.value && 'bg-gray_70 font-bold'
                )}
                onClick={() => handleAction(item.value)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
