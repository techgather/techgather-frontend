'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { PlusIcon } from 'lucide-react';
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
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    if (!name) return;
    if (type === 'group') {
      createGroup({ name });
    }
    if (type === 'category' && groupId) {
      createCategory({ categoryGroupId: groupId, name });
    }
    setName('');
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
        <PlusIcon size={14} className="cursor-pointer" color="#00b987" />
      </DialogTrigger>
      <DialogContent className="h-screen max-w-600 rounded-none px-24 py-48 sm:h-auto sm:rounded-lg">
        <DialogHeader aria-describedby="undefined">
          <DialogTitle className="flex w-full justify-center text-xl/[136%] font-bold">
            {type === 'group' ? '그룹 생성' : '카테고리 생성'}
          </DialogTitle>
        </DialogHeader>
        <div className="group relative flex w-full flex-col gap-20">
          <Input
            onChange={(value) => setName(value.target.value)}
            minLength={2}
            id="keyword"
            name="keyword"
            type="text"
            placeholder={
              type === 'group'
                ? '그룹 이름을 입력해주세요'
                : '카테고리를 이름을 입력해주세요'
            }
            className="border-gray_5 focus-visible:ring-none focus-visible:border-gray_90 h-46 w-full px-12 py-6 text-[13px] transition ease-in"
          />
          <Button
            className="px-16 py-4 text-sm leading-18 font-bold"
            onClick={handleSubmit}
            disabled={!name}
            color="green"
          >
            제출하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
