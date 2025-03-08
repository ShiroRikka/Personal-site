import type { ImageMetadata } from 'astro';

export interface Tag {
  slug: string;
  label: string;
  url: string;
  count: number;
}

export interface Category {
  slug: string;
  label: string;
  url: string;
  count: number;
}

export interface Author {
  name: string;
  avatar?: string | ImageMetadata | Promise<{default: ImageMetadata}>;
  description?: string;
}

export interface Sortable {
  sortBy?: 'count' | 'label';
  order?: 'asc' | 'desc';
  limit?: number;
}