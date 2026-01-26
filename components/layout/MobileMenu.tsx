'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const MobileMenu = () => {
  const router = useRouter();
  return (
    <Drawer direction="top">
      <DrawerTrigger>
        <Image
          src="/icons/hamburger-icon.svg"
          alt="모바일 메뉴 아이콘"
          width={24}
          height={24}
        />
      </DrawerTrigger>
      <DrawerContent className="bg-gray_90">
        <DrawerHeader>
          <DrawerTitle>
            {' '}
            <div className="grid w-full max-w-1440 grid-cols-2 items-center">
              <Image
                alt="header logo"
                src="/icons/logo.svg"
                width={101}
                height={24}
                onClick={() => router.push('/')}
                className="cursor-pointer"
              />
            </div>
          </DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
