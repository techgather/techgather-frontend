'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import Link from 'next/link';

const LoginDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-main hover:bg-main/90 h-30 border-none px-12 py-6 text-sm font-bold"
          variant="outline"
        >
          로그인
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-600 px-24 py-48">
        <DialogHeader aria-describedby="undefined">
          <DialogTitle className="flex w-full justify-center text-xl/[136%] font-bold">
            로그인
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-40 pt-32">
          <div className="size-200 bg-gray-100" />
          <div className="flex flex-col items-center gap-20">
            <Button className="border-gray_5 hover:bg-gray_2/50 flex h-48 items-center gap-8 rounded-full border bg-white px-60 py-14 text-[15px]/[136%] text-[#23262A]">
              <Image
                src="/icons/google-icon.svg"
                width={20}
                height={20}
                alt="구글 로그인 버튼 아이콘"
              />
              구글 계정으로 계속하기
            </Button>
            <div className="text-gray_15 flex gap-20 text-[13px]/[136%]">
              <Link href={''}>개인정보 처리방침</Link>
              <Link href={''}>이용약관</Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
