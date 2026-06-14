'use client';

import { useI18n } from '@/app/i18n/I18nProvider';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="bg-gray_2 flex w-full items-center justify-center">
      <div className="text-gray_15 flex w-full max-w-1440 flex-col gap-20 px-24 py-22 text-[13px]">
        <div className="flex flex-col gap-28">
          <div className="flex flex-col gap-12">
            <Image
              alt={t('footer.logoAlt')}
              src="/icons/footer-logo.svg"
              width={66}
              height={30.36}
            />
            <div className="text-gray_20 text-[13px] leading-15 font-bold">
              {t('footer.description')}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex gap-8">
              <Link href={'https://github.com/techgather/techgather-frontend'}>
                {t('common.privacyPolicy')}
              </Link>
              |
              <Link href={'https://github.com/techgather/techgather-frontend'}>
                {t('common.terms')}
              </Link>
            </div>
            <div className="flex gap-12 text-[12px] leading-13">
              <p>© {t('common.brandShort')}</p>
              <p>{t('common.contact')}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
