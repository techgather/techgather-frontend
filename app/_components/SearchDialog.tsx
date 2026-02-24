'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import SearchIcon from '@/public/icons/search.svg';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

interface Props {
  openState: boolean;
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchDialog = ({ openState, setOpenState }: Props) => {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const keyword = formData.get('keyword')?.toString().trim();

    if (!keyword) return;

    setOpenState(false);

    router.push(`/search/${keyword}`);
  };

  return (
    <Dialog open={openState} onOpenChange={setOpenState}>
      <DialogTrigger asChild>
        <SearchIcon className="size-24 stroke-white transition ease-in" />
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="bg-gray_90 flex h-screen max-w-600 flex-col gap-0 rounded-none border-none p-0"
        aria-describedby={undefined}
      >
        <DialogHeader aria-describedby="undefined">
          <DialogTitle>
            <div className="bg-gray_90 flex h-52 w-full max-w-1440 items-center justify-between px-24 py-12">
              <Image
                alt="header logo"
                src="/icons/logo.svg"
                width={101}
                height={24}
                onClick={() => router.push('/')}
                className="cursor-pointer"
              />
              <XIcon
                className="size-24 cursor-pointer stroke-white"
                onClick={() => setOpenState(false)}
              />
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex w-full justify-center px-24 py-8">
          <form onSubmit={handleSubmit} className="group relative w-full">
            <Input
              minLength={2}
              id="keyword"
              name="keyword"
              type="text"
              placeholder="글 제목, 태그명 검색"
              className="border-gray_30 focus-visible:ring-none focus-visible:border-main h-46 w-full px-12 py-6 text-[13px] text-white transition ease-in"
            />
            <SearchIcon className="stroke-gray_30 absolute top-1/2 right-12 size-20 -translate-y-1/2 transition ease-in group-focus-within:stroke-white" />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
