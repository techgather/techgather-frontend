'use client';

import { Input } from '@/components/ui/input';
import SearchIcon from '@/public/icons/search.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

const Header = () => {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const keyword = formData.get('keyword')?.toString().trim();

    if (!keyword) return;

    router.push(`/search/${keyword}`);
    e.currentTarget.reset();
  };

  return (
    <header className="bg-gray_90 fixed top-0 z-50 flex w-full items-center justify-center">
      <div className="bg-gray_90 flex h-52 w-full max-w-1440 items-center justify-between px-24 py-10">
        <Image
          alt="header logo"
          src="/icons/logo.svg"
          width={101}
          height={24}
          onClick={() => router.push('/')}
          className="cursor-pointer"
        />
        <form onSubmit={handleSubmit} className="group relative">
          <Input
            id="keyword"
            name="keyword"
            type="text"
            placeholder="글 제목, 태그명 검색"
            className="border-gray_30 focus-visible:ring-none hidden h-30 w-240 px-12 py-6 text-[13px] text-white transition ease-in focus-visible:border-[#11FFB7] sm:block"
          />
          <SearchIcon className="sm:stroke-gray_30 absolute top-1/2 right-0 size-24 -translate-y-1/2 stroke-white transition ease-in group-focus-within:stroke-white sm:right-12 sm:size-16" />
        </form>
      </div>
    </header>
  );
};

export default Header;
