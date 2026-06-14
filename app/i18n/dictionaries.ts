import { Locale } from './config';

export const dictionaries = {
  ko: {
    'common.brand': 'DevPick(데브픽)',
    'common.brandShort': '데브픽 DevPick',
    'common.postThumbnailFallback': '블로그',
    'common.unknown': '알 수 없음',
    'common.noCategory': '카테고리 없음',
    'common.countUnit': '개',
    'common.privacyPolicy': '개인정보처리방침',
    'common.terms': '이용약관',
    'common.contact': '문의 sj07245@naver.com',

    'header.searchPlaceholder': '글 제목, 태그명 검색',
    'header.changeLocale': '서비스 언어 변경',

    'locale.ko': '한국어',
    'locale.en': 'English',

    'postLanguage.domestic': '국내',
    'postLanguage.global': '해외',

    'main.metadata.title': '최신 개발 아티클 모음',
    'main.metadata.description':
      '데브픽(DevPick)은 다양한 개발 블로그의 최신 글과 아티클을 한 곳에서 모아볼 수 있는 플랫폼입니다. 웹부터 AI까지 다양한 개발 콘텐츠를 빠르게 확인하세요.',
    'main.heading': '전체 아티클',

    'category.metadata.titleSuffix': '관련 글 모음',
    'category.metadata.descriptionPrefix':
      '관련 최신 개발 글과 아티클을 한 곳에서 확인하세요. 다양한 블로그 콘텐츠를 모아 제공합니다.',
    'category.headingSuffix': '관련 아티클',

    'search.metadata.titleSuffix': '검색 결과',
    'search.metadata.descriptionSuffix': '검색 결과 | DevPick(데브픽)',
    'search.metadata.keywordSuffix': '검색',
    'search.metadata.blogSuffix': '개발 블로그',
    'search.headingSuffix': '검색 결과',
    'search.empty': '검색 결과가 없어요.',

    'postList.title': '글 목록',
    'postList.sitePlaceholder': '테크 블로그 선택',
    'postList.all': '전체',
    'postList.empty': '아티클이 없어요.',
    'postList.srTitle': '포스트 리스트',

    'sideMenu.srTitle': '카테고리 리스트',

    'filter.title': '필터',
    'filter.topic': '글 주제',
    'filter.site': '테크 블로그 선택',
    'filter.apply': '적용',
    'filter.reset': '선택 초기화',

    'footer.logoAlt': '푸터 로고',
    'footer.description':
      '테크 블로그들의 최신 아티클을 현직 개발자가 직접 엄선하여 게재합니다',

    'login.title': '로그인',
    'login.google': '구글 계정으로 계속하기',
    'login.googleIconAlt': '구글 로그인 버튼 아이콘',

    'notFound.message': '잘못된 접근입니다',
    'notFound.home': '메인으로 이동',

    'image.logoAlt': 'header logo',
    'image.mobileMenuAlt': '모바일 메뉴 아이콘',
    'image.checkedAlt': '체크 아이콘',
    'image.uncheckedAlt': '체크 전 아이콘',
    'image.siteIconAlt': '아이콘',
    'image.thumbnailAlt': '포스트 썸네일',

    'admin.tab.notPublished': '수집된 게시물',
    'admin.tab.published': '승인된 게시물',
    'admin.tab.onHold': '보류된 게시물',
    'admin.tab.discarded': '삭제된 게시물',
    'admin.status.notPublished': '수집됨',
    'admin.status.published': '승인됨',
    'admin.status.onHold': '보류됨',
    'admin.status.discarded': '삭제됨',
    'admin.all': '전체',
    'admin.noCategoryOnly': '카테고리 없음만 보기',
    'admin.categorySelect': '카테고리 선택',
    'admin.selectedCountSuffix': '개 선택됨',
    'admin.status': '상태',
    'admin.select': '선택',
    'admin.category': '카테고리',
    'admin.reset': '초기화',
    'admin.updateCountSuffix': '개 수정',
    'admin.openPost': '바로가기',
    'admin.categoryAdd': '카테고리 추가',
    'admin.groupCreate': '그룹 생성',
    'admin.categoryCreate': '카테고리 생성',
    'admin.groupName': '그룹 이름',
    'admin.categoryName': '카테고리 이름',
    'admin.groupNamePlaceholder': '그룹 이름을 입력해주세요',
    'admin.categoryNamePlaceholder': '카테고리를 이름을 입력해주세요',
    'admin.slug': '경로',
    'admin.slugPlaceholder': '경로를 이름을 입력해주세요',
    'admin.description': '부가 설명',
    'admin.descriptionPlaceholder': '부가 설명을 이름을 입력해주세요',
    'admin.create': '생성하기',
    'admin.categoryUpdate': '카테고리 수정',
    'admin.update': '수정하기',
    'admin.myPage': '내정보',
    'admin.logout': '로그아웃',
  },
  en: {
    'common.brand': 'DevPick',
    'common.brandShort': 'DevPick',
    'common.postThumbnailFallback': 'blog',
    'common.unknown': 'Unknown',
    'common.noCategory': 'No category',
    'common.countUnit': '',
    'common.privacyPolicy': 'Privacy Policy',
    'common.terms': 'Terms of Service',
    'common.contact': 'Contact sj07245@naver.com',

    'header.searchPlaceholder': 'Search by title or tag',
    'header.changeLocale': 'Change service language',

    'locale.ko': 'Korean',
    'locale.en': 'English',

    'postLanguage.domestic': 'Domestic',
    'postLanguage.global': 'Overseas',

    'main.metadata.title': 'Latest Developer Articles',
    'main.metadata.description':
      'DevPick gathers the latest posts and articles from developer blogs in one place, from web development to AI.',
    'main.heading': 'All Articles',

    'category.metadata.titleSuffix': 'Articles',
    'category.metadata.descriptionPrefix':
      'Find the latest development posts and articles for this topic in one place.',
    'category.headingSuffix': 'Articles',

    'search.metadata.titleSuffix': 'Search Results',
    'search.metadata.descriptionSuffix': 'Search results | DevPick',
    'search.metadata.keywordSuffix': 'search',
    'search.metadata.blogSuffix': 'developer blog',
    'search.headingSuffix': 'Search Results',
    'search.empty': 'No search results.',

    'postList.title': 'Articles',
    'postList.sitePlaceholder': 'Select tech blogs',
    'postList.all': 'All',
    'postList.empty': 'No articles yet.',
    'postList.srTitle': 'Post list',

    'sideMenu.srTitle': 'Category list',

    'filter.title': 'Filter',
    'filter.topic': 'Topic',
    'filter.site': 'Tech blogs',
    'filter.apply': 'Apply',
    'filter.reset': 'Reset selection',

    'footer.logoAlt': 'Footer logo',
    'footer.description':
      'Curated latest articles from tech blogs, selected by working developers.',

    'login.title': 'Log in',
    'login.google': 'Continue with Google',
    'login.googleIconAlt': 'Google login button icon',

    'notFound.message': 'Invalid access',
    'notFound.home': 'Go to home',

    'image.logoAlt': 'header logo',
    'image.mobileMenuAlt': 'mobile menu icon',
    'image.checkedAlt': 'checked icon',
    'image.uncheckedAlt': 'unchecked icon',
    'image.siteIconAlt': 'icon',
    'image.thumbnailAlt': 'post thumbnail',

    'admin.tab.notPublished': 'Collected posts',
    'admin.tab.published': 'Approved posts',
    'admin.tab.onHold': 'On-hold posts',
    'admin.tab.discarded': 'Deleted posts',
    'admin.status.notPublished': 'Collected',
    'admin.status.published': 'Approved',
    'admin.status.onHold': 'On hold',
    'admin.status.discarded': 'Deleted',
    'admin.all': 'All',
    'admin.noCategoryOnly': 'Only uncategorized',
    'admin.categorySelect': 'Select category',
    'admin.selectedCountSuffix': ' selected',
    'admin.status': 'Status',
    'admin.select': 'Select',
    'admin.category': 'Category',
    'admin.reset': 'Reset',
    'admin.updateCountSuffix': ' update',
    'admin.openPost': 'Open',
    'admin.categoryAdd': 'Add category',
    'admin.groupCreate': 'Create group',
    'admin.categoryCreate': 'Create category',
    'admin.groupName': 'Group name',
    'admin.categoryName': 'Category name',
    'admin.groupNamePlaceholder': 'Enter group name',
    'admin.categoryNamePlaceholder': 'Enter category name',
    'admin.slug': 'Slug',
    'admin.slugPlaceholder': 'Enter slug',
    'admin.description': 'Description',
    'admin.descriptionPlaceholder': 'Enter description',
    'admin.create': 'Create',
    'admin.categoryUpdate': 'Edit category',
    'admin.update': 'Update',
    'admin.myPage': 'My page',
    'admin.logout': 'Log out',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type TranslationKey = keyof (typeof dictionaries)['ko'];

export const getDictionary = (locale: Locale) => dictionaries[locale];
