'use client';

import { useI18n } from '@/app/i18n/I18nProvider';
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
  const { t } = useI18n();
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
          {t('admin.categoryAdd')}
        </Badge>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="h-screen max-w-600 rounded-none px-24 py-48 sm:h-auto sm:rounded-lg"
      >
        <DialogHeader aria-describedby="undefined">
          <DialogTitle className="flex w-full justify-center text-xl/[136%] font-bold">
            {type === 'group'
              ? t('admin.groupCreate')
              : t('admin.categoryCreate')}
          </DialogTitle>
        </DialogHeader>
        <div className="group relative flex w-full flex-col gap-20">
          <div className="flex flex-col gap-10">
            <Label htmlFor="keyword" className="flex gap-4 font-semibold">
              {type === 'group'
                ? t('admin.groupName')
                : t('admin.categoryName')}
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
                  ? t('admin.groupNamePlaceholder')
                  : t('admin.categoryNamePlaceholder')
              }
              className="border-gray_5 focus-visible:ring-none focus-visible:border-gray_90 h-46 w-full px-12 py-6 text-[13px] transition ease-in"
            />
          </div>
          {type === 'category' && (
            <>
              <div className="flex flex-col gap-10">
                <Label htmlFor="slug" className="flex gap-4 font-semibold">
                  {t('admin.slug')}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  onChange={(value) => setSlug(value.target.value)}
                  minLength={2}
                  id="slug"
                  name="slug"
                  type="text"
                  placeholder={t('admin.slugPlaceholder')}
                  className="border-gray_5 focus-visible:ring-none focus-visible:border-gray_90 h-46 w-full px-12 py-6 text-[13px] transition ease-in"
                />
              </div>
              <div className="flex flex-col gap-10">
                <Label
                  htmlFor="description"
                  className="flex gap-4 font-semibold"
                >
                  {t('admin.description')}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  onChange={(value) => setDescription(value.target.value)}
                  minLength={2}
                  id="description"
                  name="description"
                  type="text"
                  placeholder={t('admin.descriptionPlaceholder')}
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
            {t('admin.create')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
