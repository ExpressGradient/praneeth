import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const path = router.pathname;

  const navItems = [
    { href: "/", label: "home" },
    { href: "/blog", label: "blog" },
    { href: "/lab", label: "lab" },
  ];

  return (
    <div className="font-sans min-h-screen bg-[#eff1f5] text-[#4c4f69]">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Sai Praneeth" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="theme-color" content="#eff1f5" />
        </Head>

        <header className="mb-16">
          <nav className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? path === "/"
                  : path.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-[#1e66f5]"
                      : "text-[#6c6f85] hover:text-[#4c4f69]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <main>{children}</main>

        <footer className="mt-20 pt-8 border-t border-[#ccd0da] flex items-center justify-between">
          <p className="text-[#8c8fa1] text-xs">
            &copy; {new Date().getFullYear()} Sai Praneeth
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:hi@saipraneeth.in"
              className="text-[#8c8fa1] text-xs hover:text-[#1e66f5] transition-colors duration-200"
            >
              hi@saipraneeth.in
            </a>
            <Link
              href="/api/admin"
              className="text-[#8c8fa1] text-xs hover:text-[#1e66f5] transition-colors duration-200"
            >
              admin
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
