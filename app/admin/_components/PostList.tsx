'use client';

import { POST_STATUS } from '@/app/constans/dropdown';
import DefaultDropdown from '@/components/dropdown/DefaultDropdown';
import AdminPostCard from '@/components/post/AdminPostCard';
import PostCardSkeleton from '@/components/post/PostCardSkeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ChevronIcon from '@/public/icons/chevron-down.svg';
import { CategoryResponse, UpdatePostsRequestStatusEnum } from '@/types/api';
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

interface Props {
  tab: UpdatePostsRequestStatusEnum;
}

const PostList = ({ tab }: Props) => {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const { language, searchCondition } = useDispatch();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isFetchingNextPage,
  } = useAdminPostList({ searchCondition, status: tab, language, limit: 20 });
  // const { data: categoryGroup } = useCategoryGroup();
  const [selectStatus, setSelectStats] =
    useState<UpdatePostsRequestStatusEnum>();
  const { data: category } = useCategory(DEFAULT_GROUPID);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const { mutate, isPending } = useUpdatePostStatus();
  const [isOpen, setIsOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<CategoryResponse>();

  const { inView, ref } = useInView();

  const postList = useMemo(
    () => data?.pages.flatMap((page) => page.posts) ?? [],
    [data]
  );

  const categoryDropdown =
    category?.map((item) => ({
      label: item.name ?? '',
      value: item.id ?? '',
      item: item,
    })) ?? [];

  const handleCheck = (postId: string) => {
    if (checkedList.includes(postId)) {
      setCheckedList(checkedList.filter((id) => id !== postId));
    } else {
      setCheckedList([...checkedList, postId]);
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
    setSelectStats(undefined);
    setCheckedList([]);
    setCategoryList([]);
  }, [tab]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="flex w-full flex-col items-center gap-24">
      <div className="bg-main_2/10 mt-24 flex w-full items-center justify-between rounded-xl p-24 sm:pt-24">
        <div className="flex w-full justify-between gap-12">
          {/* 포스트 상태 선택 */}
          <div className="flex flex-col gap-20">
            <div className="flex flex-col gap-14">
              <div className="text-gray_70 text-[16px] font-bold">
                게시물 상태
              </div>
              <DefaultDropdown
                trigger={
                  <Button
                    variant="dropdown"
                    className={`bg-white ${selectStatus ? 'text-black' : 'text-gray_10'}`}
                  >
                    {selectStatus
                      ? POST_STATUS.find((item) => item.value === selectStatus)
                          ?.label
                      : '선택'}
                    <ChevronIcon className="transition-transform duration-200" />
                  </Button>
                }
                dropdownitems={POST_STATUS}
                onValueChange={(value) => {
                  if (value === selectStatus) {
                    setSelectStats(undefined);
                  } else {
                    setSelectStats(value);
                  }
                }}
              />
            </div>
            <div className="flex flex-col gap-14">
              <div className="text-gray_70 text-[16px] font-bold">
                게시물 카테고리
              </div>
              <div className="flex max-w-1000 flex-wrap gap-6">
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

          <Button
            className="border border-black bg-white px-16 py-8 text-sm leading-18 font-bold text-black"
            disabled={checkedList.length === 0}
            onClick={handleUpdate}
          >
            변경
          </Button>
        </div>
      </div>
      <div className="bg-gray_5 h-1 w-full" />
      <div className="grid grid-cols-1 gap-x-8 gap-y-24 sm:grid-cols-2 md:grid-cols-3 md:gap-y-48 lg:grid-cols-4 2xl:grid-cols-5">
        {isLoading || isPending || (isFetching && !isFetchingNextPage) ? (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <PostCardSkeleton key={index} />
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
              />
            ))}
            {isFetchingNextPage &&
              Array.from({ length: 10 }).map((_, index) => (
                <PostCardSkeleton key={`next-${index}`} />
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
