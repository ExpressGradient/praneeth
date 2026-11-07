import Layout from "../../components/Layout";
import Link from "next/link";
import { getLabPost, getLabPosts } from "@/lib/lab";
import type { GetStaticProps, GetStaticPaths } from "next";

interface LabPostProps {
  post: {
    slug: string;
    title: string;
    date: string;
    description: string | null;
    content: string;
  };
}

export default function LabPost({ post }: LabPostProps) {
  return (
    <Layout title={post.title} description={post.description}>
      <article>
        <div className="mb-4">
          <Link href="/lab" className="site-link text-sm">
            &larr; back
          </Link>
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">{post.title}</h1>
        <p className="text-[#8c8fa1] text-sm mb-6">{post.date}</p>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getLabPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // @ts-ignore
  const post = await getLabPost(params.slug as string);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};
