'use client';

import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';
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
    <section className="mt-52 flex w-full items-center justify-center overflow-hidden bg-[#030504]">
      <div className="relative flex min-h-248 w-full max-w-1440 items-center justify-center overflow-hidden px-24 py-54 sm:min-h-302 sm:px-52 sm:py-72 lg:min-h-372">
        <div className="absolute inset-0" aria-hidden="true">
          <ShaderGradientCanvas
            className="h-full w-full"
            fov={45}
            pixelDensity={1}
            pointerEvents="none"
            style={{
              height: '100%',
              inset: 0,
              position: 'absolute',
              width: '100%',
            }}
          >
            <ShaderGradient
              animate="on"
              brightness={0.8}
              cAzimuthAngle={270}
              cDistance={0.5}
              cPolarAngle={180}
              cameraZoom={15.09}
              color1="#73bfc4"
              color2="#2fa876"
              color3="#8da0ce"
              envPreset="city"
              grain="on"
              lightType="env"
              positionX={-0.1}
              positionY={0}
              positionZ={0}
              range="disabled"
              rangeEnd={40}
              rangeStart={0}
              reflection={0.4}
              rotationX={0}
              rotationY={130}
              rotationZ={70}
              shader="defaults"
              type="sphere"
              uAmplitude={3.2}
              uDensity={0.8}
              uFrequency={5.5}
              uSpeed={0.3}
              uStrength={0.3}
              uTime={0}
              wireframe={false}
            />
          </ShaderGradientCanvas>
          <div className="absolute inset-0 bg-black/20" />
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
      </div>
    </section>
  );
};

export default Banner;
