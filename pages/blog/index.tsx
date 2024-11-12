import Head from "next/head";
import { Borel } from "next/font/google";
import Link from "next/link";
import Header from "@/components/Header";

const borel = Borel({ weight: "400", subsets: ["latin"] });

function ArticleLink({
  slug,
  title,
  publishedOn,
}: {
  slug: string;
  title: string;
  publishedOn: string;
}) {
  return (
    <li className="bg-white p-4 shadow-lg border-2 border-blue-500">
      <Link href={`/blog/${slug}`} className="block hover:text-pink-600">
        <h2 className="text-2xl mb-2 text-purple-700">{title}</h2>
        <p className="text-sm text-blue-600">{publishedOn}</p>
      </Link>
    </li>
  );
}

export default function BlogIndex() {
  return (
    <>
      <Head>
        <title>Sai Praneeth - Blog</title>
        <meta name="description" content="Sai Praneeth - Blog" />
      </Head>

      <Header />

      <main className={`${borel.className} container mx-auto p-4`}>
        <ul className="space-y-4">
          <ArticleLink
            slug={"hello-world"}
            title={"Hello World"}
            publishedOn={"11-11-2024"}
          />
        </ul>
      </main>
    </>
  );
}
