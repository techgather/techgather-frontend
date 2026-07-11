'use client';

import { useI18n } from '@/app/i18n/I18nProvider';
import { useSelectedLayoutSegments } from 'next/navigation';
import type { CSSProperties } from 'react';

const stackGroups = [
  {
    className:
      'banner-ascii-stack left-[-94px] top-150 sm:left-[-112px] sm:top-132 lg:left-44 lg:top-28 banner-ascii-stack--large banner-ascii-stack--desktop-left-main',
  },
  {
    className:
      'banner-ascii-stack hidden lg:block lg:left-250 lg:top-132 banner-ascii-stack--medium banner-ascii-stack--desktop-left-mid',
  },
  {
    className:
      'banner-ascii-stack hidden lg:block lg:left-404 lg:top-184 banner-ascii-stack--low banner-ascii-stack--desktop-left-floor',
  },
  {
    className:
      'banner-ascii-stack right-[-96px] top-150 sm:right-[-118px] sm:top-136 lg:right-62 lg:top-84 banner-ascii-stack--large banner-ascii-stack--right',
  },
  {
    className:
      'banner-ascii-stack banner-ascii-stack--mobile-extra banner-ascii-stack--mobile-left-low',
  },
  {
    className:
      'banner-ascii-stack banner-ascii-stack--mobile-extra banner-ascii-stack--mobile-left-floor',
  },
  {
    className:
      'banner-ascii-stack banner-ascii-stack--mobile-extra banner-ascii-stack--mobile-right-floor banner-ascii-stack--right',
  },
  {
    className:
      'banner-ascii-stack hidden lg:block lg:right-276 lg:top-198 banner-ascii-stack--medium banner-ascii-stack--right',
  },
];

const stackLayers = Array.from({ length: 16 }, (_, index) => index);
const sheetOffsets = [-7, 5, -4, 8, -9, 4, -3, 7, -6, 6, -4, 5, -8, 4, -5, 7];

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
            '--sheet-offset': `${sheetOffsets[layer]}px`,
            zIndex: layer + 1,
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
      <div className="relative flex min-h-[165px] w-full max-w-1440 items-center justify-center px-24 py-36 sm:min-h-[201px] sm:px-52 sm:py-48 lg:min-h-[248px]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {stackGroups.map((stack) => (
            <PaperStack className={stack.className} key={stack.className} />
          ))}
        </div>

        <div className="relative z-10 flex w-full max-w-580 flex-col items-center gap-16 text-center">
          <h3 className="font-hanna text-[30px]/[41px] text-white sm:text-[43px]/[60px]">
            {t('banner.titlePrefix')} <br />
            {t('banner.titleSuffix')}
          </h3>
          <p className="text-[11px]/[16px] font-semibold text-[#8A8F98] sm:text-[17px]/[24px]">
            {t('banner.description')}
          </p>
        </div>

        <style>{`
          .banner-ascii-stack {
            position: absolute;
            width: 260px;
            height: 214px;
            opacity: 0.58;
            transform: rotate(-1.5deg);
          }

          .banner-ascii-stack--right {
            transform: rotate(-1.5deg);
          }

          .banner-ascii-stack--large {
            width: 286px;
            height: 232px;
          }

          .banner-ascii-stack--medium {
            width: 238px;
            height: 178px;
            opacity: 0.64;
          }

          .banner-ascii-stack--low {
            width: 230px;
            height: 112px;
            opacity: 0.5;
            transform: rotate(-1.5deg) scale(0.86);
          }

          @media (min-width: 1080px) {
            .banner-ascii-stack--desktop-left-main {
              top: -48px !important;
              width: 342px;
              height: 348px;
              opacity: 0.66;
            }

            .banner-ascii-stack--desktop-left-mid {
              top: 54px !important;
              width: 286px;
              height: 258px;
              opacity: 0.6;
            }

            .banner-ascii-stack--desktop-left-floor {
              top: 174px !important;
              width: 260px;
              height: 112px;
              opacity: 0.5;
              transform: rotate(-1.5deg) scale(0.82);
            }

            .banner-ascii-stack--desktop-left-main .banner-ascii-sheet {
              bottom: calc(var(--sheet-index) * 16px);
              height: 20px;
            }

            .banner-ascii-stack--desktop-left-mid .banner-ascii-sheet {
              bottom: calc(var(--sheet-index) * 13px);
            }

            .banner-ascii-stack--desktop-left-floor .banner-ascii-sheet {
              bottom: calc(var(--sheet-index) * 7px);
              height: 14px;
              width: calc(100% - 36px);
              opacity: 0.68;
            }

            .banner-ascii-stack--desktop-left-floor .banner-ascii-sheet:nth-child(n + 10) {
              display: none;
            }
          }

          .banner-ascii-stack--mobile-extra {
            display: none;
          }

          .banner-ascii-sheet {
            position: absolute;
            left: calc(var(--sheet-offset) + var(--sheet-index) * -0.6px);
            bottom: calc(var(--sheet-index) * 11px);
            width: calc(100% - 28px);
            height: 18px;
            opacity: 0;
            border: 1px dashed rgba(255, 255, 255, 0.88);
            background: #18191b;
            box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.08);
            transform: skewX(-4deg);
            animation: banner-sheet-stack 4.4s var(--sheet-delay) infinite;
          }

          .banner-ascii-sheet::before,
          .banner-ascii-sheet::after {
            content: "";
            position: absolute;
          }

          .banner-ascii-sheet::before {
            content: "////\\A////";
            right: -18px;
            top: 0;
            bottom: 0;
            width: 19px;
            box-sizing: border-box;
            border-top: 1px dashed rgba(255, 255, 255, 0.68);
            border-right: 1px dashed rgba(255, 255, 255, 0.56);
            border-bottom: 1px dashed rgba(255, 255, 255, 0.48);
            background:
              repeating-linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.09) 0 1px,
                transparent 1px 5px
              ),
              #18191b;
            clip-path: polygon(0 0, 100% 24%, 100% 100%, 0 76%);
            color: rgba(255, 255, 255, 0.5);
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 7px;
            font-weight: 600;
            letter-spacing: -2.8px;
            line-height: 0.9;
            overflow: hidden;
            padding-top: 1px;
            text-indent: -1px;
            transform-origin: left top;
            white-space: pre;
          }

          .banner-ascii-sheet::after {
            display: none;
          }

          @keyframes banner-sheet-stack {
            0% {
              opacity: 0;
              transform: translate3d(22px, -14px, 0);
            }
            12%,
            76% {
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
              width: 204px;
              height: 156px;
              opacity: 0.46;
              transform: rotate(-2deg) scale(0.74);
            }

            .banner-ascii-stack--large {
              top: 74px !important;
            }

            .banner-ascii-stack--mobile-extra {
              display: none;
            }

            .banner-ascii-stack--mobile-left-low {
              left: 42px;
              top: 124px;
              width: 176px;
              height: 118px;
              opacity: 0.58;
              transform: rotate(-2deg) scale(0.62);
            }

            .banner-ascii-stack--mobile-left-floor {
              left: 124px;
              top: 144px;
              width: 160px;
              height: 90px;
              opacity: 0.52;
              transform: rotate(-2deg) scale(0.54);
            }

            .banner-ascii-stack--right {
              transform: rotate(-2deg) scale(0.74);
            }

            .banner-ascii-stack--mobile-right-floor {
              right: 32px;
              top: 140px;
              width: 172px;
              height: 100px;
              opacity: 0.52;
              transform: rotate(-2deg) scale(0.58);
            }

            .banner-ascii-sheet {
              bottom: calc(var(--sheet-index) * 7px);
              height: 13px;
              animation-duration: 4.4s;
              animation-timing-function: linear;
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
