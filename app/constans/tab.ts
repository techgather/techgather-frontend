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
