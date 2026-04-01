import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <header className="bg-gray_90 fixed top-0 z-50 flex w-full items-center justify-center">
        <div className="bg-gray_90 flex h-52 w-full max-w-1440 items-center justify-between px-24 py-10">
          <Link href="/">
            <Image
              alt="header logo"
              src="/icons/logo.svg"
              width={60}
              height={27.6}
              className="cursor-pointer"
            />
          </Link>
        </div>
      </header>
      <div className="flex-1 pt-52">
        <h2>404 not found</h2>
        <p>잘못된 접근입니다</p>
        <Link href="/">메인으로 이동</Link>
      </div>
    </>
  );
}
