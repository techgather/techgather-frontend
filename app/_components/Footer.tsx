import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray_2 mt-40 flex w-full items-center justify-center">
      <div className="text-gray_15 flex w-full max-w-1440 flex-col gap-20 px-24 py-22 text-[13px]">
        <div className="flex flex-col gap-28">
          <div className="flex flex-col gap-12">
            <Image
              alt="푸터 로고"
              src="/icons/footer-logo.svg"
              width={66}
              height={30.36}
            />
            <div className="text-gray_20 text-[13px] leading-15 font-bold">
              테크 블로그들의 최신 아티클을 현직 개발자가 직접 엄선하여
              게재합니다
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex gap-8">
              <Link href={'https://github.com/techgather/techgather-frontend'}>
                개인정보처리방침
              </Link>
              |
              <Link href={'https://github.com/techgather/techgather-frontend'}>
                이용약관
              </Link>
            </div>
            <div className="flex gap-12 text-[12px] leading-13">
              <p>© 데브픽 DevPick</p>
              <p>문의 sj07245@naver.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
