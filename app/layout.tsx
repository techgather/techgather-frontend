import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import Header from './_components/Header';

const Pretendard = localFont({
  src: [
    {
      path: './fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'devLog',
  description: 'developer blog archive',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${Pretendard.className} bg-white antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
