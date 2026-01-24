import type { Metadata } from 'next';
import Header from '../_components/Header';

export const metadata: Metadata = {
  title: 'devLog',
  description: 'developer blog archive',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="mt-52 w-full max-w-1440">{children}</div>
    </>
  );
}
