'use client';

import { Post } from '@/types/post';
import { useState } from 'react';
import { SelectOptionType } from '../constans/tab';
import PostCard from './PostCard';
import SelectOption from './SelectOption';

interface Props {
  data: Post[];
}

const PostList = ({ data }: Props) => {
  const [selectedOption, setSelectedOption] = useState<SelectOptionType>('all');

  const handleOptionChange = (option: SelectOptionType) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="py-28">
        <SelectOption
          currentOption={selectedOption}
          handleClick={handleOptionChange}
        />
      </div>
      <div className="grid grid-cols-4 gap-y-48 px-24">
        {data.map((item, key) => (
          <PostCard post={item} key={key} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
