'use client';

import { useI18n } from '@/app/i18n/I18nProvider';
import { useSelectedLayoutSegments } from 'next/navigation';
import type { CSSProperties } from 'react';

const bannerLightControls = {
  mint: '#11FFB7',
  purple: '#6F21FF',
  duration: '4.8s',
  easing: 'cubic-bezier(0.72, 0, 0.18, 1)',
  overlayOpacity: 0.5,
  glowIntensity: 0.92,
};

const bannerLightStyle = {
  '--banner-mint': bannerLightControls.mint,
  '--banner-purple': bannerLightControls.purple,
  '--banner-duration': bannerLightControls.duration,
  '--banner-easing': bannerLightControls.easing,
  '--banner-overlay-opacity': bannerLightControls.overlayOpacity,
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
                ellipse at 16% 100%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(22% * var(--banner-glow-intensity)),
                  transparent
                ),
                transparent 42%
              ),
              linear-gradient(90deg, #000000 0%, #020202 40%, #07100d 100%);
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
                  var(--banner-purple) calc(24% * var(--banner-glow-intensity)),
                  transparent
                ),
                transparent 38%
              ),
              radial-gradient(
                ellipse at 34% 76%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(20% * var(--banner-glow-intensity)),
                  transparent
                ),
                transparent 32%
              );
            filter: blur(12px);
            opacity: 0.78;
          }

          .banner-light-columns {
            position: absolute;
            inset: -20px -60px;
            background:
              linear-gradient(
                90deg,
                rgba(0, 0, 0, 0.96) 0%,
                rgba(0, 0, 0, 0.56) 46%,
                rgba(0, 0, 0, 0.24) 100%
              ),
              repeating-linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.08) 0 13px,
                rgba(0, 0, 0, 0.58) 13px 25px,
                color-mix(in srgb, var(--banner-purple) 16%, transparent) 25px
                  29px
              );
            opacity: 0.88;
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
                ellipse at 50% 70%,
                rgba(245, 255, 251, 0.96) 0%,
                color-mix(in srgb, var(--banner-mint) 92%, white 8%) 10%,
                var(--banner-mint) 21%,
                var(--banner-purple) 46%,
                color-mix(in srgb, var(--banner-purple) 46%, transparent) 58%,
                transparent 75%
              );
            filter: blur(10px);
            opacity: 0.95;
            animation: banner-light-gather var(--banner-duration)
              var(--banner-easing) infinite alternate;
          }

          .banner-light-focus {
            background:
              radial-gradient(
                ellipse at 50% 60%,
                color-mix(in srgb, var(--banner-mint) 86%, white 14%) 0%,
                var(--banner-mint) 18%,
                var(--banner-purple) 44%,
                transparent 62%
              );
            filter: blur(20px);
            opacity: 0.84;
            animation: banner-light-focus var(--banner-duration)
              var(--banner-easing) infinite alternate;
          }

          .banner-dark-overlay {
            position: absolute;
            inset: 0;
            background:
              radial-gradient(
                ellipse at center,
                rgba(0, 0, 0, 0.3) 0%,
                rgba(0, 0, 0, 0.18) 38%,
                rgba(0, 0, 0, 0.62) 100%
              ),
              rgba(0, 0, 0, var(--banner-overlay-opacity));
          }

          @keyframes banner-light-gather {
            0% {
              opacity: 0.38;
              transform: translate3d(-46%, 9%, 0) scaleX(0.34) scaleY(0.86);
            }
            18% {
              opacity: 1;
              transform: translate3d(-30%, 7%, 0) scaleX(0.72) scaleY(0.94);
            }
            50% {
              opacity: 0.96;
              transform: translate3d(0%, 4%, 0) scaleX(1.05) scaleY(1);
            }
            82% {
              opacity: 1;
              transform: translate3d(30%, 2%, 0) scaleX(0.68) scaleY(1.06);
            }
            100% {
              opacity: 0.38;
              transform: translate3d(46%, 0, 0) scaleX(0.32) scaleY(1.12);
            }
          }

          @keyframes banner-light-focus {
            0%,
            100% {
              opacity: 0.26;
              transform: translate3d(-40%, 12%, 0) scale(0.6);
            }
            32% {
              opacity: 0.72;
              transform: translate3d(-12%, 6%, 0) scale(0.94);
            }
            62% {
              opacity: 0.92;
              transform: translate3d(24%, 0, 0) scale(0.82);
            }
            82% {
              opacity: 0.62;
              transform: translate3d(38%, -2%, 0) scale(0.56);
            }
          }

          @media (max-width: 549px) {
            .banner-light-columns {
              inset: -12px -44px;
              background:
                linear-gradient(
                  90deg,
                  rgba(0, 0, 0, 0.9) 0%,
                  rgba(0, 0, 0, 0.52) 46%,
                  rgba(0, 0, 0, 0.18) 100%
                ),
                repeating-linear-gradient(
                  90deg,
                  rgba(255, 255, 255, 0.07) 0 9px,
                  rgba(0, 0, 0, 0.5) 9px 17px,
                  color-mix(in srgb, var(--banner-purple) 16%, transparent) 17px
                    20px
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
