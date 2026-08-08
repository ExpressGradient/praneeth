import Layout from "../components/Layout";
import Link from "next/link";

export default function NotFound() {
  return (
    <Layout title="404">
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-6xl font-bold mb-6">404</h1>
        <p className="text-[#6c6f85] mb-8">
          you&apos;re in the wrong place mf
        </p>
        <Link
          href="/"
          className="text-sm text-[#8c8fa1] hover:text-[#4c4f69] transition-colors duration-200"
        >
          &larr; go back home
        </Link>
      </div>
    </Layout>
  );
}
