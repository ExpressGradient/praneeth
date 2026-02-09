import Layout from "../../components/Layout";
import Link from "next/link";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import type { GetStaticProps, GetStaticPaths } from "next";

interface BlogPostProps {
  post: {
    slug: string;
    title: string;
    date: string;
    content: string;
  };
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <Layout title={post.title}>
      <article>
        <div className="mb-10">
          <Link
            href="/blog"
            className="text-[#525252] text-sm hover:text-[#a3a3a3] transition-colors duration-200"
          >
            &larr; back
          </Link>
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">{post.title}</h1>
        <p className="text-[#525252] text-sm mb-10">{post.date}</p>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getBlogPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // @ts-ignore
  const post = await getBlogPost(params.slug as string);

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
