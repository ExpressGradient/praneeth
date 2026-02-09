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
      <div className="mb-16">
        <h1 className="text-2xl font-bold tracking-tight mb-1">
          Diddigam Sai Praneeth
        </h1>
        <p className="text-[#525252] text-sm">engineer with skill issues</p>
      </div>

      <section>
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
