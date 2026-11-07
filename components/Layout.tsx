import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import descriptions from "../content/descriptions.json";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string | null;
}

export default function Layout({
  children,
  title = "Sai Praneeth",
  description,
}: LayoutProps) {
  const router = useRouter();
  const path = router.pathname;
  const metaDescription = description?.trim() || descriptions.default;

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/lab", label: "Lab" },
  ];

  return (
    <div className="font-sans min-h-screen bg-[#eff1f5] text-[15px] text-[#30323d]">
      <div className="max-w-2xl mx-auto px-6 pt-6 pb-12">
        <Head>
          <title>{title}</title>
          <meta name="description" content={metaDescription} />
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={metaDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Sai Praneeth" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={metaDescription} />
          <meta name="theme-color" content="#eff1f5" />
        </Head>

        <header className="mb-8">
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
                  aria-current={path === item.href ? "page" : undefined}
                  className={`site-link text-[15px] leading-normal${isActive ? " site-link-current" : ""}`}
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
              className="site-link text-xs"
            >
              hi@saipraneeth.in
            </a>
            <Link
              href="/api/admin"
              className="site-link text-xs"
            >
              admin
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
