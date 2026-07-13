import Image from 'next/image';

interface Props {
  description: string;
  titlePrefix: string;
  titleSuffix: string;
}

const Banner = ({ description, titlePrefix, titleSuffix }: Props) => {
  return (
    <section className="mt-52 flex w-full items-center justify-center overflow-hidden bg-[#020605]">
      <div className="relative flex w-full max-w-1440 items-center justify-center overflow-hidden px-24 pt-32 pb-28 sm:px-52 lg:py-32">
        <Image
          src="/images/moon-banner.png"
          alt="배너 이미지"
          fill
          sizes="(min-width: 1440px) 1440px, 100vw"
          quality={90}
          preload
          aria-hidden="true"
          className="object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex w-full max-w-580 flex-col items-center gap-8 text-center">
          <h3 className="font-hanna text-[24px]/[34px] text-white lg:text-[28px]/[39px]">
            {titlePrefix} <br className="lg:hidden" />
            {titleSuffix}
          </h3>
          <p className="text-[13px]/[18px] font-medium text-[#8A8F98] lg:text-[15px]/[21px]">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
