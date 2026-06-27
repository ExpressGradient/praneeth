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
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a] font-sans text-[#ededed]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_18%_18%,rgba(115,115,115,0.14),transparent_28%),radial-gradient(circle_at_78%_4%,rgba(229,229,229,0.08),transparent_24%),linear-gradient(115deg,transparent_0%,transparent_44%,rgba(115,115,115,0.08)_45%,transparent_46%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
      />
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
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
          <meta name="theme-color" content="#0a0a0a" />
        </Head>

        <header className="mb-16">
          <nav className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive =
                item.href === "/" ? path === "/" : path.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-[#ededed]"
                      : "text-[#737373] hover:text-[#a3a3a3]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <main>{children}</main>

        <footer className="mt-20 pt-8 border-t border-[#1a1a1a] flex items-center justify-between">
          <p className="text-[#525252] text-xs">
            &copy; {new Date().getFullYear()} Sai Praneeth
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:hi@saipraneeth.in"
              className="text-[#525252] text-xs hover:text-[#a3a3a3] transition-colors duration-200"
            >
              hi@saipraneeth.in
            </a>
            <Link
              href="/api/admin"
              className="text-[#525252] text-xs hover:text-[#a3a3a3] transition-colors duration-200"
            >
              admin
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
