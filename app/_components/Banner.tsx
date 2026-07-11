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
          <div className="banner-gradient-orb banner-gradient-orb--lime" />
          <div className="banner-gradient-orb banner-gradient-orb--teal" />
          <div className="banner-gradient-grain" />
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
                ellipse at 12% 100%,
                rgba(188, 255, 58, 0.26) 0%,
                rgba(72, 201, 85, 0.18) 28%,
                rgba(8, 42, 29, 0) 58%
              ),
              linear-gradient(135deg, #020403 0%, #07130d 44%, #020405 100%);
          }

          .banner-light-background::before {
            content: "";
            position: absolute;
            inset: -28%;
            background:
              radial-gradient(
                circle at 16% 78%,
                rgba(202, 255, 68, 0.86) 0%,
                rgba(95, 226, 94, 0.62) 17%,
                rgba(18, 167, 112, 0.28) 38%,
                rgba(0, 0, 0, 0) 62%
              ),
              radial-gradient(
                ellipse at 36% 88%,
                rgba(29, 196, 142, 0.34) 0%,
                rgba(18, 111, 91, 0.22) 34%,
                rgba(0, 0, 0, 0) 68%
              );
            filter: blur(18px);
            opacity: 0.92;
            animation: banner-gradient-drift 10s ease-in-out infinite;
          }

          .banner-gradient-orb {
            position: absolute;
            border-radius: 9999px;
            filter: blur(32px);
            mix-blend-mode: screen;
            will-change: opacity, transform;
          }

          .banner-gradient-orb--lime {
            left: -24%;
            bottom: -74%;
            width: 72%;
            height: 138%;
            background:
              radial-gradient(
                circle at 50% 50%,
                rgba(232, 255, 112, 0.96) 0%,
                rgba(171, 255, 54, 0.72) 22%,
                rgba(44, 209, 89, 0.36) 48%,
                rgba(44, 209, 89, 0) 72%
              );
            opacity: 0.78;
            animation: banner-gradient-lime 8.4s ease-in-out infinite;
          }

          .banner-gradient-orb--teal {
            left: 16%;
            bottom: -58%;
            width: 70%;
            height: 112%;
            background:
              radial-gradient(
                circle at 42% 52%,
                rgba(37, 255, 192, 0.46) 0%,
                rgba(25, 173, 140, 0.28) 32%,
                rgba(0, 44, 38, 0) 68%
              );
            opacity: 0.72;
            animation: banner-gradient-teal 11s ease-in-out infinite;
          }

          .banner-gradient-grain {
            position: absolute;
            inset: 0;
            background-image:
              radial-gradient(rgba(255, 255, 255, 0.08) 0.6px, transparent 0.8px),
              radial-gradient(rgba(0, 0, 0, 0.32) 0.7px, transparent 1px);
            background-position:
              0 0,
              7px 11px;
            background-size:
              13px 13px,
              17px 17px;
            opacity: 0.16;
            mix-blend-mode: overlay;
          }

          .banner-dark-overlay {
            position: absolute;
            inset: 0;
            background:
              radial-gradient(
                ellipse at center,
                rgba(0, 0, 0, 0.18) 0%,
                rgba(0, 0, 0, 0.32) 48%,
                rgba(0, 0, 0, 0.52) 100%
              ),
              rgba(0, 0, 0, 0.24);
          }

          @keyframes banner-gradient-drift {
            0%,
            100% {
              transform: translate3d(-3%, 1%, 0) scale(1);
            }
            50% {
              transform: translate3d(5%, -3%, 0) scale(1.08);
            }
          }

          @keyframes banner-gradient-lime {
            0%,
            100% {
              transform: translate3d(-2%, 4%, 0) scale(0.95);
              opacity: 0.68;
            }
            46% {
              transform: translate3d(8%, -6%, 0) scale(1.1);
              opacity: 0.88;
            }
          }

          @keyframes banner-gradient-teal {
            0%,
            100% {
              transform: translate3d(6%, 0, 0) scale(1);
              opacity: 0.58;
            }
            52% {
              transform: translate3d(-8%, -5%, 0) scale(1.08);
              opacity: 0.78;
            }
          }

          @media (max-width: 549px) {
            .banner-light-background::before {
              inset: -34% -42%;
            }

            .banner-gradient-orb--lime {
              left: -56%;
              bottom: -52%;
              width: 112%;
              height: 102%;
            }

            .banner-gradient-orb--teal {
              left: 5%;
              bottom: -42%;
              width: 110%;
              height: 86%;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .banner-light-background::before,
            .banner-gradient-orb {
              animation: none;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Banner;
