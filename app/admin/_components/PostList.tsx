'use client';

import { POST_STATUS } from '@/app/constans/dropdown';
import { getSiteInfo, Site } from '@/app/constans/site';
import { getSourceSite } from '@/app/service/client';
import CheckableDropdown from '@/components/dropdown/CheckableDropdown';
import DefaultDropdown from '@/components/dropdown/DefaultDropdown';
import AdminPostCard from '@/components/post/AdminPostCard';
import PostCardSkeleton from '@/components/post/PostCardSkeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import ChevronIcon from '@/public/icons/chevron-down.svg';
import SearchIcon from '@/public/icons/search.svg';
import {
  CategoryResponse,
  PostResponseLanguageEnum,
  UpdatePostsRequestStatusEnum,
} from '@/types/api';
import { Pencil } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import useAdminPostList from '../_hooks/useAdminPostList';
import useCategory from '../_hooks/useCategory';
import useDispatch from '../_hooks/useDispatch';
import useUpdatePostStatus from '../_hooks/useUpdatePostStatus';
import CreateCategoryDialog from './CreateCategoryDialog';
import UpdateCategoryDialog from './UpdateCategoryDialog';

const DEFAULT_GROUPID = '292680441089056769';
// const DEFAULT_GROUPID = '288314611504713729';

const LANGUAGE_OPTIONS = [
  { label: '국내', value: PostResponseLanguageEnum.Ko },
  { label: '해외', value: PostResponseLanguageEnum.En },
] as const;

const statusLabelMap: Record<UpdatePostsRequestStatusEnum, string> = {
  [UpdatePostsRequestStatusEnum.NotPublished]: '수집됨',
  [UpdatePostsRequestStatusEnum.Published]: '승인됨',
  [UpdatePostsRequestStatusEnum.OnHold]: '보류됨',
  [UpdatePostsRequestStatusEnum.Discarded]: '삭제됨',
};

interface Props {
  tab: UpdatePostsRequestStatusEnum;
}

const PostList = ({ tab }: Props) => {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const { language, setLanguage, searchCondition, setSearchCondition } =
    useDispatch();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isFetchingNextPage,
  } = useAdminPostList({ searchCondition, status: tab, language, limit: 18 });
  // const { data: categoryGroup } = useCategoryGroup();
  const [selectStatus, setSelectStats] =
    useState<UpdatePostsRequestStatusEnum>();
  const { data: category } = useCategory(DEFAULT_GROUPID);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const { mutate, isPending } = useUpdatePostStatus();
  const [isOpen, setIsOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<CategoryResponse>();
  const [filterNoCategory, setFilterNoCategory] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [sourceSiteList, setSourceSiteList] = useState<string[]>([]);

  const { inView, ref } = useInView();

  const postList = useMemo(() => {
    const all = data?.pages.flatMap((page) => page.posts) ?? [];
    return all;
  }, [data]);

  const totalCount = useMemo(() => data?.pages[0]?.totalCount, [data]);

  const categoryDropdown =
    category?.map((item) => ({
      label: item.name ?? '',
      value: item.id ?? '',
      item: item,
    })) ?? [];

  const categoryFilterDropdown =
    category?.map((item) => ({
      label: item.name ?? '',
      value: item.slug ?? '',
    })) ?? [];

  const postStatusDropdown = useMemo(
    () =>
      POST_STATUS.map((item) => ({
        ...item,
        label: statusLabelMap[item.value],
      })),
    []
  );

  const sourceSiteDropdown = useMemo(
    () =>
      sourceSiteList.map((item) => ({
        label: getSiteInfo(item).label,
        value: item as Site,
      })),
    [sourceSiteList]
  );

  const selectedSourceSiteNames =
    (searchCondition.sourceSiteNames as Site[] | undefined) ?? [];

  const handleLanguageSelect = (value: PostResponseLanguageEnum) => {
    setLanguage(value);
    setSearchCondition((prev) => ({
      ...prev,
      sourceSiteNames: [],
    }));
  };

  const handleCheck = (postId: string) => {
    if (checkedList.includes(postId)) {
      setCheckedList(checkedList.filter((id) => id !== postId));
    } else {
      setCheckedList([...checkedList, postId]);
    }
  };

  const handleToggle = (value: boolean) => {
    setFilterNoCategory(value);
    console.log(value);
    if (value) {
      setSearchCondition((prev) => ({
        ...prev,
        categorySlugs: null,
      }));
    } else {
      setSearchCondition((prev) => ({
        ...prev,
        categorySlugs: [],
      }));
    }
  };

  const handleUpdate = () => {
    mutate(
      {
        postIds: checkedList,
        status: selectStatus ?? tab,
        categoryIds: categoryList,
      },
      {
        onSuccess: () => {
          setCheckedList([]);
          setSelectStats(undefined);
          setCategoryList([]);
        },
      }
    );
  };

  const handleEditCategory = (category: CategoryResponse) => {
    setEditTarget(category);
    setIsOpen(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = keyword.trim();
      if (trimmed.length === 0 || trimmed.length >= 2) {
        setSearchCondition((prev) => ({
          ...prev,
          keyword: trimmed || undefined,
        }));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    setSelectStats(undefined);
    setCheckedList([]);
    setCategoryList([]);
  }, [tab]);

  useEffect(() => {
    const fetchSourceSite = async () => {
      const result = await getSourceSite(language);
      setSourceSiteList(result);
    };

    fetchSourceSite();
  }, [language]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="mx-12 flex w-full flex-col items-center gap-24">
      <div className="mt-24 flex w-full justify-between">
        <div className="text-gray_15 flex items-center gap-8 px-16 text-[15px] leading-16">
          전체
          <span className="text-gary_10 text-[15px] leading-17 font-bold tracking-tight">
            {totalCount}
          </span>
        </div>
        <div className="flex flex-col gap-10 sm:flex-row sm:gap-20">
          <label className="group/filter text-gray_15 flex cursor-pointer items-center gap-8 transition-colors hover:text-black">
            <Switch
              disabled={(searchCondition.categorySlugs?.length ?? 0) > 0}
              id="filter-no-category"
              checked={filterNoCategory}
              onCheckedChange={handleToggle}
              className="cursor-pointer transition-colors group-hover/filter:data-[state=unchecked]:bg-black/30"
            />
            <span className="text-[13px]">카테고리 없음만 보기</span>
          </label>
          <div className="border-gray_5 flex h-36 overflow-hidden rounded-md border bg-white">
            {LANGUAGE_OPTIONS.map((item) => {
              const isActive = language === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => handleLanguageSelect(item.value)}
                  className={`h-full px-12 text-[13px] font-semibold transition-colors ${
                    isActive
                      ? 'bg-gray_90 text-white'
                      : 'text-gray_10 hover:bg-gray_2 hover:text-black'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <CheckableDropdown
            trigger={
              <Button
                variant="dropdown"
                className={`bg-white ${selectedSourceSiteNames.length > 0 ? 'text-black' : 'text-gray_10'}`}
              >
                <div className="max-w-160 overflow-hidden text-ellipsis whitespace-nowrap">
                  {selectedSourceSiteNames.length > 0
                    ? selectedSourceSiteNames
                        .filter((item) => sourceSiteList.includes(item))
                        .map((item) => getSiteInfo(item).label)
                        .join(', ')
                    : '사이트 선택'}
                </div>
                <ChevronIcon className="transition-transform duration-200" />
              </Button>
            }
            dropdownitems={sourceSiteDropdown}
            selectedValues={selectedSourceSiteNames}
            onValueChange={(value) =>
              setSearchCondition((prev) => {
                const current =
                  (prev.sourceSiteNames as Site[] | undefined) ?? [];
                const next = current.includes(value)
                  ? current.filter((site) => site !== value)
                  : [...current, value];

                return {
                  ...prev,
                  sourceSiteNames: next,
                };
              })
            }
          />
          <CheckableDropdown
            trigger={
              <Button
                variant="dropdown"
                className={`bg-white ${searchCondition.categorySlugs && searchCondition.categorySlugs.length > 0 ? 'text-black' : 'text-gray_10'}`}
                disabled={filterNoCategory}
              >
                {searchCondition.categorySlugs &&
                searchCondition.categorySlugs.length > 0
                  ? `${searchCondition.categorySlugs.length}개 선택됨`
                  : '카테고리 선택'}
                <ChevronIcon className="transition-transform duration-200" />
              </Button>
            }
            dropdownitems={categoryFilterDropdown}
            selectedValues={searchCondition.categorySlugs ?? []}
            onValueChange={(value) =>
              setSearchCondition((prev) => ({
                ...prev,
                categorySlugs: prev.categorySlugs?.includes(value)
                  ? prev.categorySlugs.filter((s) => s !== value)
                  : [...(prev.categorySlugs ?? []), value],
              }))
            }
          />
          <div className="group relative">
            <Input
              id="keyword"
              name="keyword"
              type="text"
              placeholder="글 제목, 태그명 검색"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="border-gray_5 focus-visible:ring-none h-36 w-240 px-12 py-6 text-[13px] text-black transition ease-in focus-visible:border-black"
            />
            <SearchIcon className="stroke-gray_5 absolute top-1/2 right-12 size-16 -translate-y-1/2 transition ease-in group-focus-within:stroke-black" />
          </div>
        </div>
      </div>
      {checkedList.length > 0 && (
        <div className="border-gray_5 animate-in fade-in slide-in-from-top-2 fixed right-12 bottom-15 left-12 z-50 flex w-auto items-center justify-between rounded-xl border bg-[#e6faf5]/80 p-20 backdrop-blur-sm duration-200">
          <div className="flex w-full items-center justify-between gap-12">
            <div className="flex gap-20">
              <div className="flex items-center gap-14">
                <div className="text-gray_70 text-[14px] font-bold">상태</div>
                <DefaultDropdown
                  trigger={
                    <Button
                      variant="dropdown"
                      className={`bg-white ${selectStatus ? 'text-black' : 'text-gray_10'}`}
                    >
                      {selectStatus ? statusLabelMap[selectStatus] : '선택'}
                      <ChevronIcon className="transition-transform duration-200" />
                    </Button>
                  }
                  dropdownitems={postStatusDropdown}
                  onValueChange={(value) => {
                    if (value === selectStatus) {
                      setSelectStats(undefined);
                    } else {
                      setSelectStats(value);
                    }
                  }}
                />
              </div>
              <div className="flex items-center gap-14">
                <div className="text-gray_70 text-[14px] font-bold">
                  카테고리
                </div>
                <div className="relative max-w-700">
                  <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-linear-to-l from-[#e6faf5] to-transparent" />
                  <div className="flex gap-6 overflow-x-auto">
                    <Badge
                      variant={
                        categoryList.length === 0 ? 'admin-active' : 'admin'
                      }
                      onClick={() => setCategoryList([])}
                    >
                      카테고리 없음
                    </Badge>
                    {categoryDropdown.map((item) => (
                      <Badge
                        key={item.value}
                        variant={
                          categoryList.includes(item.value)
                            ? 'admin-active'
                            : 'admin'
                        }
                        onClick={() =>
                          setCategoryList((prev) =>
                            prev.includes(item.value)
                              ? prev.filter((v) => v !== item.value)
                              : [...prev, item.value]
                          )
                        }
                      >
                        {item.label}
                        <span
                          className="pointer-events-auto"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditCategory(item.item);
                          }}
                        >
                          <Pencil size={14} />
                        </span>
                      </Badge>
                    ))}

                    <CreateCategoryDialog
                      type="category"
                      groupId={DEFAULT_GROUPID}
                    />
                    <UpdateCategoryDialog
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      originName={editTarget?.name ?? ''}
                      originSlug={editTarget?.slug ?? ''}
                      originDescription={editTarget?.description}
                      categoryId={editTarget?.id?.toString() ?? ''}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <Button
                className="border-gray_10 w-100 border bg-red-400 px-16 py-8 text-sm leading-18 font-bold text-white hover:bg-red-400/80 hover:text-white"
                onClick={() => setCheckedList([])}
              >
                초기화
              </Button>
              <Button
                className="border-gray_10 hover:bg-main_2 w-100 border bg-white px-16 py-8 text-sm leading-18 font-bold text-black hover:text-white"
                disabled={checkedList.length === 0}
                onClick={handleUpdate}
              >
                {checkedList.length}개 수정
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-gray_5 h-1 w-full" />
      <div className="grid w-full grid-cols-1 gap-x-8 gap-y-24 sm:grid-cols-2 md:grid-cols-3 md:gap-y-48 lg:grid-cols-6 2xl:grid-cols-6">
        {isLoading || isPending || (isFetching && !isFetchingNextPage) ? (
          <>
            {Array.from({ length: 12 }).map((_, index) => (
              <PostCardSkeleton key={index} compact />
            ))}
          </>
        ) : (
          <>
            {postList.map((post) => (
              <AdminPostCard
                post={post}
                key={post?.postId}
                handleCheck={handleCheck}
                checked={checkedList.includes(post?.postId?.toString() ?? '')}
                keyword={searchCondition.keyword}
              />
            ))}
            {isFetchingNextPage &&
              Array.from({ length: 10 }).map((_, index) => (
                <PostCardSkeleton key={`next-${index}`} compact />
              ))}
          </>
        )}
      </div>
      {!isFetching && !isLoading && hasNextPage && (
        <div ref={ref} className="h-1 min-h-1" />
      )}
    </div>
  );
};

export default PostList;
