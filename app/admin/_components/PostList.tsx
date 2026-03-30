'use client';

import { POST_STATUS } from '@/app/constans/dropdown';
import CheckableDropdown from '@/components/dropdown/CheckableDropdown';
import DefaultDropdown from '@/components/dropdown/DefaultDropdown';
import AdminPostCard from '@/components/post/AdminPostCard';
import PostCardSkeleton from '@/components/post/PostCardSkeleton';
import { Button } from '@/components/ui/button';
import ChevronIcon from '@/public/icons/chevron-down.svg';
import { UpdatePostsRequestStatusEnum } from '@/types/api';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import useAdminPostList from '../_hooks/useAdminPostList';
import useCategory from '../_hooks/useCategory';
import useCategoryGroup from '../_hooks/useCategoryGroup';
import useDispatch from '../_hooks/useDispatch';
import useUpdatePostStatus from '../_hooks/useUpdatePostStatus';
import CreateCategoryDialog from './CreateCategoryDialog';

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
  const { data: categoryGroup } = useCategoryGroup();
  const [selectStatus, setSelectStats] =
    useState<UpdatePostsRequestStatusEnum>();
  const [selectedGroup, setSelectedGroup] = useState<string>();
  const { data: category } = useCategory(selectedGroup);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const { mutate, isPending } = useUpdatePostStatus();

  const { inView, ref } = useInView();

  const postList = useMemo(
    () => data?.pages.flatMap((page) => page.posts) ?? [],
    [data]
  );

  const categoryGroupDropdown =
    categoryGroup?.map((item) => ({
      label: item.name ?? '',
      value: item.id ?? '',
    })) ?? [];

  const categoryDropdown =
    category?.map((item) => ({
      label: item.name ?? '',
      value: item.id ?? '',
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
          setSelectedGroup(undefined);
          setCategoryList([]);
        },
      }
    );
  };

  useEffect(() => {
    setSelectStats(undefined);
    setSelectedGroup(undefined);
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
      <div className="flex w-full items-center justify-between px-24 pt-12 sm:pt-24">
        <div className="flex items-end gap-12">
          {/* 포스트 상태 선택 */}
          <div className="flex flex-col gap-4">
            <div className="text-gray_70 text-[13px]/[15px]">상태</div>
            <DefaultDropdown
              trigger={
                <Button
                  variant="dropdown"
                  className={selectStatus ? 'text-black' : 'text-gray_10'}
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
          {/* 카테고리 그룹 선택 */}
          <div className="flex flex-col gap-4">
            <div className="text-gray_70 flex justify-between text-[13px]/[15px]">
              그룹
              <CreateCategoryDialog type="group" />
            </div>
            <CheckableDropdown
              trigger={
                <Button
                  variant="dropdown"
                  className={selectedGroup ? 'text-black' : 'text-gray_10'}
                >
                  {selectedGroup
                    ? categoryGroup?.find((item) => item.id === selectedGroup)
                        ?.name
                    : '선택'}
                  <ChevronIcon className="transition-transform duration-200" />
                </Button>
              }
              dropdownitems={categoryGroupDropdown}
              onValueChange={(value) => {
                if (value === selectedGroup) {
                  setSelectedGroup(undefined);
                } else {
                  setSelectedGroup(value);
                }
              }}
              selectedValues={[selectedGroup]}
            />
          </div>
          {/* 카테고리 선택 */}
          {selectedGroup && (
            <div className="flex flex-col gap-4">
              <div className="text-gray_70 flex justify-between text-[13px]/[15px]">
                카테고리
                <CreateCategoryDialog type="category" groupId={selectedGroup} />
              </div>
              <CheckableDropdown
                trigger={
                  <Button
                    variant="dropdown"
                    className={
                      categoryList.length > 0 ? 'text-black' : 'text-gray_10'
                    }
                  >
                    {categoryList.length > 0
                      ? category
                          ?.filter((item) =>
                            categoryList.includes(item.id ?? '')
                          )
                          .map((item) => item.name)
                          .join(', ')
                      : '선택'}
                    <ChevronIcon className="transition-transform duration-200" />
                  </Button>
                }
                dropdownitems={categoryDropdown}
                selectedValues={categoryList}
                onValueChange={(value) => {
                  setCategoryList((prev) =>
                    prev.includes(value)
                      ? prev.filter((v) => v !== value)
                      : [...prev, value]
                  );
                }}
              />
            </div>
          )}
          <Button
            className="border border-black bg-white px-16 py-8 text-sm leading-18 font-bold text-black"
            disabled={checkedList.length === 0}
            onClick={handleUpdate}
          >
            변경
          </Button>
        </div>
        {/* <Button
          color={
            checkedList.length > 0
              ? tab === UpdatePostsRequestStatusEnum.Discarded
                ? 'green'
                : 'red'
              : 'gray'
          }
          className={cn('px-16 py-4 text-sm leading-18 font-bold')}
          disabled={checkedList.length === 0}
          onClick={handlePostStatus}
        >
          {tab === UpdatePostsRequestStatusEnum.Discarded
            ? '글 복원'
            : '글 삭제'}
        </Button> */}
      </div>
      <div className="bg-gray_5 h-1 w-full" />
      <div className="grid grid-cols-1 gap-x-8 gap-y-24 sm:grid-cols-2 md:grid-cols-3 md:gap-y-48 lg:grid-cols-4 2xl:grid-cols-5">
        {isLoading || isPending || (isFetching && !isFetchingNextPage) ? (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
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
