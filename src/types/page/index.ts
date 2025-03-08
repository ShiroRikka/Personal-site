import type { ImageMetadata } from 'astro';
import type { Category, Tag } from '../base';
import type { Post } from './post';

export interface Paginator {
  total: number;
  current: number;
  currentCount: number;
  totalCount: number;
  prev: number | null;
  next: number | null;
  pageUrls: string[];
}

export interface BasePage {
  title: string;
  description?: string;
  image?: string | ImageMetadata | Promise<{default: ImageMetadata}>;
  type?: never;
}

export interface IndexPage extends Omit<BasePage, 'type'> {
  type: 'index';
  posts: Omit<Post, 'Content'>[];
  paginator?: Paginator;
}

export interface PostPage extends Omit<BasePage, 'type'> {
  type: 'post';
  post: Omit<Post, 'Content'>;
  prev?: Omit<Post, 'Content'>;
  next?: Omit<Post, 'Content'>;
}

export interface CategoriesPage extends Omit<BasePage, 'type'> {
  type: 'categories';
  categories: Category[];
}

export interface TagsPage extends Omit<BasePage, 'type'> {
  type: 'tags';
  tags: Tag[];
}

export interface PostsPage extends Omit<BasePage, 'type'> {
  type: 'posts';
  posts: Omit<Post, 'Content'>[];
  paginator?: Paginator;
}

export interface ArchivePage extends Omit<BasePage, 'type'> {
  type: 'archive';
  posts: Omit<Post, 'Content'>[];
}

export type Page = IndexPage | PostPage | CategoriesPage | TagsPage | PostsPage | ArchivePage | BasePage;

export * from './post';