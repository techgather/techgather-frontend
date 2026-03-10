import { Suspense } from 'react';
import Header from './_components/Header';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
