'use client';

import XIcon from '@/public/icons/x.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

type NavigatorWithStandalone = Navigator & {
  standalone?: boolean;
};

const DISMISSED_STORAGE_KEY = 'devpick-pwa-install-dismissed';

const PwaInstallPrompt = () => {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      Boolean((window.navigator as NavigatorWithStandalone).standalone);
    const isDismissed = localStorage.getItem(DISMISSED_STORAGE_KEY) === 'true';

    if (isStandalone || isDismissed) {
      return;
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;

    if (choice.outcome === 'accepted') {
      setIsVisible(false);
      setInstallPrompt(null);
    }
  };

  const handleCloseClick = () => {
    localStorage.setItem(DISMISSED_STORAGE_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed top-20 right-16 left-16 z-50 md:hidden">
      <div className="border-gray_5 rounded-12 flex w-full items-center gap-12 border bg-white p-16 shadow-[0_4px_16px_rgba(0,0,0,0.18)]">
        <Image
          src="/icons/pwa-192.png"
          alt="DevPick app icon"
          width={36}
          height={36}
          className="rounded-8 size-36"
        />
        <div className="min-w-0 flex-1">
          <p className="text-gray_90 truncate text-[15px]/[18px] font-bold">
            데브픽 앱으로 추가
          </p>
          <p className="text-gray_10 mt-2 truncate text-[13px]/[15px]">
            홈 화면에서 앱처럼 이용
          </p>
        </div>
        <button
          type="button"
          onClick={handleInstallClick}
          className="bg-gray_90 shrink-0 rounded-full px-12 py-4 text-[13px] font-bold text-white"
        >
          설치
        </button>
        <button
          type="button"
          aria-label="설치 안내 닫기"
          onClick={handleCloseClick}
          className="text-gray_10 flex size-28 shrink-0 items-center justify-center"
        >
          <XIcon className="size-20" />
        </button>
      </div>
    </div>
  );
};

export default PwaInstallPrompt;
