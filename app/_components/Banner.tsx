'use client';

import { useI18n } from '@/app/i18n/I18nProvider';
import { useSelectedLayoutSegments } from 'next/navigation';
import type { CSSProperties } from 'react';

const bannerLightControls = {
  mint: '#11FFB7',
  duration: '5.8s',
  easing: 'ease-in-out',
  overlayOpacity: 0.4,
  columnContrast: 1.12,
  glowIntensity: 1,
};

const bannerLightStyle = {
  '--banner-mint': bannerLightControls.mint,
  '--banner-duration': bannerLightControls.duration,
  '--banner-easing': bannerLightControls.easing,
  '--banner-overlay-opacity': bannerLightControls.overlayOpacity,
  '--banner-column-contrast': bannerLightControls.columnContrast,
  '--banner-glow-intensity': bannerLightControls.glowIntensity,
} as CSSProperties;

const Banner = () => {
  const segments = useSelectedLayoutSegments();
  const { t } = useI18n();
  const isSearchPage = segments[0] === 'search';

  if (isSearchPage) {
    return null;
  }

  return (
    <section className="mt-52 flex w-full items-center justify-center overflow-hidden bg-[#050706]">
      <div className="relative flex min-h-248 w-full max-w-1440 items-center justify-center px-24 py-54 sm:min-h-302 sm:px-52 sm:py-72 lg:min-h-372">
        <div
          className="banner-light-background"
          style={bannerLightStyle}
          aria-hidden="true"
        >
          <div className="banner-light-columns" />
          <div className="banner-light-sweep" />
          <div className="banner-light-focus" />
          <div className="banner-dark-overlay" />
        </div>

        <div className="relative z-10 flex w-full max-w-580 flex-col items-center gap-20 text-center">
          <h3 className="font-hanna text-[30px]/[41px] text-white sm:text-[43px]/[60px]">
            {t('banner.titlePrefix')} <br />
            {t('banner.titleSuffix')}
          </h3>
          <p className="text-[13px]/[18px] font-semibold text-[#8A8F98] sm:text-[19px]/[26px]">
            {t('banner.description')}
          </p>
        </div>

        <style>{`
          .banner-light-background {
            position: absolute;
            inset: 0;
            overflow: hidden;
            background:
              radial-gradient(
                ellipse at 18% 104%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(20% * var(--banner-glow-intensity)),
                  transparent
                ),
                transparent 44%
              ),
              linear-gradient(90deg, #000000 0%, #050807 40%, #0a1713 100%);
          }

          .banner-light-background::before {
            content: "";
            position: absolute;
            inset: -20%;
            background:
              radial-gradient(
                ellipse at 72% 54%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(30% * var(--banner-glow-intensity)),
                  transparent
                ),
                transparent 42%
              ),
              radial-gradient(
                ellipse at 34% 76%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(22% * var(--banner-glow-intensity)),
                  transparent
                ),
                transparent 34%
              );
            filter: blur(16px);
            opacity: 0.72;
          }

          .banner-light-columns {
            position: absolute;
            inset: -20px -60px;
            background:
              linear-gradient(
                90deg,
                rgba(0, 0, 0, calc(0.94 * var(--banner-column-contrast))) 0%,
                rgba(0, 0, 0, 0.54) 38%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(12% * var(--banner-column-contrast)),
                  transparent
                ) 100%
              ),
              repeating-linear-gradient(
                90deg,
                rgba(0, 0, 0, 1) 0 18px,
                rgba(0, 0, 0, 0.1) 18px 25px,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(28% * var(--banner-column-contrast)),
                  transparent
                ) 25px 30px,
                rgba(0, 0, 0, 0.9) 30px 44px,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(16% * var(--banner-column-contrast)),
                  transparent
                ) 44px 50px
              );
            opacity: 0.92;
          }

          .banner-light-sweep,
          .banner-light-focus {
            position: absolute;
            inset: -38% -32%;
            mix-blend-mode: screen;
            will-change: opacity, transform;
          }

          .banner-light-sweep {
            background:
              radial-gradient(
                ellipse at 50% 74%,
                rgba(226, 255, 247, calc(0.96 * var(--banner-glow-intensity))) 0%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(84% * var(--banner-glow-intensity)),
                  transparent
                ) 15%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(50% * var(--banner-glow-intensity)),
                  transparent
                ) 34%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(16% * var(--banner-glow-intensity)),
                  transparent
                ) 56%,
                transparent 74%
              );
            filter: blur(14px);
            animation: banner-light-gather var(--banner-duration) var(--banner-easing) infinite alternate;
          }

          .banner-light-focus {
            background:
              radial-gradient(
                ellipse at 50% 62%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(92% * var(--banner-glow-intensity)),
                  transparent
                ) 0%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(50% * var(--banner-glow-intensity)),
                  transparent
                ) 22%,
                transparent 58%
              );
            filter: blur(28px);
            animation: banner-light-focus var(--banner-duration) var(--banner-easing) infinite alternate;
          }

          .banner-dark-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, var(--banner-overlay-opacity));
          }

          @keyframes banner-light-gather {
            0% {
              opacity: 0.08;
              transform: translate3d(-42%, 12%, 0) scaleX(0.42) scaleY(0.74);
            }
            22% {
              opacity: 0.78;
              transform: translate3d(-18%, 8%, 0) scaleX(0.82) scaleY(0.88);
            }
            48% {
              opacity: 0.98;
              transform: translate3d(18%, 4%, 0) scaleX(0.55) scaleY(1);
            }
            72% {
              opacity: 0.74;
              transform: translate3d(34%, 2%, 0) scaleX(0.36) scaleY(1.05);
            }
            100% {
              opacity: 0.12;
              transform: translate3d(48%, 0, 0) scaleX(0.18) scaleY(1.12);
            }
          }

          @keyframes banner-light-focus {
            0%,
            100% {
              opacity: 0.08;
              transform: translate3d(-34%, 16%, 0) scale(0.72);
            }
            38% {
              opacity: 0.5;
              transform: translate3d(4%, 4%, 0) scale(1.06);
            }
            58% {
              opacity: 0.82;
              transform: translate3d(32%, 0, 0) scale(0.7);
            }
            74% {
              opacity: 0.28;
              transform: translate3d(44%, -2%, 0) scale(0.46);
            }
          }

          @media (max-width: 549px) {
            .banner-light-columns {
              inset: -12px -44px;
              background:
                linear-gradient(
                  90deg,
                  rgba(0, 0, 0, 0.9) 0%,
                  rgba(0, 0, 0, 0.48) 46%,
                  color-mix(
                    in srgb,
                    var(--banner-mint) calc(12% * var(--banner-column-contrast)),
                    transparent
                  ) 100%
                ),
                repeating-linear-gradient(
                  90deg,
                  rgba(0, 0, 0, 1) 0 13px,
                  rgba(0, 0, 0, 0.1) 13px 18px,
                  color-mix(
                    in srgb,
                    var(--banner-mint) calc(26% * var(--banner-column-contrast)),
                    transparent
                  ) 18px 22px,
                  rgba(0, 0, 0, 0.9) 22px 34px,
                  color-mix(
                    in srgb,
                    var(--banner-mint) calc(15% * var(--banner-column-contrast)),
                    transparent
                  ) 34px 38px
                );
            }

            .banner-light-sweep {
              inset: -46% -72%;
            }

            .banner-light-focus {
              inset: -40% -68%;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .banner-light-sweep,
            .banner-light-focus {
              animation: none;
              opacity: 0.52;
              transform: translate3d(18%, 4%, 0) scaleX(0.72);
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Banner;
