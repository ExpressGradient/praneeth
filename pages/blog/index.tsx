import Layout from "../../components/Layout";
import Link from "next/link";
import { getBlogPosts } from "../../lib/blog";

export default function BlogIndex({ posts }: any) {
  return (
    <Layout title="Blog">
      <h1 className="text-2xl font-bold tracking-tight mb-10">blog</h1>
      <ul className="space-y-6">
        {posts.map((post: any) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block -mx-3 px-3 py-2 rounded-md hover:bg-[#111] transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h2 className="text-[#ededed] group-hover:text-[#a3a3a3] transition-colors duration-200">
                  {post.title}
                </h2>
                <span className="text-[#525252] text-sm shrink-0">
                  {post.date}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getBlogPosts();
  return {
    props: {
      posts,
    },
  };
}
