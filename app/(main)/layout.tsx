import type { Metadata } from 'next';
import Header from '../_components/Header';

export const metadata: Metadata = {
  title: {
    template: '%s | DevPick(데브픽)',
    default: '최신 개발 아티클 모음',
  },
  keywords: ['DevPick', '데브픽', '최신 개발 글', '테크 블로그 모음'],
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="mt-52 flex w-full max-w-1440 flex-1 flex-col">
        {children}
      </div>
    </>
  );
}
