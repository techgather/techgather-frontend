'use client';

import { useSelectedLayoutSegments } from 'next/navigation';

const Banner = () => {
  const segments = useSelectedLayoutSegments();
  const isSearchPage = segments[0] === 'search';

  if (isSearchPage) {
    return null;
  }

  return (
    <div className="mt-52 flex w-full items-center justify-center bg-[#CFF1F5]">
      <div className="flex w-full max-w-1440 items-center px-52 py-16 sm:py-24">
        <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:gap-12">
          <h3 className="font-hanna text-center text-[28px]/[32px]">
            현직 개발자가 엄선한 <br className="block sm:hidden" />
            기술 아티클 모아보기
          </h3>
          <p className="text-[13px]/[15px] text-[#408088] sm:text-[15px]/[18px]">
            평균 주 3회 업로드
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
