'use client';

import { resolveLocale } from '@/app/i18n/config';
import { useI18n } from '@/app/i18n/I18nProvider';
import { resolvePostRegion } from '@/app/utils/postRegion';
import { mainPath } from '@/app/utils/routes';
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
import { useParams, useRouter } from 'next/navigation';

const MobileMenu = () => {
  const router = useRouter();
  const params = useParams<{ locale?: string; postRegion?: string }>();
  const { t } = useI18n();
  const locale = resolveLocale(params.locale);
  const postRegion = resolvePostRegion(params.postRegion);

  return (
    <Drawer direction="top">
      <DrawerTrigger>
        <Image
          src="/icons/hamburger-icon.svg"
          alt={t('image.mobileMenuAlt')}
          width={24}
          height={24}
        />
      </DrawerTrigger>
      <DrawerContent className="bg-gray_90">
        <DrawerHeader>
          <DrawerTitle>
            <div className="grid w-full max-w-1440 grid-cols-2 items-center">
              <Image
                alt="header logo"
                src="/icons/logo.svg"
                width={60}
                height={27.6}
                onClick={() => router.push(mainPath(locale, postRegion))}
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
