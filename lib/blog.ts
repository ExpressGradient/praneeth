import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Markdoc from "@markdoc/markdoc";

const postsDirectory = path.join(process.cwd(), "content", "blog");

export function getBlogPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      ...(data as { title: string; date: string }),
      content,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPost(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const ast = Markdoc.parse(content);
  const contentHtml = Markdoc.transform(ast);

  return {
    slug,
    ...(data as { title: string; date: string }),
    content: Markdoc.renderers.html(contentHtml),
  };
}
