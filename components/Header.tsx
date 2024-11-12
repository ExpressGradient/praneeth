import { Borel } from "next/font/google";
import Link from "next/link";

const borel = Borel({ weight: "400", subsets: ["latin"] });

export default function Header() {
  return (
    <header className={`${borel.className} bg-yellow-300 p-4 shadow-lg`}>
      <nav className="flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="text-2xl">
          SAI
        </Link>

        <div className="space-x-4">
          <Link href="/">HOME</Link>
          <Link href="/blog">BLOG</Link>
          {/* <a href='https://www.instagram.com/whodissai/' target='_blank' rel='noopener noreferrer'>📷Photos</a> */}
        </div>
      </nav>
    </header>
  );
}
