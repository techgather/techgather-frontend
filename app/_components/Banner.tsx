'use client';

import { useI18n } from '@/app/i18n/I18nProvider';
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
      <div className="relative flex min-h-[165px] w-full max-w-1440 items-center justify-center overflow-hidden px-24 py-36 sm:min-h-[201px] sm:px-52 sm:py-48 lg:min-h-[248px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[url('/images/moon-banner.png')] bg-cover bg-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex w-full max-w-580 flex-col items-center gap-16 text-center">
          <h3 className="font-hanna text-[30px]/[41px] text-white sm:text-[43px]/[60px]">
            {t('banner.titlePrefix')} <br />
            {t('banner.titleSuffix')}
          </h3>
          <p className="text-[13px]/[18px] font-semibold text-[#8A8F98] sm:text-[17px]/[24px]">
            {t('banner.description')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
