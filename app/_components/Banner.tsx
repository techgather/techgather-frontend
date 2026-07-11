'use client';

import { useI18n } from '@/app/i18n/I18nProvider';
import { useSelectedLayoutSegments } from 'next/navigation';
import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

const bannerLightControls = {
  mint: '#11FFB7',
  duration: '22s',
  easing: 'ease-in-out',
  overlayOpacity: 0.5,
  glowIntensity: 1,
  maxCursorOffset: 80,
};

const bannerLightStyle = {
  '--banner-mint': bannerLightControls.mint,
  '--banner-duration': bannerLightControls.duration,
  '--banner-easing': bannerLightControls.easing,
  '--banner-overlay-opacity': bannerLightControls.overlayOpacity,
  '--banner-glow-intensity': bannerLightControls.glowIntensity,
  '--cursor-x': '0px',
  '--cursor-y': '0px',
  '--cursor-rx': '0px',
  '--cursor-ry': '0px',
} as CSSProperties;

const Banner = () => {
  const segments = useSelectedLayoutSegments();
  const { t } = useI18n();
  const isSearchPage = segments[0] === 'search';
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const background = backgroundRef.current;

    if (!background) {
      return;
    }

    let frame = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const syncCursor = (event: PointerEvent) => {
      const rect = background.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

      targetX = Math.max(
        -bannerLightControls.maxCursorOffset,
        Math.min(bannerLightControls.maxCursorOffset, offsetX * 160),
      );
      targetY = Math.max(
        -bannerLightControls.maxCursorOffset * 0.45,
        Math.min(bannerLightControls.maxCursorOffset * 0.45, offsetY * 72),
      );
    };

    const resetCursor = () => {
      targetX = 0;
      targetY = 0;
    };

    const animateCursor = () => {
      currentX += (targetX - currentX) * 0.075;
      currentY += (targetY - currentY) * 0.075;
      background.style.setProperty('--cursor-x', `${currentX.toFixed(2)}px`);
      background.style.setProperty('--cursor-y', `${currentY.toFixed(2)}px`);
      background.style.setProperty('--cursor-rx', `${(-currentX * 0.18).toFixed(2)}px`);
      background.style.setProperty('--cursor-ry', `${(-currentY * 0.12).toFixed(2)}px`);
      frame = requestAnimationFrame(animateCursor);
    };

    frame = requestAnimationFrame(animateCursor);
    window.addEventListener('pointermove', syncCursor);
    window.addEventListener('pointerleave', resetCursor);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', syncCursor);
      window.removeEventListener('pointerleave', resetCursor);
    };
  }, []);

  if (isSearchPage) {
    return null;
  }

  return (
    <section className="mt-52 flex w-full items-center justify-center overflow-hidden bg-[#18191B]">
      <div className="relative flex min-h-248 w-full max-w-1440 items-center justify-center px-24 py-54 sm:min-h-302 sm:px-52 sm:py-72 lg:min-h-372">
        <div
          ref={backgroundRef}
          className="banner-optic-background"
          style={bannerLightStyle}
          aria-hidden="true"
        >
          <div className="banner-optic-ambient" />
          <div className="banner-optic-light-track">
            <div className="banner-optic-light" />
          </div>
          <div className="banner-optic-compressed-light" />
          <div className="banner-optic-blinds banner-optic-blinds--back" />
          <div className="banner-optic-blinds banner-optic-blinds--front" />
          <div className="banner-optic-refraction" />
          <div className="banner-optic-vignette" />
          <div className="banner-optic-overlay" />
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
          .banner-optic-background {
            position: absolute;
            inset: 0;
            overflow: hidden;
            isolation: isolate;
            background: #18191B;
            transform: translateZ(0);
          }

          .banner-optic-background > * {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }

          .banner-optic-ambient {
            background:
              radial-gradient(
                ellipse at 50% 50%,
                color-mix(
                  in srgb,
                  var(--banner-mint) calc(11% * var(--banner-glow-intensity)),
                  transparent
                ),
                transparent 58%
              ),
              linear-gradient(
                90deg,
                rgba(0, 0, 0, 0.64) 0%,
                transparent 36%,
                transparent 64%,
                rgba(0, 0, 0, 0.64) 100%
              );
            filter: blur(18px);
            opacity: 0.9;
          }

          .banner-optic-light-track {
            inset: -46% -30%;
            z-index: 1;
            animation: banner-light-drift var(--banner-duration) var(--banner-easing) infinite;
            transform: translate3d(-28%, 0, 0);
            will-change: transform;
          }

          .banner-optic-light {
            position: absolute;
            inset: 0;
            background:
              radial-gradient(
                ellipse at 50% 52%,
                rgba(235, 255, 249, 0.98) 0%,
                rgba(17, 255, 183, 0.82) 18%,
                rgba(17, 255, 183, 0.56) 38%,
                rgba(17, 255, 183, 0.24) 62%,
                transparent 82%
              );
            filter: blur(34px);
            opacity: 1;
            transform:
              translate3d(var(--cursor-x), var(--cursor-y), 0)
              scaleX(1.08)
              scaleY(1.36);
            transform-origin: center;
            will-change: transform;
          }

          .banner-optic-compressed-light {
            inset: -18% -14%;
            z-index: 2;
            background:
              repeating-linear-gradient(
                90deg,
                transparent 0 17px,
                rgba(17, 255, 183, 0.5) 17px 20px,
                rgba(235, 255, 249, 0.38) 20px 22px,
                rgba(17, 255, 183, 0.36) 22px 26px,
                transparent 26px 42px
              ),
              radial-gradient(
                ellipse at 50% 50%,
                rgba(17, 255, 183, 0.68),
                rgba(17, 255, 183, 0.32) 48%,
                transparent 76%
              );
            background-blend-mode: screen;
            filter: blur(11px);
            mix-blend-mode: screen;
            opacity: 0.98;
            mask-image: radial-gradient(ellipse at center, #000 0%, #000 54%, transparent 82%);
            transform:
              translate3d(var(--cursor-x), var(--cursor-y), 0)
              scaleY(1.18);
            animation: banner-compressed-drift var(--banner-duration) var(--banner-easing) infinite;
            will-change: transform, opacity;
          }

          .banner-optic-blinds {
            z-index: 3;
            inset: -4% -4%;
            transform: translate3d(0, 0, 0);
            will-change: transform, opacity;
          }

          .banner-optic-blinds--back {
            background:
              repeating-linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.045) 0 1px,
                rgba(255, 255, 255, 0.018) 1px 14px,
                rgba(0, 0, 0, 0.18) 14px 18px,
                rgba(0, 0, 0, 0.5) 18px 26px,
                rgba(255, 255, 255, 0.02) 26px 42px
              );
            opacity: 0.68;
            filter: blur(0.8px);
            animation: banner-blinds-breathe 16s ease-in-out infinite alternate;
          }

          .banner-optic-blinds--front {
            background:
              repeating-linear-gradient(
                90deg,
                rgba(0, 0, 0, 0.64) 0 10px,
                rgba(0, 0, 0, 0.2) 10px 17px,
                rgba(255, 255, 255, 0.055) 17px 19px,
                rgba(17, 255, 183, 0.1) 19px 23px,
                rgba(0, 0, 0, 0.32) 23px 42px
              );
            opacity: 0.76;
            mix-blend-mode: multiply;
            filter: blur(0.35px);
            animation: banner-blinds-parallax 20s ease-in-out infinite alternate;
          }

          .banner-optic-refraction {
            z-index: 4;
            inset: -30% -8%;
            background:
              repeating-linear-gradient(
                90deg,
                transparent 0 18px,
                rgba(255, 255, 255, 0.1) 18px 20px,
                rgba(17, 255, 183, 0.09) 20px 24px,
                transparent 24px 42px
              ),
              linear-gradient(
                180deg,
                rgba(255, 255, 255, 0.08) 0%,
                transparent 30%,
                rgba(0, 0, 0, 0.18) 100%
              );
            filter: blur(3px);
            mix-blend-mode: soft-light;
            opacity: 0.64;
            transform:
              translate3d(var(--cursor-rx), var(--cursor-ry), 0)
              scaleY(1.24);
            animation: banner-refraction-flow 18s ease-in-out infinite alternate;
            will-change: transform, opacity;
          }

          .banner-optic-vignette {
            z-index: 5;
            background:
              radial-gradient(
                ellipse at 50% 50%,
                transparent 0%,
                rgba(0, 0, 0, 0.08) 44%,
                rgba(0, 0, 0, 0.76) 100%
              ),
              linear-gradient(
                90deg,
                rgba(0, 0, 0, 0.96) 0%,
                rgba(0, 0, 0, 0.34) 20%,
                transparent 48%,
                rgba(0, 0, 0, 0.34) 80%,
                rgba(0, 0, 0, 0.96) 100%
              );
          }

          .banner-optic-overlay {
            z-index: 6;
            background: rgba(0, 0, 0, var(--banner-overlay-opacity));
          }

          @keyframes banner-light-drift {
            0% {
              transform: translate3d(-30%, 1%, 0);
            }
            25% {
              transform: translate3d(0%, -1%, 0);
            }
            50% {
              transform: translate3d(30%, 1.5%, 0);
            }
            75% {
              transform: translate3d(0%, -0.5%, 0);
            }
            100% {
              transform: translate3d(-30%, 1%, 0);
            }
          }

          @keyframes banner-compressed-drift {
            0% {
              opacity: 0.5;
              transform: translate3d(calc(-72px + var(--cursor-x)), var(--cursor-y), 0) scaleY(1.1);
            }
            25% {
              opacity: 0.78;
              transform: translate3d(var(--cursor-x), calc(var(--cursor-y) - 4px), 0) scaleY(1.2);
            }
            50% {
              opacity: 0.66;
              transform: translate3d(calc(72px + var(--cursor-x)), calc(var(--cursor-y) + 4px), 0) scaleY(1.26);
            }
            75% {
              opacity: 0.78;
              transform: translate3d(var(--cursor-x), calc(var(--cursor-y) - 2px), 0) scaleY(1.18);
            }
            100% {
              opacity: 0.5;
              transform: translate3d(calc(-72px + var(--cursor-x)), var(--cursor-y), 0) scaleY(1.1);
            }
          }

          @keyframes banner-blinds-breathe {
            from {
              transform: translate3d(-5px, 0, 0) scaleY(1.02);
              opacity: 0.58;
            }
            to {
              transform: translate3d(6px, 0, 0) scaleY(1.06);
              opacity: 0.74;
            }
          }

          @keyframes banner-blinds-parallax {
            from {
              transform: translate3d(4px, 0, 0);
            }
            to {
              transform: translate3d(-7px, 0, 0);
            }
          }

          @keyframes banner-refraction-flow {
            from {
              opacity: 0.48;
              transform:
                translate3d(calc(var(--cursor-rx) - 8px), var(--cursor-ry), 0)
                scaleY(1.2);
            }
            to {
              opacity: 0.7;
              transform:
                translate3d(calc(var(--cursor-rx) + 10px), var(--cursor-ry), 0)
                scaleY(1.28);
            }
          }

          @media (max-width: 549px) {
            .banner-optic-light-track {
              inset: -52% -72%;
            }

            .banner-optic-compressed-light {
              inset: -18% -36%;
              background:
                repeating-linear-gradient(
                  90deg,
                  transparent 0 13px,
                  rgba(17, 255, 183, 0.48) 13px 16px,
                  rgba(235, 255, 249, 0.34) 16px 18px,
                  rgba(17, 255, 183, 0.3) 18px 21px,
                  transparent 21px 34px
                ),
                radial-gradient(
                  ellipse at 50% 50%,
                  rgba(17, 255, 183, 0.62),
                  rgba(17, 255, 183, 0.28) 44%,
                  transparent 74%
                );
            }

            .banner-optic-blinds--back {
              background:
                repeating-linear-gradient(
                  90deg,
                  rgba(255, 255, 255, 0.04) 0 1px,
                  rgba(255, 255, 255, 0.016) 1px 10px,
                  rgba(0, 0, 0, 0.18) 10px 14px,
                  rgba(0, 0, 0, 0.5) 14px 21px,
                  rgba(255, 255, 255, 0.02) 21px 34px
                );
            }

            .banner-optic-blinds--front {
              background:
                repeating-linear-gradient(
                  90deg,
                  rgba(0, 0, 0, 0.64) 0 8px,
                  rgba(0, 0, 0, 0.2) 8px 13px,
                  rgba(255, 255, 255, 0.052) 13px 15px,
                  rgba(17, 255, 183, 0.1) 15px 18px,
                  rgba(0, 0, 0, 0.32) 18px 34px
                );
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .banner-optic-light-track,
            .banner-optic-compressed-light,
            .banner-optic-blinds,
            .banner-optic-refraction {
              animation: none;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Banner;
