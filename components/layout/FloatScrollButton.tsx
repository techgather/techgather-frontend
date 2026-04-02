'use client';

import ArrowIcon from '@/public/icons/arrow-up.svg';
import { useEffect, useState } from 'react';

const FloatScrollButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`border-gray_10 hover:bg-gray_5 fixed right-22 bottom-10 flex size-44 cursor-pointer items-center justify-center rounded-full border bg-white shadow-md transition-all duration-200 md:right-40 md:bottom-40 ${visible ? 'scale-100' : 'scale-0'}`}
    >
      <ArrowIcon />
    </button>
  );
};

export default FloatScrollButton;
