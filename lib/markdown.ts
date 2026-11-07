import fs from "fs";
import matter from "gray-matter";

export function readMarkdown(filePath: string) {
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  const description = typeof data.description === "string" ? data.description : null;

  return { data, content, description };
}
