'use client';

import { useI18n } from '@/app/i18n/I18nProvider';
import { useSelectedLayoutSegments } from 'next/navigation';
import type { CSSProperties } from 'react';

const stackGroups = [
  {
    className:
      'banner-ascii-stack left-[-154px] top-142 sm:left-[-112px] sm:top-132 lg:left-44 lg:top-42 banner-ascii-stack--large',
  },
  {
    className:
      'banner-ascii-stack hidden lg:block lg:left-250 lg:top-132 banner-ascii-stack--medium',
  },
  {
    className:
      'banner-ascii-stack hidden lg:block lg:left-430 lg:top-220 banner-ascii-stack--low',
  },
  {
    className:
      'banner-ascii-stack right-[-158px] top-150 sm:right-[-118px] sm:top-136 lg:right-62 lg:top-84 banner-ascii-stack--large banner-ascii-stack--right',
  },
  {
    className:
      'banner-ascii-stack hidden lg:block lg:right-276 lg:top-198 banner-ascii-stack--medium banner-ascii-stack--right',
  },
];

const stackLayers = Array.from({ length: 18 }, (_, index) => index);

const PaperStack = ({ className }: { className: string }) => (
  <div aria-hidden="true" className={className}>
    {stackLayers.map((layer) => (
      <div
        className="banner-ascii-sheet"
        key={layer}
        style={
          {
            '--sheet-index': layer,
            '--sheet-delay': `${layer * 0.12}s`,
          } as CSSProperties
        }
      />
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
      <div className="relative flex min-h-248 w-full max-w-1440 items-center justify-center px-24 py-54 sm:min-h-302 sm:px-52 sm:py-72">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {stackGroups.map((stack) => (
            <PaperStack className={stack.className} key={stack.className} />
          ))}
          <div className="banner-text-clear" aria-hidden="true" />
        </div>

        <div className="relative z-10 flex w-full max-w-580 flex-col items-center gap-20 text-center">
          <h3 className="font-hanna text-[34px]/[45px] text-white sm:text-[45px]/[62px]">
            {t('banner.titlePrefix')} <br />
            {t('banner.titleSuffix')}
          </h3>
          <p className="text-[15px]/[20px] font-semibold text-[#8A8F98] sm:text-[19px]/[26px]">
            {t('banner.description')}
          </p>
        </div>

        <style>{`
          .banner-ascii-stack {
            position: absolute;
            width: 246px;
            height: 210px;
            opacity: 0.58;
            transform: rotate(-1.5deg);
          }

          .banner-ascii-stack--right {
            transform: rotate(1.5deg);
          }

          .banner-ascii-stack--large {
            width: 270px;
            height: 244px;
          }

          .banner-ascii-stack--medium {
            width: 232px;
            height: 176px;
            opacity: 0.64;
          }

          .banner-ascii-stack--low {
            width: 230px;
            height: 112px;
            opacity: 0.5;
            transform: rotate(0deg) scale(0.86);
          }

          .banner-text-clear {
            position: absolute;
            left: 50%;
            top: 50%;
            width: min(620px, 78vw);
            height: 212px;
            background: radial-gradient(
              ellipse at center,
              #18191b 0%,
              #18191b 58%,
              rgba(24, 25, 27, 0.86) 72%,
              rgba(24, 25, 27, 0) 100%
            );
            transform: translate(-50%, -50%);
          }

          .banner-ascii-sheet {
            position: absolute;
            left: calc(var(--sheet-index) * -2.8px);
            bottom: calc(var(--sheet-index) * 8.5px);
            width: 100%;
            height: 26px;
            opacity: 0;
            color: rgba(255, 255, 255, 0.82);
            animation: banner-sheet-stack 4.4s var(--sheet-delay) infinite;
          }

          .banner-ascii-sheet::before,
          .banner-ascii-sheet::after {
            position: absolute;
            font-family:
              ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
              "Liberation Mono", "Courier New", monospace;
            font-size: 12px;
            line-height: 10px;
            letter-spacing: 0;
            white-space: pre;
          }

          .banner-ascii-sheet::before {
            left: 18px;
            top: 0;
            content: ".-------------------------------------------.";
          }

          .banner-ascii-sheet::after {
            left: 0;
            top: 9px;
            content: "/'------------------------------------------'\\\\";
          }

          @keyframes banner-sheet-stack {
            0% {
              opacity: 0;
              transform: translate3d(22px, -14px, 0);
            }
            10%,
            70% {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
            88%,
            100% {
              opacity: 0;
              transform: translate3d(-10px, 10px, 0);
            }
          }

          @media (max-width: 549px) {
            .banner-ascii-stack {
              width: 196px;
              height: 156px;
              opacity: 0.3;
              transform: rotate(-2deg) scale(0.74);
            }

            .banner-ascii-stack--right {
              transform: rotate(2deg) scale(0.74);
            }

            .banner-ascii-sheet {
              bottom: calc(var(--sheet-index) * 7px);
              height: 22px;
            }

            .banner-ascii-sheet::before,
            .banner-ascii-sheet::after {
              font-size: 9px;
              line-height: 8px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .banner-ascii-sheet {
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
