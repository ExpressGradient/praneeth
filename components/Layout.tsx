import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { JetBrains_Mono } from "next/font/google";

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
});

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
    <div
      className={`${jetbrains_mono.className} min-h-screen bg-[#0a0a0a] text-[#ededed]`}
    >
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="icon" href="/favicon.ico" />
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

        <footer className="mt-20 pt-8 border-t border-[#1a1a1a]">
          <p className="text-[#525252] text-xs">
            &copy; {new Date().getFullYear()} Sai Praneeth
          </p>
        </footer>
      </div>
    </div>
  );
}
