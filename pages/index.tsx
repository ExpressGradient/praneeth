import Layout from "../components/Layout";
import path from "path";
import Markdoc from "@markdoc/markdoc";
import { readMarkdown } from "@/lib/markdown";

interface HomeProps {
  about: string;
  description: string | null;
}

export default function Home({ about, description }: HomeProps) {
  return (
    <Layout description={description}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-1">
          Diddigam Sai Praneeth
        </h1>
        <p className="text-[#6c6f85] text-[15px]">engineer with skill issues</p>
      </div>

      <section>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: about }}
        />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const aboutPath = path.join(process.cwd(), "content", "about.md");
  const { content, description } = readMarkdown(aboutPath);

  const ast = Markdoc.parse(content);
  const transformedContent = Markdoc.transform(ast);
  const htmlContent = Markdoc.renderers.html(transformedContent);

  return {
    props: {
      about: htmlContent,
      description,
    },
  };
}
