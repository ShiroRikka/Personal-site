import type { ImageMetadata, MarkdownHeading, MarkdownInstance } from 'astro';
import type { Author, Category, Tag } from '../base';

export interface Post {
  slug: string;
  url: string;
  title: string;
  date: Date;
  updateDate: Date;
  draft: boolean;
  category: Category;
  tags: Tag[];
  author: Author;

  excerpt?: string;
  image?: string | ImageMetadata | Promise<{default: ImageMetadata}>;
  permalink?: string;
  readingTime?: number;
  wordCount?: number;
  cardVariant?: 'blur' | 'material' | 'full' | 'plain';

  raw: string;
  headings: MarkdownHeading[];
  Content: MarkdownInstance<any>['Content'];
}