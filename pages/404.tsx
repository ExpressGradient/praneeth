import Layout from "../components/Layout";
import Link from "next/link";

export default function NotFound() {
  return (
    <Layout title="404">
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-6xl font-bold mb-6">404</h1>
        <p className="text-[#a3a3a3] mb-8">
          you&apos;re in the wrong place mf
        </p>
        <Link
          href="/"
          className="text-sm text-[#525252] hover:text-[#ededed] transition-colors duration-200"
        >
          &larr; go back home
        </Link>
      </div>
    </Layout>
  );
}
