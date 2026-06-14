'use client';

import { TABS } from '@/app/constans/tab';
import { useI18n } from '@/app/i18n/I18nProvider';
import { cn } from '@/lib/utils';
import { PostResponseLanguageEnum } from '@/types/api';
import { motion } from 'framer-motion';

interface Props {
  currentOption: PostResponseLanguageEnum;
  handleClick: (option: PostResponseLanguageEnum) => void;
}

const Tab = ({ currentOption, handleClick }: Props) => {
  const { t, locale } = useI18n();

  return (
    <div
      role="tablist"
      className="bg-gray_70 relative inline-flex h-30 rounded-md p-4"
    >
      {TABS.map((item) => {
        const isActive = currentOption === item.value;

        return (
          <button
            key={item.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => handleClick(item.value)}
            className={cn(
              'text-gray_10 relative z-10 flex h-full w-45 cursor-pointer items-center justify-center rounded-sm px-12 text-sm leading-18 text-nowrap transition-colors duration-200 sm:w-65',
              isActive && 'font-bold text-white',
              locale === 'en' && 'w-80 sm:w-100'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="admin-tab-indicator"
                className="bg-gray_40 absolute inset-0 z-0 rounded-sm shadow-sm"
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 40,
                }}
              />
            )}

            <span className="relative z-10">{t(item.labelKey)}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Tab;
