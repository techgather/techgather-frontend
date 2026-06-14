import { TranslationKey } from '../i18n/dictionaries';
import { ADMIN_TABS } from './tab';

export const AdminMenuType = {
  MyPage: 'mypage',
  Logout: 'logout',
} as const;

export type AdminMenuType = (typeof AdminMenuType)[keyof typeof AdminMenuType];

export const ADMIN_MOBILE_MENU = [
  ...ADMIN_TABS,
  { label: '내정보', labelKey: 'admin.myPage', value: AdminMenuType.MyPage },
  { label: '로그아웃', labelKey: 'admin.logout', value: AdminMenuType.Logout },
] satisfies {
  label: string;
  labelKey: TranslationKey;
  value: AdminMenuType | (typeof ADMIN_TABS)[number]['value'];
}[];
