import Head from "next/head";
import Link from "next/link";
import Parkinsans from "next/font/local";

const parkinsans = Parkinsans({ src: "./Parkinsans-Variable.ttf" });

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({
  children,
  title = "Sai Praneeth",
  description = "Learn more about Sai Praneeth",
}: LayoutProps) {
  return (
    <div className={`${parkinsans.className} max-w-2xl mx-auto px-4 py-8`}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="mb-8">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-blue-600 hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-blue-600 hover:underline">
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Sai Praneeth
        <br />
        <Link href="/api/admin" className="text-blue-600">
          Admin
        </Link>
      </footer>
    </div>
  );
}
