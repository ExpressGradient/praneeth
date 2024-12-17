import Layout from "../../components/Layout";
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
    <Layout title={`${post.title}`}>
      <article>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-4">{post.date}</p>
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
