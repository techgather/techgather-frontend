'use client';

import { useI18n } from '@/app/i18n/I18nProvider';
import Image from 'next/image';
import { useSelectedLayoutSegments } from 'next/navigation';

const Banner = () => {
  const segments = useSelectedLayoutSegments();
  const { t } = useI18n();
  const isSearchPage = segments[0] === 'search';

  if (isSearchPage) {
    return null;
  }

  return (
    <section className="mt-52 flex w-full items-center justify-center overflow-hidden bg-[#020605]">
      <div className="relative flex w-full max-w-1440 items-center justify-center overflow-hidden px-24 pt-32 pb-28 sm:px-52 lg:py-32">
        <Image
          src="/images/moon-banner.png"
          alt=""
          fill
          sizes="100vw"
          aria-hidden="true"
          className="object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex w-full max-w-580 flex-col items-center gap-8 text-center">
          <h3 className="font-hanna text-[24px]/[34px] text-white lg:text-[28px]/[39px]">
            {t('banner.titlePrefix')} <br className="lg:hidden" />
            {t('banner.titleSuffix')}
          </h3>
          <p className="text-[13px]/[18px] font-medium text-[#8A8F98] lg:text-[15px]/[21px]">
            {t('banner.description')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
