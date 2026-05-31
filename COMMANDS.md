# Blog Template 常用命令

## 安装依赖

```bash
npm install
```

## 本地开发

```bash
npm run dev
```

默认访问：

```text
http://localhost:4321
```

## 构建和预览

```bash
npm run build
npm run preview
```

## 创建内容

```bash
npm run new:post "文章标题"
npm run new:note "笔记标题"
npm run new:project "项目名称"
```

## 发布内容

把对应 Markdown 文件里的：

```yaml
draft: true
```

改成：

```yaml
draft: false
```

然后重新构建：

```bash
npm run build
```

## Git 提交流程

```bash
git status
git add .
git commit -m "Update content"
git push
```

## 部署到自己的服务器

先修改 `deploy.sh` 里的占位信息：

```bash
REMOTE_USER="root"
REMOTE_HOST="your-server-ip"
REMOTE_DIR="/var/www/your-blog"
```

再执行：

```bash
bash deploy.sh
```
