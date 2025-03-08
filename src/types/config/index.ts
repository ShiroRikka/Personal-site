import type { NavbarConfig as NavbarPartialConfig } from '../../partials/Navbar';
import type { HeroConfig as HeroPartialConfig } from '../../partials/Hero';
import type { CategoryTreeConfig, ComponentConfig, ProfileConfig, SidebarConfig as SidebarPartialConfig, TagCloudConfig } from '../../partials/Sidebar';
import type { PaginationConfig as PaginationPartialConfig } from '../../partials/Pagination';
import type { CommentConfig as CommentPartialConfig } from '../../partials/Comment';
import type { FooterConfig as FooterPartialConfig } from '../../partials/Footer';
import type { WalineOptions } from '../../partials/Comment/Waline';
import type { Sortable } from '../base';

export type NavbarConfig = NavbarPartialConfig;
export type HeroConfig = Omit<HeroPartialConfig, 'info'>;

export type ComponentWidgetConfig = ComponentConfig;
export type ProfileWidgetConfig = ProfileConfig;
export type TagCloudWidgetConfig = Omit<TagCloudConfig, 'tags'> & Sortable;
export type CategoryTreeWidgetConfig = Omit<CategoryTreeConfig, 'categories'> & Sortable;

export type WidgetConfig = ComponentWidgetConfig | ProfileWidgetConfig | TagCloudWidgetConfig | CategoryTreeWidgetConfig;

export type SidebarConfig = Omit<SidebarPartialConfig, 'widgets'> & {
  widgets?: WidgetConfig[];
};

export type PaginationConfig = PaginationPartialConfig & {
  pageSize?: number;
}
export type CommentConfig = CommentPartialConfig;
export type FooterConfig = FooterPartialConfig;

export type ArticleConfig = {
  outdateTip?: false | {
    outdateLimit?: number;
  };
  license?: false | {
    licenseName: string;
    licenseUrl?: string;
    infoText?: string;
  }
};

export type AlgoliaConfig = {
  appId: string;
  apiKey: string;
  indexName: string;
}

export interface Config {
  title: string;
  description: string;
  author: string;
  favicon: string;
  navbar?: NavbarConfig | false;
  hero?: HeroConfig | false;
  sidebar?: SidebarConfig | false;
  pagination?: PaginationConfig | false;
  comment?: CommentConfig | false;
  footer?: FooterConfig | false;
  article?: ArticleConfig;
  algolia?: AlgoliaConfig;
}