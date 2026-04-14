'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import useCreateCategory from '../_hooks/useCreateCategory';
import useCreateGroup from '../_hooks/useCreateGroup';

interface Props {
  type: 'group' | 'category';
  groupId?: string;
}

const CreateCategoryDialog = ({ type, groupId }: Props) => {
  const { mutate: createGroup } = useCreateGroup();
  const { mutate: createCategory } = useCreateCategory();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    if (!name || !slug || !description) return;
    if (type === 'group') {
      createGroup({ name });
    }
    if (type === 'category' && groupId) {
      createCategory({
        categoryGroupId: groupId,
        name,
        slug,
        description,
      });
    }
    setName('');
    setSlug('');
    setDescription('');
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setName('');
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Badge
          variant="admin"
          className="hover:border-main_2 hover:text-main_2 border-2 border-dotted"
        >
          <Plus size={14} />
          카테고리 추가
        </Badge>
      </DialogTrigger>
      <DialogContent className="h-screen max-w-600 rounded-none px-24 py-48 sm:h-auto sm:rounded-lg">
        <DialogHeader aria-describedby="undefined">
          <DialogTitle className="flex w-full justify-center text-xl/[136%] font-bold">
            {type === 'group' ? '그룹 생성' : '카테고리 생성'}
          </DialogTitle>
        </DialogHeader>
        <div className="group relative flex w-full flex-col gap-20">
          <div className="flex flex-col gap-10">
            <Label htmlFor="keyword" className="flex gap-4 font-semibold">
              {type === 'group' ? '그룹 이름' : '카테고리 이름'}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="keyword"
              name="keyword"
              type="text"
              minLength={2}
              onChange={(e) => setName(e.target.value)}
              placeholder={
                type === 'group'
                  ? '그룹 이름을 입력해주세요'
                  : '카테고리를 이름을 입력해주세요'
              }
              className="border-gray_5 focus-visible:ring-none focus-visible:border-gray_90 h-46 w-full px-12 py-6 text-[13px] transition ease-in"
            />
          </div>
          {type === 'category' && (
            <>
              <div className="flex flex-col gap-10">
                <Label htmlFor="slug" className="flex gap-4 font-semibold">
                  경로
                  <span className="text-red-500">*</span>
                </Label>
                <Input
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
                <Label
                  htmlFor="description"
                  className="flex gap-4 font-semibold"
                >
                  부가 설명
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  onChange={(value) => setDescription(value.target.value)}
                  minLength={2}
                  id="description"
                  name="description"
                  type="text"
                  placeholder={'부가 설명을 이름을 입력해주세요'}
                  className="border-gray_5 focus-visible:ring-none focus-visible:border-gray_90 h-46 w-full px-12 py-6 text-[13px] transition ease-in"
                />
              </div>
            </>
          )}

          <Button
            className="px-16 py-4 text-sm leading-18 font-bold"
            onClick={handleSubmit}
            disabled={!name || !slug}
            color="green"
          >
            생성하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
