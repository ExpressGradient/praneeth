import Layout from "../../components/Layout";
import Link from "next/link";
import { getMLPosts } from "../../lib/ml";

export default function MLIndex({ posts }: any) {
  return (
    <Layout title="Machine Learning">
      <h1 className="text-3xl font-extrabold mb-4">Machine Learning</h1>
      <ul className="space-y-4">
        {posts.map((post: any) => (
          <li key={post.slug}>
            <Link href={`/ml/${post.slug}`} className="block">
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
  const posts = getMLPosts();
  return {
    props: {
      posts,
    },
  };
}
