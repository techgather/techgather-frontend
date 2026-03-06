'use client';

import { cn } from '@/lib/utils';
import { PostResponseLanguageEnum } from '@/types/api';
import { motion } from 'framer-motion';
import { TABS } from '../constans/tab';

interface Props {
  currentOption?: PostResponseLanguageEnum;
  handleClick: (option?: PostResponseLanguageEnum) => void;
}

const SelectOption = ({ currentOption, handleClick }: Props) => {
  return (
    <div
      role="tablist"
      className="bg-gray_3 relative flex gap-8 rounded-md p-4"
    >
      <button
        role="tab"
        aria-selected={currentOption === undefined}
        onClick={() => handleClick(undefined)}
        className={cn(
          'text-14 relative z-10 flex-1 cursor-pointer rounded-sm px-12 py-4 transition-colors duration-200',
          'text-gray_10 hover:text-gray_20',
          currentOption === undefined && 'text-gray_30'
        )}
      >
        {currentOption === undefined && (
          <motion.div
            layoutId="option-tab-indicator"
            className="absolute inset-0 z-0 rounded-sm bg-white shadow-sm"
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 40,
            }}
          />
        )}

        <span className="relative z-10">전체</span>
      </button>
      {TABS.map((item) => {
        const isActive = currentOption === item.value;

        return (
          <button
            key={item.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => handleClick(item.value)}
            className={cn(
              'text-14 relative z-10 flex-1 cursor-pointer rounded-sm px-12 py-4 transition-colors duration-200',
              'text-gray_10 hover:text-gray_20',
              isActive && 'text-gray_30'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="option-tab-indicator"
                className="absolute inset-0 z-0 rounded-sm bg-white shadow-sm"
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 40,
                }}
              />
            )}

            <span className="relative z-10">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SelectOption;
