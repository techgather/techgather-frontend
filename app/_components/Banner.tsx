'use client';

import { useI18n } from '@/app/i18n/I18nProvider';
import { useSelectedLayoutSegments } from 'next/navigation';

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
        <div className="banner-light-background" aria-hidden="true">
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
          <p className="text-[14px]/[19px] font-semibold text-[#8A8F98] sm:text-[20px]/[27px]">
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
                rgba(17, 255, 183, 0.18),
                rgba(17, 255, 183, 0) 44%
              ),
              linear-gradient(90deg, #010302 0%, #07100d 42%, #10221c 100%);
          }

          .banner-light-background::before {
            content: "";
            position: absolute;
            inset: -20%;
            background:
              radial-gradient(
                ellipse at 72% 54%,
                rgba(17, 255, 183, 0.28),
                rgba(17, 255, 183, 0) 42%
              ),
              radial-gradient(
                ellipse at 34% 76%,
                rgba(17, 255, 183, 0.2),
                rgba(17, 255, 183, 0) 34%
              );
            filter: blur(18px);
            opacity: 0.65;
          }

          .banner-light-columns {
            position: absolute;
            inset: -20px -60px;
            background:
              linear-gradient(
                90deg,
                rgba(0, 0, 0, 0.82) 0%,
                rgba(0, 0, 0, 0.28) 44%,
                rgba(17, 255, 183, 0.06) 100%
              ),
              repeating-linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.055) 0 15px,
                rgba(0, 0, 0, 0.34) 15px 27px,
                rgba(17, 255, 183, 0.08) 27px 31px
              );
            opacity: 0.74;
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
                rgba(220, 255, 244, 0.92) 0%,
                rgba(17, 255, 183, 0.72) 15%,
                rgba(17, 255, 183, 0.42) 34%,
                rgba(17, 255, 183, 0.12) 56%,
                rgba(17, 255, 183, 0) 74%
              );
            filter: blur(18px);
            animation: banner-light-gather 5.8s ease-in-out infinite;
          }

          .banner-light-focus {
            background:
              radial-gradient(
                ellipse at 50% 62%,
                rgba(17, 255, 183, 0.82) 0%,
                rgba(17, 255, 183, 0.42) 22%,
                rgba(17, 255, 183, 0) 58%
              );
            filter: blur(34px);
            animation: banner-light-focus 5.8s ease-in-out infinite;
          }

          .banner-dark-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.4);
          }

          @keyframes banner-light-gather {
            0% {
              opacity: 0;
              transform: translate3d(-42%, 12%, 0) scaleX(0.42) scaleY(0.74);
            }
            22% {
              opacity: 0.74;
              transform: translate3d(-18%, 8%, 0) scaleX(0.82) scaleY(0.88);
            }
            48% {
              opacity: 0.92;
              transform: translate3d(18%, 4%, 0) scaleX(0.55) scaleY(1);
            }
            66% {
              opacity: 0.46;
              transform: translate3d(34%, 2%, 0) scaleX(0.28) scaleY(1.05);
            }
            100% {
              opacity: 0;
              transform: translate3d(48%, 0, 0) scaleX(0.16) scaleY(1.12);
            }
          }

          @keyframes banner-light-focus {
            0%,
            100% {
              opacity: 0;
              transform: translate3d(-34%, 16%, 0) scale(0.72);
            }
            38% {
              opacity: 0.44;
              transform: translate3d(4%, 4%, 0) scale(1.06);
            }
            58% {
              opacity: 0.76;
              transform: translate3d(32%, 0, 0) scale(0.7);
            }
            74% {
              opacity: 0.2;
              transform: translate3d(44%, -2%, 0) scale(0.46);
            }
          }

          @media (max-width: 549px) {
            .banner-light-columns {
              inset: -12px -44px;
              background:
                linear-gradient(
                  90deg,
                  rgba(0, 0, 0, 0.78) 0%,
                  rgba(0, 0, 0, 0.36) 46%,
                  rgba(17, 255, 183, 0.06) 100%
                ),
                repeating-linear-gradient(
                  90deg,
                  rgba(255, 255, 255, 0.045) 0 10px,
                  rgba(0, 0, 0, 0.32) 10px 18px,
                  rgba(17, 255, 183, 0.08) 18px 21px
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
