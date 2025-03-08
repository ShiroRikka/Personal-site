import type { ImageMetadata } from 'astro';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import type { HTMLAttributes } from 'astro/types';

export interface BasePostCardProps {
  class?: string;
  title: string;
  excerpt?: string;
  url: string;
  date: Date;
  image?: string | ImageMetadata | Promise<{default: ImageMetadata}>;
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
}

export interface BlurPostCardProps extends BasePostCardProps {
  imagePosition?: 'left' | 'right';
  variant?: 'blur';
}

export interface FullPostCardProps extends BasePostCardProps {
  variant?: 'full';
}

export interface MaterialPostCardProps extends BasePostCardProps {
  imagePosition?: 'left' | 'right';
  variant?: 'material';
}

export interface PlainPostCardProps extends BasePostCardProps {
  imagePosition?: 'left' | 'right';
  variant?: 'plain';
}

export type PostCardProps = BlurPostCardProps | MaterialPostCardProps | FullPostCardProps | PlainPostCardProps;

export interface ProfileProps {
  avatar?: string | ImageMetadata | Promise<{default: ImageMetadata}>;
  background?: string | ImageMetadata | Promise<{default: ImageMetadata}>;
  author?: string;
  description?: string;
  socialIcons?: {
    label: string;
    color?: string;
    icon: string;
    url: string;
  }[];
}