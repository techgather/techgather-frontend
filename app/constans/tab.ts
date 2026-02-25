export const SelectOptionType = {
  All: 'all',
  Domestic: 'domestic',
  Global: 'global',
} as const;

export type SelectOptionType =
  (typeof SelectOptionType)[keyof typeof SelectOptionType];

export const TABS = [
  { label: '전체', value: SelectOptionType.All },
  { label: '국내', value: SelectOptionType.Domestic },
  { label: '해외', value: SelectOptionType.Global },
];

export const AdminTabType = {
  All: 'all',
  Deleted: 'deleted',
  Accepted: 'accepted',
} as const;

export type AdminTabType = (typeof AdminTabType)[keyof typeof AdminTabType];

export const ADMIN_TABS = [
  { label: '대기중인 게시물', value: AdminTabType.All },
  { label: '삭제한 게시물', value: AdminTabType.Deleted },
  { label: '합격된 게시물', value: AdminTabType.Accepted },
];
