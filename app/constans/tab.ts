import {
  PostResponseLanguageEnum,
  UpdatePostsRequestStatusEnum,
} from '@/types/api';

export const SelectOptionType = {
  All: 'all',
  Domestic: 'domestic',
  Global: 'global',
} as const;

export type SelectOptionType =
  (typeof SelectOptionType)[keyof typeof SelectOptionType];

export const TABS = [
  { label: '국내', value: PostResponseLanguageEnum.Ko },
  { label: '해외', value: PostResponseLanguageEnum.En },
];

export const AdminTabType = {
  All: 'all',
  Deleted: 'deleted',
  Accepted: 'accepted',
  Hold: 'hold',
} as const;

export type AdminTabType = (typeof AdminTabType)[keyof typeof AdminTabType];

export const ADMIN_TABS = [
  { label: '수집된 게시물', value: UpdatePostsRequestStatusEnum.NotPublished },
  { label: '승인된 게시물', value: UpdatePostsRequestStatusEnum.Published },
  { label: '보류된 게시물', value: UpdatePostsRequestStatusEnum.OnHold },
  { label: '삭제된 게시물', value: UpdatePostsRequestStatusEnum.Discarded },
];
