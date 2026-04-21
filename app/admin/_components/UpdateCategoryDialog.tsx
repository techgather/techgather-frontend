'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import useUpdateCategory from '../_hooks/useUpdateCategory';

interface Props {
  categoryId: string;
  originName: string;
  originSlug: string;
  originDescription?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateCategoryDialog = ({
  categoryId,
  originName,
  originSlug,
  originDescription,
  isOpen,
  setIsOpen,
}: Props) => {
  const { mutate } = useUpdateCategory();
  const [name, setName] = useState(originName);
  const [slug, setSlug] = useState(originSlug);
  const [description, setDescription] = useState(originDescription);

  const handleSubmit = () => {
    mutate({
      id: categoryId,
      name,
      slug,
      description: description ?? '',
    });

    setName('');
    setSlug('');
    setDescription('');
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      setName(originName);
      setSlug(originSlug);
      setDescription(originDescription);
    }
  }, [isOpen, originName, originSlug, originDescription]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        aria-describedby={undefined}
        className="h-screen max-w-600 rounded-none px-24 py-48 sm:h-auto sm:rounded-lg"
      >
        <DialogHeader aria-describedby="undefined">
          <DialogTitle className="flex w-full justify-center text-xl/[136%] font-bold">
            카테고리 수정
          </DialogTitle>
        </DialogHeader>
        <div className="group relative flex w-full flex-col gap-20">
          <div className="flex flex-col gap-10">
            <Label htmlFor="keyword" className="flex gap-4 font-semibold">
              카테고리 이름
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="keyword"
              name="keyword"
              type="text"
              minLength={2}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={'카테고리를 이름을 입력해주세요'}
              className="border-gray_5 focus-visible:ring-none focus-visible:border-gray_90 h-46 w-full px-12 py-6 text-[13px] transition ease-in"
            />
          </div>
          <div className="flex flex-col gap-10">
            <Label htmlFor="slug" className="flex gap-4 font-semibold">
              경로
              <span className="text-red-500">*</span>
            </Label>
            <Input
              value={slug}
              onChange={(value) => setSlug(value.target.value)}
              minLength={2}
              id="slug"
              name="slug"
              type="text"
              placeholder={'경로를 이름을 입력해주세요'}
              className="border-gray_5 focus-visible:ring-none focus-visible:border-gray_90 h-46 w-full px-12 py-6 text-[13px] transition ease-in"
            />
          </div>
          <div className="flex flex-col gap-10">
            <Label htmlFor="description" className="flex gap-4 font-semibold">
              부가 설명
              <span className="text-red-500">*</span>
            </Label>
            <Input
              value={description ?? ''}
              onChange={(value) => setDescription(value.target.value)}
              minLength={2}
              id="description"
              name="description"
              type="text"
              placeholder={'부가 설명을 이름을 입력해주세요'}
              className="border-gray_5 focus-visible:ring-none focus-visible:border-gray_90 h-46 w-full px-12 py-6 text-[13px] transition ease-in"
            />
          </div>

          <Button
            className="px-16 py-4 text-sm leading-18 font-bold"
            onClick={handleSubmit}
            disabled={!name || !slug}
            color="green"
          >
            수정하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategoryDialog;
