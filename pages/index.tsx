import Layout from "../components/Layout";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Markdoc from "@markdoc/markdoc";

interface HomeProps {
  about: string;
}

export default function Home({ about }: HomeProps) {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Diddigam Sai Praneeth</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">About Me</h2>
        <div className="prose" dangerouslySetInnerHTML={{ __html: about }} />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const aboutPath = path.join(process.cwd(), "content", "about.md");
  const fileContents = fs.readFileSync(aboutPath, "utf8");
  const { content } = matter(fileContents);

  const ast = Markdoc.parse(content);
  const transformedContent = Markdoc.transform(ast);
  const htmlContent = Markdoc.renderers.html(transformedContent);

  return {
    props: {
      about: htmlContent,
    },
  };
}
