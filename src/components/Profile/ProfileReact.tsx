import React from 'react';
import styles from './Profile.module.css';
import { Icon } from '@iconify/react';
import { twMerge } from 'tailwind-merge';
import type { ProfileProps } from '.';
import BlurHash from '../Image/BlurHash';
import { imageToHashBase64 } from '../Image/converter';
import { useState, useEffect } from 'react';

interface ImageProps {
  src: string;
  className?: string;
  alt: string;
  blurhash?: string;
}

// 简化版的Image组件，用于React版本的Profile
const ImageComponent: React.FC<ImageProps> = ({ src, className, alt, blurhash }) => {
  return (
    <div className={twMerge("relative inline-block overflow-hidden", className)}>
      <img src={src} className="w-full h-full object-cover" alt={alt} />
      {blurhash && (
        <BlurHash
          className="absolute inset-0"
          src={src}
          blurhash={blurhash}
        />
      )}
    </div>
  );
};

const ProfileReact: React.FC<ProfileProps> = ({
  avatar,
  background,
  author,
  description,
  socialIcons
}) => {
  const [avatarSrc, setAvatarSrc] = useState<string>('');
  const [backgroundSrc, setBackgroundSrc] = useState<string>('');
  const [avatarHash, setAvatarHash] = useState<string | undefined>();
  const [backgroundHash, setBackgroundHash] = useState<string | undefined>();

  useEffect(() => {
    // 处理avatar和background图片源
    const processImage = async () => {
      if (avatar) {
        try {
          let avatarSource: string;
          if (typeof avatar === 'string') {
            avatarSource = avatar;
          } else if ('src' in avatar) {
            avatarSource = avatar.src;
          } else {
            // 处理Promise类型的图片导入
            const resolvedAvatar = await avatar;
            avatarSource = resolvedAvatar.default.src;
          }
          setAvatarSrc(avatarSource);
          
          // 在实际应用中，这里应该调用imageToHashBase64获取blurhash
          // 但由于这需要服务器端处理，我们在客户端组件中模拟这个行为
          // setAvatarHash(await imageToHashBase64(avatarSource));
        } catch (error) {
          console.error('Error processing avatar:', error);
        }
      }
      
      if (background) {
        try {
          let backgroundSource: string;
          if (typeof background === 'string') {
            backgroundSource = background;
          } else if ('src' in background) {
            backgroundSource = background.src;
          } else {
            // 处理Promise类型的图片导入
            const resolvedBackground = await background;
            backgroundSource = resolvedBackground.default.src;
          }
          setBackgroundSrc(backgroundSource);
          // setBackgroundHash(await imageToHashBase64(backgroundSource));
        } catch (error) {
          console.error('Error processing background:', error);
        }
      }
    };
    
    processImage();
  }, [avatar, background]);

  return (
    <div className='plate-bg border-highlight p-4 rounded-xl overflow-hidden relative'>
      {backgroundSrc && (
        <img 
          src={backgroundSrc} 
          className={twMerge(
            'absolute top-0 left-0 w-full h-32 select-none',
            styles.profileBg
          )} 
          alt='background' 
        />
      )}
      {avatarSrc && (
        <img 
          src={avatarSrc} 
          className="block relative w-28 h-28 rounded-full mt-8 mx-auto ring-white ring-8 dark:ring-gray-800" 
          alt='avatar' 
        />
      )}
      <div className="text-center my-4">
        {author && <div className='text-2xl font-bold'>{author}</div>}
        {description && <div className='text-sm mt-2'>{description}</div>}
      </div>
      {socialIcons && (
        <div className='flex flex-wrap justify-center items-center gap-2'>
          {socialIcons.map(({ label, color, icon, url }) => (
            <a 
              key={url}
              href={url} 
              title={label} 
              className={twMerge(
                'h-[2.125rem] w-[2.125rem] flex items-center justify-center',
                styles.socialIcon
              )} 
              style={{
                color: color
              }} 
              target='_blank'
              rel="noreferrer"
            >
              <Icon icon={icon} width={20} height={20} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileReact;