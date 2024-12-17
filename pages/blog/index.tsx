import Layout from "../../components/Layout";
import Link from "next/link";
import { getBlogPosts } from "../../lib/blog";

export default function BlogIndex({ posts }: any) {
  return (
    <Layout title="Blog Posts">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      <ul className="space-y-4">
        {posts.map((post: any) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="block">
              <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                {post.title}
              </h2>
              <p className="text-gray-600">{post.date}</p>
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
