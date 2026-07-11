'use client';

import { useI18n } from '@/app/i18n/I18nProvider';
import { useSelectedLayoutSegments } from 'next/navigation';
import type { CSSProperties } from 'react';

const paperShape = [
  '  ______________________',
  ' /:::::::::::::::::::::/|',
  '/_____________________/ |',
  '|  article.md          | |',
  '|  const pick = true;  | |',
  '|  <tech /> <blog />   | /',
  '|______________________|/',
];

const stackGroups = [
  { className: 'banner-ascii-stack left-[-18px] top-24 sm:left-40 sm:top-34' },
  {
    className:
      'banner-ascii-stack hidden sm:block sm:left-244 sm:top-118 banner-ascii-stack--small',
  },
  {
    className:
      'banner-ascii-stack hidden lg:block lg:left-420 lg:top-190 banner-ascii-stack--wide',
  },
  {
    className:
      'banner-ascii-stack right-[-24px] top-76 sm:right-62 sm:top-70 banner-ascii-stack--tall',
  },
  {
    className:
      'banner-ascii-stack hidden md:block md:right-282 md:top-170 banner-ascii-stack--small',
  },
];

const layers = Array.from({ length: 10 }, (_, index) => index);

const PaperStack = ({ className }: { className: string }) => (
  <div aria-hidden="true" className={className}>
    {layers.map((layer) => (
      <pre
        className="banner-ascii-paper"
        key={layer}
        style={
          {
            '--paper-index': layer,
            '--paper-delay': `${layer * 0.22}s`,
          } as CSSProperties
        }
      >
        {paperShape.join('\n')}
      </pre>
    ))}
  </div>
);

const Banner = () => {
  const segments = useSelectedLayoutSegments();
  const { t } = useI18n();
  const isSearchPage = segments[0] === 'search';

  if (isSearchPage) {
    return null;
  }

  return (
    <section className="mt-52 flex w-full items-center justify-center overflow-hidden bg-[#18191B]">
      <div className="relative flex min-h-248 w-full max-w-1440 items-center justify-center px-24 py-58 sm:min-h-302 sm:px-52 sm:py-72">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {stackGroups.map((stack) => (
            <PaperStack className={stack.className} key={stack.className} />
          ))}
        </div>

        <div className="relative z-10 flex w-full max-w-560 flex-col items-center gap-18 text-center">
          <h3 className="font-hanna text-[34px]/[44px] text-white sm:text-[44px]/[56px]">
            {t('banner.titlePrefix')} <br />
            {t('banner.titleSuffix')}
          </h3>
          <p className="text-[15px]/[20px] font-semibold text-[#8F949C] sm:text-[19px]/[26px]">
            {t('banner.description')}
          </p>
        </div>

        <style>{`
          .banner-ascii-stack {
            position: absolute;
            width: 236px;
            height: 190px;
            opacity: 0.82;
            transform: rotate(-2deg);
          }

          .banner-ascii-stack--small {
            width: 204px;
            height: 156px;
            transform: rotate(1deg) scale(0.86);
            opacity: 0.72;
          }

          .banner-ascii-stack--wide {
            width: 260px;
            height: 128px;
            transform: rotate(0deg) scale(0.72);
            opacity: 0.64;
          }

          .banner-ascii-stack--tall {
            width: 252px;
            height: 218px;
            transform: rotate(2deg) scale(0.94);
          }

          .banner-ascii-paper {
            position: absolute;
            left: calc(var(--paper-index) * -3px);
            bottom: calc(var(--paper-index) * 13px);
            margin: 0;
            color: rgba(255, 255, 255, 0.9);
            font-family:
              ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
              "Liberation Mono", "Courier New", monospace;
            font-size: 10px;
            line-height: 10px;
            letter-spacing: 0;
            text-shadow: 0 0 12px rgba(255, 255, 255, 0.08);
            white-space: pre;
            opacity: 0;
            animation: banner-paper-stack 4.8s var(--paper-delay) infinite;
          }

          @keyframes banner-paper-stack {
            0% {
              opacity: 0;
              transform: translate3d(18px, -26px, 0) rotate(2deg);
            }
            12%,
            62% {
              opacity: 0.88;
              transform: translate3d(0, 0, 0) rotate(0deg);
            }
            80%,
            100% {
              opacity: 0;
              transform: translate3d(-10px, 18px, 0) rotate(-1deg);
            }
          }

          @media (max-width: 549px) {
            .banner-ascii-stack {
              width: 172px;
              height: 138px;
              opacity: 0.54;
              transform: rotate(-3deg) scale(0.74);
            }

            .banner-ascii-stack--tall {
              transform: rotate(2deg) scale(0.7);
            }

            .banner-ascii-paper {
              font-size: 8px;
              line-height: 8px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .banner-ascii-paper {
              animation: none;
              opacity: 0.68;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Banner;
