import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const type = process.argv[2];
const title = process.argv.slice(3).join(" ").trim();

const contentTypes = {
  blog: {
    directory: "src/content/blog",
    label: "博客文章",
    template: createBlogTemplate,
  },
  note: {
    directory: "src/content/notes",
    label: "短笔记",
    template: createNoteTemplate,
  },
  project: {
    directory: "src/content/projects",
    label: "项目",
    template: createProjectTemplate,
  },
};

if (!contentTypes[type]) {
  exitWithHelp("内容类型不正确。");
}

if (!title) {
  exitWithHelp("请提供标题。");
}

const date = getToday();
const slug = createSlug(title);
const filePath = path.join(process.cwd(), contentTypes[type].directory, `${date}-${slug}.md`);

if (existsSync(filePath)) {
  console.error(`文件已存在，已停止创建：${filePath}`);
  process.exit(1);
}

await mkdir(path.dirname(filePath), { recursive: true });
await writeFile(filePath, contentTypes[type].template({ title, date }), "utf8");

console.log(`${contentTypes[type].label}草稿已创建：`);
console.log(filePath);

function createBlogTemplate({ title, date }) {
  return `---
title: ${JSON.stringify(title)}
description: "TODO: 写一句话摘要"
pubDate: "${date}"
updatedDate: "${date}"
pinned: false
tags: []
draft: true
---

这里开始写正文。
`;
}

function createNoteTemplate({ title, date }) {
  return `---
title: ${JSON.stringify(title)}
description: "TODO: 写一句话说明这条笔记"
pubDate: "${date}"
updatedDate: "${date}"
pinned: false
tags: []
draft: true
---

这里开始写笔记内容。
`;
}

function createProjectTemplate({ title, date }) {
  return `---
title: ${JSON.stringify(title)}
description: "TODO: 写一句话项目简介"
pubDate: "${date}"
updatedDate: "${date}"
status: "计划中"
tech: []
github: ""
demo: ""
featured: false
draft: true
---

这里写项目背景、目标、技术方案和当前进展。
`;
}

function createSlug(value) {
  const asciiWords = value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  return asciiWords || String(Date.now());
}

function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function exitWithHelp(message) {
  console.error(message);
  console.error("");
  console.error("用法：");
  console.error('  npm run new:post "文章标题"');
  console.error('  npm run new:note "笔记标题"');
  console.error('  npm run new:project "项目名称"');
  process.exit(1);
}
