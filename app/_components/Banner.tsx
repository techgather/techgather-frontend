'use client';

import { useI18n } from '@/app/i18n/I18nProvider';
import { useSelectedLayoutSegments } from 'next/navigation';
import type { CSSProperties } from 'react';

const bannerLightControls = {
  mint: '#11FFB7',
  duration: '5.8s',
  easing: 'ease-in-out',
  smallDelay: '1.35s',
  overlayOpacity: 0.4,
  columnContrast: 1.12,
  glowIntensity: 1.18,
};

const bannerLightStyle = {
  '--banner-mint': bannerLightControls.mint,
  '--banner-duration': bannerLightControls.duration,
  '--banner-easing': bannerLightControls.easing,
  '--banner-small-delay': bannerLightControls.smallDelay,
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
          <div className="banner-light-sweep banner-light-sweep--large" />
          <div className="banner-light-sweep banner-light-sweep--small" />
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
                ellipse at 88% 118%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(22% * var(--banner-glow-intensity)),
                  transparent
                ),
                transparent 38%
              ),
              radial-gradient(
                ellipse at 26% 18%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(10% * var(--banner-glow-intensity)),
                  transparent
                ),
                transparent 30%
              ),
              linear-gradient(90deg, #000000 0%, #030504 30%, #07100d 54%, #000000 100%);
          }

          .banner-light-background > *,
          .banner-light-background::before {
            position: absolute;
          }

          .banner-light-background::before {
            content: "";
            inset: -20%;
            background:
              radial-gradient(
                ellipse at 64% 48%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(26% * var(--banner-glow-intensity)),
                  transparent
                ),
                transparent 52%
              ),
              radial-gradient(
                ellipse at 76% 96%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(20% * var(--banner-glow-intensity)),
                  transparent
                ),
                transparent 38%
              );
            filter: blur(18px);
            opacity: 0.72;
          }

          .banner-light-columns {
            inset: -20px -60px;
            background:
              linear-gradient(
                180deg,
                rgba(255, 255, 255, 0.12) 0%,
                rgba(255, 255, 255, 0.03) 28%,
                rgba(0, 0, 0, 0.24) 100%
              ),
              linear-gradient(
                90deg,
                rgba(0, 0, 0, 0.98) 0%,
                rgba(0, 0, 0, 0.42) 20%,
                rgba(0, 0, 0, 0.04) 50%,
                rgba(0, 0, 0, 0.5) 84%,
                rgba(0, 0, 0, 0.98) 100%
              ),
              repeating-linear-gradient(
                90deg,
                rgba(0, 0, 0, 0.88) 0 10px,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(16% * var(--banner-column-contrast)),
                  transparent
                ) 10px 44px,
                rgba(255, 255, 255, 0.13) 44px 48px,
                rgba(0, 0, 0, 0.62) 48px 58px,
                rgba(0, 0, 0, 0.96) 58px 68px
              ),
              repeating-linear-gradient(
                90deg,
                rgba(0, 0, 0, 0.5) 0 2px,
                transparent 2px 34px,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(8% * var(--banner-column-contrast)),
                  transparent
                ) 34px 37px,
                transparent 37px 68px
              );
            opacity: 0.76;
          }

          .banner-light-sweep,
          .banner-light-focus {
            position: absolute;
            inset: -38% -32%;
            mix-blend-mode: screen;
            will-change: opacity, transform;
          }

          .banner-light-sweep {
            filter: blur(14px);
            animation: banner-light-gather var(--banner-duration) var(--banner-easing) infinite alternate;
          }

          .banner-light-sweep--large {
            inset: -42% -24%;
            background:
              radial-gradient(
                ellipse at 48% 54%,
                rgba(226, 255, 247, calc(1 * var(--banner-glow-intensity))) 0%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(96% * var(--banner-glow-intensity)),
                  transparent
                ) 18%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(74% * var(--banner-glow-intensity)),
                  transparent
                ) 42%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(30% * var(--banner-glow-intensity)),
                  transparent
                ) 68%,
                transparent 84%
              );
            filter: blur(20px);
          }

          .banner-light-sweep--small {
            inset: -42% -42%;
            background:
              radial-gradient(
                ellipse at 50% 84%,
                rgba(226, 255, 247, calc(0.8 * var(--banner-glow-intensity))) 0%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(70% * var(--banner-glow-intensity)),
                  transparent
                ) 14%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(42% * var(--banner-glow-intensity)),
                  transparent
                ) 34%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(14% * var(--banner-glow-intensity)),
                  transparent
                ) 54%,
                transparent 72%
              );
            filter: blur(16px);
            animation-name: banner-light-gather-small;
            animation-delay: var(--banner-small-delay);
          }

          .banner-light-focus {
            background:
              radial-gradient(
                ellipse at 50% 58%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(86% * var(--banner-glow-intensity)),
                  transparent
                ) 0%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(48% * var(--banner-glow-intensity)),
                  transparent
                ) 30%,
                transparent 68%
              );
            filter: blur(38px);
            animation: banner-light-focus var(--banner-duration) var(--banner-easing) infinite alternate;
          }

          .banner-dark-overlay {
            inset: 0;
            background:
              linear-gradient(
                90deg,
                rgba(0, 0, 0, 0.98) 0%,
                rgba(0, 0, 0, 0.76) 13%,
                rgba(0, 0, 0, 0.12) 34%,
                rgba(0, 0, 0, 0.12) 63%,
                rgba(0, 0, 0, 0.78) 88%,
                rgba(0, 0, 0, 0.98) 100%
              ),
              radial-gradient(
                ellipse at 10% 50%,
                rgba(0, 0, 0, 0.9),
                transparent 36%
              ),
              radial-gradient(
                ellipse at 92% 42%,
                rgba(0, 0, 0, 0.78),
                transparent 34%
              ),
              rgba(0, 0, 0, var(--banner-overlay-opacity));
          }

          @keyframes banner-light-gather {
            0% {
              opacity: 0.14;
              transform: translate3d(-46%, -4%, 0) scaleX(0.34) scaleY(1.18);
            }
            22% {
              opacity: 0.82;
              transform: translate3d(-20%, -2%, 0) scaleX(0.82) scaleY(1.1);
            }
            48% {
              opacity: 0.98;
              transform: translate3d(14%, 0, 0) scaleX(1.08) scaleY(1.08);
            }
            72% {
              opacity: 0.72;
              transform: translate3d(34%, 4%, 0) scaleX(0.78) scaleY(1.14);
            }
            100% {
              opacity: 0.16;
              transform: translate3d(50%, 8%, 0) scaleX(0.36) scaleY(1.24);
            }
          }

          @keyframes banner-light-focus {
            0%,
            100% {
              opacity: 0.08;
              transform: translate3d(-34%, 16%, 0) scale(0.72);
            }
            38% {
              opacity: 0.42;
              transform: translate3d(0%, 2%, 0) scale(1.2);
            }
            58% {
              opacity: 0.68;
              transform: translate3d(26%, 8%, 0) scale(1.04);
            }
            74% {
              opacity: 0.34;
              transform: translate3d(42%, 10%, 0) scale(0.82);
            }
          }

          @keyframes banner-light-gather-small {
            0% {
              opacity: 0;
              transform: translate3d(-48%, 18%, 0) scaleX(0.18) scaleY(0.72);
            }
            20% {
              opacity: 0.42;
              transform: translate3d(-24%, 16%, 0) scaleX(0.46) scaleY(0.82);
            }
            48% {
              opacity: 0.72;
              transform: translate3d(10%, 14%, 0) scaleX(0.58) scaleY(0.9);
            }
            74% {
              opacity: 0.46;
              transform: translate3d(34%, 12%, 0) scaleX(0.34) scaleY(0.98);
            }
            100% {
              opacity: 0;
              transform: translate3d(52%, 10%, 0) scaleX(0.16) scaleY(1.04);
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

            .banner-light-sweep--large {
              inset: -46% -72%;
            }

            .banner-light-sweep--small {
              inset: -38% -78%;
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
