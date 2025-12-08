import { Input } from '@/components/ui/input';
import SearchIcon from '@/public/icons/search.svg';
import Image from 'next/image';

const Header = () => {
  return (
    <div className="bg-gray_90 fixed top-0 flex h-52 w-full max-w-1440 items-center justify-between px-24 py-10">
      <Image alt="header logo" src="/icons/logo.svg" width={101} height={24} />
      <div className="group relative">
        <Input
          id="keyword"
          name="keyword"
          type="text"
          placeholder="글 제목, 태그명 검색"
          className="border-gray_30 focus-visible:ring-none h-30 w-240 px-12 py-6 text-[13px] text-white transition ease-in focus-visible:border-[#11FFB7]"
        />

        <SearchIcon className="stroke-gray_30 absolute top-1/2 right-12 -translate-y-1/2 transition ease-in group-focus-within:stroke-white" />
      </div>
    </div>
  );
};

export default Header;
