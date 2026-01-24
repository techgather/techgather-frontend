'use client';

import { ADMIN_TABS, AdminTabType } from '@/app/constans/tab';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Props {
  currentOption: AdminTabType;
  handleClick: (option: AdminTabType) => void;
}

const Tab = ({ currentOption, handleClick }: Props) => {
  return (
    <div role="tablist" className="relative inline-flex rounded-md p-4">
      {ADMIN_TABS.map((item) => {
        const isActive = currentOption === item.value;

        return (
          <button
            key={item.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => handleClick(item.value)}
            className={cn(
              'relative z-10 h-26 w-128 cursor-pointer rounded-sm px-12 py-4 text-sm leading-18 transition-colors duration-200',
              'text-gray_15',
              isActive && 'font-bold text-white'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="bg-gray_70 absolute inset-0 z-0 rounded-sm shadow-sm"
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

export default Tab;
