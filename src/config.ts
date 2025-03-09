import type { Config } from './types';
import { getYear } from 'date-fns';
import { url } from '@/utils/url';

const config: Config = {
  title: 'ShiroRikkaの小窝',
  description: '爆裂吧,现实!粉碎吧,精神!Vanishment This World!',
  author: 'Wider',
  favicon: url('favicon.ico'),
  navbar: {
    
    menu: [
      {
        label: '首页',
        url: url('/'),
        icon: 'tabler:home'
      },
      {
        label: '标签',
        url: url('/tags'),
        icon: 'tabler:tag'
      },
      {
        label: '分类',
        url: url('/categories'),
        icon: 'tabler:category'
      },
      {
        label: '归档',
        url: url('/archive'),
        icon: 'tabler:archive'
      },
      {
        label: '友链',
        url: url('/friends'),
        icon: 'tabler:heart-handshake'
      },
      {
        label: '关于',
        url: url('/about'),
        icon: 'tabler:info-circle'
      },
      // {
      //   label: '菜单示例',
      //   icon: 'tabler:menu-2',
      //   children: [
      //     { label: 'SubItem1', url: '#', icon: 'tabler:circle'},
      //     { label: 'SubItem2', url: '#', icon: 'tabler:circle'},
      //     {
      //       label: 'SubItem3',
      //       icon: 'tabler:menu-2',
      //       children: [
      //         { label: 'SubItem1', url: '#', icon: 'tabler:circle'},
      //         { label: 'SubItem2', url: '#', icon: 'tabler:circle'},
      //         { label: 'SubItem3', url: '#', icon: 'tabler:circle'},
      //       ]
      //     },
      //   ]
      // },
    ],
    hasSearchToggle: false,
    hasThemeToggle: true,
  },
  hero: {
    background: import('src/assets/hero-bg.webp'),
    description: '本站当前正处于快速迭代期,Alpha站点:https://shirorikka-alpha.netlify.app/,无法访问是正常的QwQ',
  },
  sidebar: {
    widgets: [
      {
        name: 'profile',
        author: 'ShiroRikka',
        description: '爆裂吧,现实!粉碎吧,精神!Vanishment This World!',
        avatar: import('src/assets/avatar.webp'),
        background: import('src/assets/profile-bg.webp'),
        socialIcons: [
          {
            label: 'github',
            color: '#7c8690',
            icon: 'tabler:brand-github',
            url: 'https://www.bilibili.com/video/BV1GJ411x7h7/'
          },
          {
            label: 'bilibili',
            color: '#fc87b2',
            icon: 'tabler:brand-bilibili',
            url: 'https://space.bilibili.com/353878334'
          },
          {
            label: 'netease music',
            color: '#ff4e6a',
            icon: 'tabler:brand-netease-music',
            url: 'https://music.163.com/user/622616570'
          },
          {
            label: 'twitter',
            color: '#1d9bf0',
            icon: 'tabler:brand-twitter',
            url: 'https://x.com/ShiroRikka0'
          },
          {
            label: 'mail',
            color: '#7562c7',
            icon: 'tabler:mail',
            url: 'shirorikka0@gmail.com'
          }
        ],
      },
      {
        name: 'tag-cloud',
        sortBy: 'count',
        order: 'desc',
        limit: 30,
      },
      {
        name: 'category-tree',
        sortBy: 'count',
        order: 'desc',
        expandDepth: 2,
      },
      {
        name: 'component',
        component: import('@/components/custom/Recommend.astro'),
      },
    ]
  },
  pagination: {
    pageSize: 20,
    hasControls: true,
    hasEdges: false,
    siblings: 2,
    boundaries: 1,
  },
  article: {
    outdateTip: {
      outdateLimit: 180,
    },
    license: {
      licenseName: 'CC BY-NC-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh',
      infoText: '转载或引用本文时请注明作者及出处，不得用于商业用途。',
    }
  },
  comment: {
    provider: 'giscus',
    options: {
      repo: 'ShiroRikka/ShiroRikka.github.io',
      repoId: 'R_kgDOLBWqpw',
      category: 'Announcements',
      categoryId: 'DIC_kwDOLBWqp84CcQXE',
      mapping: 'pathname',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'top',
      lang: 'zh-CN'
    }
  },
  footer: {
    links: [
      { label: '更新日志', url: url('changelog')},
      { label: '引用声明', url: url('reference')},
      { label: '关于', url: url('about')},
      { label: '归档', url: url('archive')},
      { label: '友情链接', url: url('friends')},
      { label: 'Github', url: 'https://www.bilibili.com/video/BV1GJ411x7h7/'},
    ],
    declarations: [
      `Copyright © ${getYear(new Date())} ShiroRikka All Rights Reserved.`,
    ],
    generator: true,
    rss: true,
    sitemap: true,
  }
}

export default config;
