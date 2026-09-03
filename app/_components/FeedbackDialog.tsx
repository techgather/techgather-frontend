'use client';

import { useI18n } from '@/app/i18n/I18nProvider';
import { createFeedback } from '@/app/service/client';
import DefaultDropdown from '@/components/dropdown/DefaultDropdown';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import FeedbackIcon from '@/public/icons/feedback-icon.svg';
import {
  CreateFeedbackRequestCategoryEnum,
  type CreateFeedbackRequestCategoryEnum as FeedbackCategory,
} from '@/types/api';
import { CheckCircle2Icon, ChevronDownIcon, XIcon } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

const MAX_CONTENT_LENGTH = 400;

interface Props {
  variant?: 'desktop' | 'mobile';
  onOpen?: () => void;
}

const FeedbackDialog = ({ variant = 'desktop', onOpen }: Props) => {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<FeedbackCategory>();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const feedbackCategories: Array<{
    label: string;
    value: FeedbackCategory;
  }> = [
    {
      label: t('feedback.category.bug'),
      value: CreateFeedbackRequestCategoryEnum.Bug,
    },
    {
      label: t('feedback.category.content'),
      value: CreateFeedbackRequestCategoryEnum.Content,
    },
    {
      label: t('feedback.category.feature'),
      value: CreateFeedbackRequestCategoryEnum.Feature,
    },
    {
      label: t('feedback.category.ux'),
      value: CreateFeedbackRequestCategoryEnum.Ux,
    },
    {
      label: t('feedback.category.etc'),
      value: CreateFeedbackRequestCategoryEnum.Etc,
    },
  ];

  const selectedCategory = feedbackCategories.find(
    (item) => item.value === category
  );
  const canSubmit = Boolean(category && content.trim()) && !isSubmitting;

  const resetForm = () => {
    setCategory(undefined);
    setContent('');
    setIsSubmitting(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) onOpen?.();
    if (!open) resetForm();
  };

  useEffect(() => {
    if (!showSuccessToast) return;

    const timer = window.setTimeout(() => setShowSuccessToast(false), 3000);
    return () => window.clearTimeout(timer);
  }, [showSuccessToast]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedContent = content.trim();
    if (!category || !trimmedContent || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await createFeedback({ category, content: trimmedContent });
      setIsOpen(false);
      resetForm();
      setShowSuccessToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button
            type="button"
            className={cn(
              variant === 'desktop' &&
                'bg-gray_50 hover:bg-gray_60 hidden h-32 items-center gap-4 px-10 py-6 text-[13px] md:flex',
              variant === 'mobile' &&
                'text-gray_5 bg-gray_70 flex h-46 w-full items-center justify-start gap-8 rounded-lg px-12 text-[16px] leading-22 transition-colors duration-150 md:hidden'
            )}
          >
            <FeedbackIcon
              className={cn(
                'block shrink-0 overflow-visible',
                variant === 'desktop' ? 'size-16' : 'size-20'
              )}
            />
            {t('feedback.button')}
          </Button>
        </DialogTrigger>

        <DialogContent
          showCloseButton={false}
          aria-describedby={undefined}
          className="rounded-12 w-[calc(100%-32px)] max-w-400 gap-0 border-none bg-white px-28 py-24 shadow-none"
        >
          <DialogHeader className="mb-28 flex-row items-center justify-between text-left">
            <DialogTitle className="text-gray_90 text-[18px] leading-24 font-semibold">
              {t('feedback.title')}
            </DialogTitle>
            <DialogClose asChild>
              <button
                type="button"
                aria-label={t('feedback.close')}
                className="text-gray_90 flex size-24 cursor-pointer items-center justify-center"
              >
                <XIcon className="size-24" />
              </button>
            </DialogClose>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <DefaultDropdown
              dropdownitems={feedbackCategories}
              onValueChange={setCategory}
              trigger={
                <button
                  type="button"
                  className="border-gray_5 text-gray_90 hover:border-gray_10 focus-visible:border-gray_20 flex h-34 w-full cursor-pointer items-center justify-between rounded-md border bg-white px-12 text-[13px] transition-colors outline-none data-[state=open]:[&>svg]:rotate-180"
                >
                  <span className={selectedCategory ? '' : 'text-gray_10'}>
                    {selectedCategory?.label ??
                      t('feedback.category.placeholder')}
                  </span>
                  <ChevronDownIcon className="text-gray_20 size-16 transition-transform duration-200" />
                </button>
              }
            />

            <div className="border-gray_5 focus-within:border-gray_20 mt-24 flex h-148 flex-col rounded-md border bg-white px-12 py-12 transition-colors">
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                maxLength={MAX_CONTENT_LENGTH}
                aria-label={t('feedback.contentLabel')}
                placeholder={t('feedback.contentPlaceholder')}
                className="text-gray_90 placeholder:text-gray_10 min-h-0 flex-1 resize-none bg-transparent text-[13px] leading-20 outline-none"
              />
              <span className="text-gray_10 self-end text-[12px] leading-16">
                {content.length}/{MAX_CONTENT_LENGTH}
                {t('feedback.characterUnit')}
              </span>
            </div>

            <Button
              type="submit"
              disabled={!canSubmit}
              className="mt-24 h-44 w-full rounded-md text-[14px] disabled:bg-[#b8bdc3] disabled:text-white disabled:opacity-100"
            >
              {isSubmitting ? t('feedback.submitting') : t('feedback.submit')}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {showSuccessToast && (
        <div
          role="status"
          aria-live="polite"
          className="bg-gray_80 fixed bottom-32 left-1/2 z-100 flex -translate-x-1/2 items-center gap-8 rounded-md px-16 py-12 text-[14px] whitespace-nowrap text-white shadow-lg"
        >
          <CheckCircle2Icon className="text-main size-18" />
          {t('feedback.success')}
        </div>
      )}
    </>
  );
};

export default FeedbackDialog;
