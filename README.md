# Blog Template

一个适合新手上手的 Astro 个人博客模板。你可以用它快速搭建自己的博客、笔记和项目展示页，然后部署成静态网站。

## 适合谁

- 想做个人博客，但不想从空项目开始
- 想用 Markdown 写文章、笔记和项目记录
- 想部署到 GitHub Pages、Vercel、Netlify 或自己的服务器
- 想学习 Astro 的基础项目结构

## 技术栈

- Astro
- Tailwind CSS 4
- Markdown / MDX
- Astro Content Collections
- 静态站点生成

## 快速开始
先下载源文件：
```bash
git clone https://github.com/QiuXiaoye1112/blog-template.git
```
```bash
cd blog-template
```
```bash
npm install
npm run dev
```

打开终端显示的本地地址，通常是：

```text
http://localhost:4321
```

## 常用命令

```bash
npm run dev      # 本地开发
npm run build    # 构建静态网站到 dist/
npm run preview  # 本地预览构建结果

npm run new:post "文章标题"
npm run new:note "笔记标题"
npm run new:project "项目名称"
```

## 你最先需要改哪里

1. 修改站点基础信息：
   - `src/components/Layout.astro`
   - `src/components/Footer.astro`
   - `astro.config.mjs`

2. 修改首页内容：
   - `src/content/site/home.md`

3. 写自己的内容：
   - 文章：`src/content/blog/`
   - 笔记：`src/content/notes/`
   - 项目：`src/content/projects/`

4. 替换图片：
   - 背景图：`public/images/site/background.jpg`
   - 文章图片：`public/images/blog/`

## 目录说明

```text
src/
  components/        # 页面组件
  content/
    blog/            # 博客文章
    notes/           # 短笔记
    projects/        # 项目展示
    site/            # 首页配置内容
  pages/             # 页面路由
  styles/
    global.css       # 全局样式

docs/
  content-guide.md   # 内容写作指南

scripts/
  new-content.mjs    # 快速创建内容脚本

deploy/
  nginx-example.conf # Nginx 部署示例
```

## 新增文章

```bash
npm run new:post "我的第一篇博客"
```

生成的文件会在：

```text
src/content/blog/
```

发布前把 frontmatter 里的 `draft` 改为 `false`：

```yaml
draft: false
```

## 新增笔记

```bash
npm run new:note "常用命令记录"
```

生成的文件会在：

```text
src/content/notes/
```

## 新增项目

```bash
npm run new:project "我的作品集网站"
```

生成的文件会在：

```text
src/content/projects/
```

如果想让项目出现在首页精选区，把项目 frontmatter 改成：

```yaml
featured: true
```

## 部署

先构建：

```bash
npm run build
```

构建结果在：

```text
dist/
```

你可以把 `dist/` 部署到任意静态网站平台，例如 GitHub Pages、Vercel、Netlify、Cloudflare Pages，或者自己的 Nginx 服务器。

如果部署到自己的服务器，可以参考：

- `deploy/nginx-example.conf`
- `deploy.sh`

使用前请把里面的占位内容改成自己的服务器地址、域名和部署目录。

## 自定义站点名

在 `src/components/Layout.astro` 中修改：

```ts
const siteName = "Your Blog";
const defaultDescription = "A simple personal blog";
```

在 `astro.config.mjs` 中修改：

```js
site: "https://your-domain.com"
```

## License

MIT
