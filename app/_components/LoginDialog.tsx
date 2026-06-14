'use client';

import { useI18n } from '@/app/i18n/I18nProvider';
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
  const { t } = useI18n();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-main hover:bg-main/90 h-30 border-none px-12 py-6 text-sm font-bold"
          variant="outline"
        >
          {t('login.title')}
        </Button>
      </DialogTrigger>
      <DialogContent className="h-screen max-w-600 rounded-none px-24 py-48 sm:h-auto sm:rounded-lg">
        <DialogHeader aria-describedby="undefined">
          <DialogTitle className="flex w-full justify-center text-xl/[136%] font-bold">
            {t('login.title')}
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
                alt={t('login.googleIconAlt')}
              />
              {t('login.google')}
            </Button>
            <div className="text-gray_15 flex gap-20 text-[13px]/[136%]">
              <Link href={''}>{t('common.privacyPolicy')}</Link>
              <Link href={''}>{t('common.terms')}</Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
