import Layout from "../../components/Layout";
import Link from "next/link";
import { getLabPosts } from "../../lib/lab";
import descriptions from "../../content/descriptions.json";

export default function LabIndex({ posts }: any) {
  return (
    <Layout title="Lab" description={descriptions.lab}>
      <h1 className="text-2xl font-bold tracking-tight mb-5">Lab</h1>
      <ul className="space-y-6">
        {posts.map((post: any) => (
          <li key={post.slug}>
            <Link
              href={`/lab/${post.slug}`}
              className="post-link -mx-3 flex min-h-11 items-center rounded-md px-3 py-2"
            >
              <div className="flex w-full flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h2>{post.title}</h2>
                <span className="shrink-0 text-sm">{post.date}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getLabPosts();
  return {
    props: {
      posts,
    },
  };
}
