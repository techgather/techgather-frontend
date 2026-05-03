export const SITE_MAP = {
  banksalad: {
    label: '뱅크샐러드',
    icon: '/icons/site/banksalad-img.svg',
  },
  coupang: {
    label: '쿠팡',
    icon: '/icons/site/coupang-img.svg',
  },
  daangn: {
    label: '당근',
    icon: '/icons/site/daangn-img.svg',
  },
  devsisters: {
    label: '데브시스터즈',
    icon: '/icons/site/devsisters-img.svg',
  },
  gaeraeblog: {
    label: '개발자스럽다',
    icon: '/icons/site/gaeraeblog-img.png',
  },
  hyperconnect: {
    label: '하이퍼커넥트',
    icon: '/icons/site/hyperconnect-img.webp',
  },
  kakao: {
    label: '카카오',
    icon: '/icons/site/kakao-img.svg',
  },
  kurly: {
    label: '컬리',
    icon: '/icons/site/kurly-img.svg',
  },
  line: {
    label: '라인',
    icon: '/icons/site/line-img.svg',
  },
  musinsa: {
    label: '무신사',
    icon: '/icons/site/musinsa-img.svg',
  },
  naver: {
    label: '네이버',
    icon: '/icons/site/naver-img.svg',
  },
  nhn: {
    label: 'NHN',
    icon: '/icons/site/nhn-img.svg',
  },
  socar: {
    label: '쏘카',
    icon: '/icons/site/socar-img.svg',
  },
  toss: {
    label: '토스',
    icon: '/icons/site/toss-img.svg',
  },
  watcha: {
    label: '왓챠',
    icon: '/icons/site/watcha-img.svg',
  },
  yogiyo: {
    label: '요기요',
    icon: '/icons/site/yogiyo-img.svg',
  },
  zigbang: {
    label: '직방',
    icon: '/icons/site/zigbang-img.svg',
  },
  woowahan: {
    label: '우아한형제들',
    icon: '/icons/site/woowahan-img.svg',
  },
  'kakao-pay': {
    label: '카카오페이',
    icon: '/icons/site/kakaopay-img.svg',
  },
  gccompany: {
    label: '여기어때',
    icon: '/icons/site/yeogi-img.svg',
  },
  oliveyoung: {
    label: '올리브영',
    icon: '/icons/site/olive-img.svg',
  },
} as const;

export type Site = keyof typeof SITE_MAP;
