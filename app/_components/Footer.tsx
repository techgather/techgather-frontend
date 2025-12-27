import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray_2 mt-40 flex w-full items-center justify-center">
      <div className="text-gray_15 flex w-full max-w-1440 flex-col gap-20 px-24 py-22 text-[13px]">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <Image
              alt="푸터 로고"
              src="/icons/footer-logo.svg"
              width={101}
              height={24}
            />
            <div className="flex items-center gap-4">
              <p>데브로그</p>
              <p>최신 개발 트렌드를 엄선하여 </p>
            </div>
          </div>
          <div className="flex gap-13">
            <Link href={'https://github.com/techgather/techgather-frontend'}>
              개인정보처리방침
            </Link>
            <Link href={'https://github.com/techgather/techgather-frontend'}>
              이용약관
            </Link>
          </div>
        </div>
        <p>© DEVLOG. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
