---
title: "如何自定义这个模板"
description: "从站点名、首页文案、内容目录和部署配置开始改。"
pubDate: "2026-05-30"
updatedDate: "2026-05-30"
pinned: false
tags: ["入门", "自定义"]
draft: false
---

拿到模板后，建议按下面的顺序修改。

## 1. 修改站点名

打开 `src/components/Layout.astro`，修改：

```ts
const siteName = "Your Blog";
const defaultDescription = "A simple personal blog";
```

## 2. 修改首页

首页内容在：

```text
src/content/site/home.md
```

你可以修改标题、副标题、简介和右侧列表。

## 3. 替换示例内容

内容目录包括：

```text
src/content/blog/
src/content/notes/
src/content/projects/
```

删除示例文件，换成自己的内容即可。

## 4. 检查构建

每次准备发布前运行：

```bash
npm run build
```
