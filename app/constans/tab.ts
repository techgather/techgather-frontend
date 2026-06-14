import { TranslationKey } from '@/app/i18n/dictionaries';
import {
  PostResponseLanguageEnum,
  UpdatePostsRequestStatusEnum,
} from '@/types/api';

export const SelectOptionType = {
  Domestic: 'domestic',
  Global: 'global',
} as const;

export type SelectOptionType =
  (typeof SelectOptionType)[keyof typeof SelectOptionType];

export const TABS = [
  {
    label: '국내',
    labelKey: 'postLanguage.domestic',
    value: PostResponseLanguageEnum.Ko,
  },
  {
    label: '해외',
    labelKey: 'postLanguage.global',
    value: PostResponseLanguageEnum.En,
  },
] satisfies {
  label: string;
  labelKey: TranslationKey;
  value: PostResponseLanguageEnum;
}[];

export const AdminTabType = {
  All: 'all',
  Deleted: 'deleted',
  Accepted: 'accepted',
  Hold: 'hold',
} as const;

export type AdminTabType = (typeof AdminTabType)[keyof typeof AdminTabType];

export const ADMIN_TABS = [
  {
    label: '수집된 게시물',
    labelKey: 'admin.tab.notPublished',
    value: UpdatePostsRequestStatusEnum.NotPublished,
  },
  {
    label: '승인된 게시물',
    labelKey: 'admin.tab.published',
    value: UpdatePostsRequestStatusEnum.Published,
  },
  {
    label: '보류된 게시물',
    labelKey: 'admin.tab.onHold',
    value: UpdatePostsRequestStatusEnum.OnHold,
  },
  {
    label: '삭제된 게시물',
    labelKey: 'admin.tab.discarded',
    value: UpdatePostsRequestStatusEnum.Discarded,
  },
] satisfies {
  label: string;
  labelKey: TranslationKey;
  value: UpdatePostsRequestStatusEnum;
}[];
