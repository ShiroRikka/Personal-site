# ShiroRikka's Blog

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)
[![Netlify Status](https://api.netlify.com/api/v1/badges/f603c52a-adbe-413d-a035-df609eb41392/deploy-status)](https://app.netlify.com/sites/wider/deploys)

这是我的个人博客源代码，使用 [Astro](https://astro.build) 构建，部署在 [Netlify](https://netlify.com) 上。

- 博客地址: [ShiroRikka的小窝](https://shirorikka.netlify.app/)

## 主要特性

- [x] Markdown 和 MDX 支持
- [x] 增强的 Markdown 语法
- [x] 响应式设计
- [x] RSS 订阅
- [x] 网站地图
- [x] Algolia 搜索
- [x] 评论系统
- [x] 暗色模式
- [x] 分页功能
- [x] 页面过渡动画
- [x] TypeScript 支持
- [x] 文章过期提示
- [x] 文章许可证信息

## 目录结构概览

```
├── src/                    # 源代码目录
│   ├── assets/            # 静态资源文件
│   ├── components/        # 可复用组件
│   ├── content/          # 内容数据
│   ├── hooks/            # React Hooks
│   ├── layouts/          # 页面布局模板
│   ├── pages/            # 路由页面
│   ├── partials/         # 页面部分组件
│   ├── store/            # 状态管理
│   ├── styles/           # 全局样式
│   ├── types/            # TypeScript 类型定义
│   ├── utils/            # 工具函数
│   ├── config.ts         # 全局配置
│   ├── constants.ts      # 常量定义
│   ├── env.d.ts          # 环境变量类型声明
│   └── shim.d.ts         # 类型补充声明
├── public/               # 静态资源目录
├── plugins/              # 自定义插件
└── scripts/              # 脚本工具
```

## 核心目录说明

### src/components/
组件目录采用功能模块化组织，包含：
- 文章相关组件（ArticleLicense, ArticleOutdateTip, PostCard, PostMeta等）
- 导航组件（Navbar, Menu等）
- UI基础组件（Button, Icon, Image等）
- 功能组件（Search, ThemeToggle, Toc等）

### src/content/
存放网站内容数据：
- authors/ - 作者信息
- blog/ - 博客文章
- friends/ - 友链数据

### src/layouts/
页面布局模板：
- Html.astro - 基础HTML模板
- MarkdownLayout.astro - Markdown页面布局
- PageLayout.astro - 普通页面布局
- PostLayout.astro - 文章页面布局

### src/pages/
按照路由组织的页面文件：
- [...page].astro - 博客首页（分页）
- posts/ - 文章页面
- categories/ - 分类页面
- tags/ - 标签页面
- archive/ - 归档页面

### src/utils/
工具函数集合：
- 内容处理（getPosts, getTags, getCategories等）
- 分页处理（createPaginator）
- 时间处理（getFileCreateTime, getFileUpdateTime）
- 数据转换（transformCategory, transformTags）

### plugins/
自定义Astro插件：
- rehype/ - HTML处理插件
- remark/ - Markdown处理插件

## 技术特点

1. 清晰的模块化组织结构
2. 完善的TypeScript类型支持
3. 组件化开发，高度可复用
4. 合理的资源文件组织
5. 插件化的功能扩展机制

## 开发规范

1. 组件采用功能模块化组织
2. 页面路由遵循Astro文件路由约定
3. 工具函数按照功能分类
4. 类型定义集中管理
5. 配置文件统一维护