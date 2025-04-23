import Layout from "../../components/Layout";
import { getMlPost, getMLPosts } from "@/lib/ml";
import type { GetStaticProps, GetStaticPaths } from "next";

interface MLPostProps {
  post: {
    slug: string;
    title: string;
    date: string;
    content: string;
  };
}

export default function MLPost({ post }: MLPostProps) {
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
  const posts = getMLPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // @ts-ignore
  const post = await getMlPost(params.slug as string);

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
