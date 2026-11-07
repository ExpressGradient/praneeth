import fs from "fs";
import path from "path";
import Markdoc from "@markdoc/markdoc";
import { readMarkdown } from "./markdown";

const postsDirectory = path.join(process.cwd(), "content", "blog");

export function getBlogPosts() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"));
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const { data, content, description } = readMarkdown(fullPath);

    return {
      slug,
      ...(data as { title: string; date: string }),
      description,
      content,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPost(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const { data, content, description } = readMarkdown(fullPath);

  const ast = Markdoc.parse(content);
  const contentHtml = Markdoc.transform(ast);

  return {
    slug,
    ...(data as { title: string; date: string }),
    description,
    content: Markdoc.renderers.html(contentHtml),
  };
}
