import Layout from "../components/Layout";
import Link from "next/link";
import descriptions from "../content/descriptions.json";

export default function NotFound() {
  return (
    <Layout title="404" description={descriptions.notFound}>
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-6xl font-bold mb-6">404</h1>
        <p className="text-[#6c6f85] mb-8">
          you&apos;re in the wrong place mf
        </p>
        <Link href="/" className="site-link text-sm">
          &larr; go back home
        </Link>
      </div>
    </Layout>
  );
}
