import { Rubik_Mono_One } from "next/font/google";
import Link from "next/link";

const rubikMonoOne = Rubik_Mono_One({ weight: "400", subsets: ["latin"] });

export default function Header() {
  return (
    <header className={`${rubikMonoOne.className} bg-yellow-300 p-4 shadow-lg`}>
      <nav className="flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="text-2xl">
          Sai
        </Link>

        <div className="space-x-4">
          <Link href="/">🏠Home</Link>
          <Link href="/blog">📝Blog</Link>
          {/* <a href='https://www.instagram.com/whodissai/' target='_blank' rel='noopener noreferrer'>📷Photos</a> */}
        </div>
      </nav>
    </header>
  );
}
