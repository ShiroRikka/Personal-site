import React from 'react';
import { twMerge } from 'tailwind-merge';
import type { BlurPostCardProps } from '.';
import BlurHash from '../Image/BlurHash';
import { useState, useEffect } from 'react';

// 扩展BlurPostCardProps类型，添加className属性
type BlurPostCardReactProps = BlurPostCardProps & {
  className?: string;
};

// 简化版的PostDetails组件，用于React版本的BlurPostCard
const PostDetails: React.FC<{
  className?: string;
  title: string;
  excerpt?: string;
  url: string;
  date: Date;
  tags?: Array<{
    label: string;
    url: string;
  }>;
  category?: {
    label: string;
    url: string;
  };
  wordCount?: number;
  readingTime?: number;
}> = ({
  className,
  title,
  excerpt,
  url,
  date,
  tags,
  category,
  wordCount,
  readingTime
}) => {
  // 格式化日期
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className={twMerge(
      'flex flex-col flex-nowrap justify-between',
      'p-3 md:py-8 md:px-7 w-full md:w-72',
      'text-gray-800 dark:text-gray-100',
      className
    )}>
      <div className="flex flex-wrap p-1 text-sm gap-x-4 gap-y-1 scrollbar-none leading-none drop-shadow-[0_2px_2px_rgba(0,0,0,.5)]">
        <span className='flex items-center flex-none mr-auto'>
          {formatDate(date)}
        </span>
        {wordCount && (
          <span className='flex items-center flex-none'>
            {wordCount} 字
          </span>
        )}
        {readingTime && (
          <span className='flex items-center flex-none'>
            {readingTime} 分钟
          </span>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-center py-4">
        <a href={url} className="text-xl font-bold hover:text-primary-500 dark:hover:text-primary-400 line-clamp-2 mb-2">
          {title}
        </a>
        {excerpt && (
          <p className="text-sm opacity-80 line-clamp-2">
            {excerpt}
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {category && (
          <a href={category.url} className="text-xs px-2 py-1 rounded-full bg-primary-500/20 text-primary-700 dark:text-primary-300 hover:bg-primary-500/30">
            {category.label}
          </a>
        )}
        {tags && tags.map(tag => (
          <a key={tag.url} href={tag.url} className="text-xs px-2 py-1 rounded-full bg-gray-200/50 dark:bg-gray-700/50 hover:bg-gray-300/50 dark:hover:bg-gray-600/50">
            {tag.label}
          </a>
        ))}
      </div>
    </div>
  );
};

// 用于模糊背景的函数组件
const BlurBackground: React.FC<{
  src: string;
  className?: string;
}> = ({ src, className }) => {
  return (
    <div className={className}>
      <img src={src} className='h-full w-full object-cover blur-xl scale-125' alt="background" />
    </div>
  );
};

const BlurPostCardReact: React.FC<BlurPostCardReactProps> = ({
  className,
  title,
  excerpt,
  url,
  image,
  imagePosition = 'left',
  tags,
  category,
  date,
  wordCount,
  readingTime,
  ...rest
}) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  
  useEffect(() => {
    // 处理image图片源
    const processImage = async () => {
      if (image) {
        try {
          let imageSource: string;
          if (typeof image === 'string') {
            imageSource = image;
          } else if ('src' in image) {
            imageSource = image.src;
          } else {
            // 处理Promise类型的图片导入
            const resolvedImage = await image;
            imageSource = resolvedImage.default.src;
          }
          setImageSrc(imageSource);
        } catch (error) {
          console.error('Error processing image:', error);
        }
      }
    };
    
    processImage();
  }, [image]);

  return (
    <div className={twMerge(
      'relative md:h-[14.5rem] rounded-xl flex flex-col md:flex-row flex-nowrap overflow-hidden',
      'bg-[#0b0f19]',
      className
    )} {...rest}>
      {imageSrc && (
        <>
          <img 
            src={imageSrc} 
            alt='cover' 
            className={twMerge(
              'absolute brightness-[0.8] md:brightness-[0.7]',
              'w-full h-full',
              'scale-y-[200%] md:scale-y-100 origin-bottom md:origin-center',
            )} 
          />
          <a 
            className={twMerge(
              'z-10 flex-none w-full h-40 overflow-hidden select-none md:order-none md:h-full md:w-72 md:shrink',
              imagePosition === 'left' ? 'clip-left' : 'clip-right'
            )} 
            href={url} 
            aria-label='cover' 
            tabIndex={-1}
          >
            <img src={imageSrc} alt='cover' className='h-full w-full scale-[1.025]' />
          </a>
        </>
      )}
      <PostDetails
        className={twMerge(
          'z-10 flex-auto text-gray-100',
          imagePosition === 'left' ? 'md:order-last' : 'md:order-first'
        )}
        title={title}
        excerpt={excerpt}
        url={url}
        date={date}
        wordCount={wordCount}
        readingTime={readingTime}
        tags={tags}
        category={category}
      />
    </div>
  );
};

export default BlurPostCardReact;