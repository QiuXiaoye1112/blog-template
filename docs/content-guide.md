# 内容写作指南

这个模板把内容分成三类：博客、笔记、项目。

## 博客

博客适合写相对完整的文章，例如学习总结、技术教程、项目复盘。

```bash
npm run new:post "我的第一篇博客"
```

示例 frontmatter：

```yaml
---
title: "我的第一篇博客"
description: "用一句话说明这篇文章讲什么"
pubDate: "2026-05-31"
updatedDate: "2026-05-31"
pinned: false
tags: ["Astro", "博客"]
draft: false
---
```

## 笔记

笔记适合记录短内容，例如命令、清单、配置片段、问题排查步骤。

```bash
npm run new:note "常用 Git 命令"
```

## 项目

项目适合展示你做过或正在做的作品。

```bash
npm run new:project "个人作品集网站"
```

项目状态支持：

```text
计划中
进行中
已完成
```

如果想显示在首页精选项目里：

```yaml
featured: true
```

## 草稿

未写完的内容可以设置：

```yaml
draft: true
```

发布时改成：

```yaml
draft: false
```

## 图片

图片建议放在 `public/images/` 下，然后这样引用：

```md
![图片说明](/images/blog/example.png)
```

## 推荐写作流程

1. 用命令创建草稿。
2. 写 frontmatter。
3. 补正文内容。
4. 本地运行 `npm run dev` 检查效果。
5. 改 `draft: false`。
6. 运行 `npm run build`。
7. 提交并部署。
