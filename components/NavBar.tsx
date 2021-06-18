import Link from "next/link";

const NavBar = (): JSX.Element => (
    <header className="mx-2 p-2 border-b-2 border-black md:flex md:justify-between md:items-center">
        <Link href="/">
            <a>
                <h1 className="text-2xl md:text-3xl text-center md:text-left">
                    Praneeth
                </h1>
            </a>
        </Link>
        <nav className="flex justify-center gap-x-2.5 md:text-lg">
            <Link href="/blogs">
                <a className="text-blue-700 underline hover:text-blue-400">
                    /blogs
                </a>
            </Link>
            <Link href="/projects">
                <a className="text-blue-700 underline hover:text-blue-400">
                    /projects
                </a>
            </Link>
        </nav>
    </header>
);
export default NavBar;
