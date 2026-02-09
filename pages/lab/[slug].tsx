import Layout from "../../components/Layout";
import Link from "next/link";
import { getLabPost, getLabPosts } from "@/lib/lab";
import type { GetStaticProps, GetStaticPaths } from "next";

interface LabPostProps {
  post: {
    slug: string;
    title: string;
    date: string;
    content: string;
  };
}

export default function LabPost({ post }: LabPostProps) {
  return (
    <Layout title={post.title}>
      <article>
        <div className="mb-10">
          <Link
            href="/lab"
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
