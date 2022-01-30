import { Link } from "remix";

export default function Navbar() {
    return (
        <header className="flex items-center justify-between m-4 md:w-1/2 md:mx-auto">
            <Link to="/">
                <h3 className="text-3xl font-bold text-orange-400 md:text-4xl">
                    Praneeth
                </h3>
            </Link>
            <nav>
                <ul className="flex gap-x-3">
                    <li className="text-blue-600 hover:underline">
                        <Link to="/blogs">/blogs</Link>
                    </li>
                    <li className="text-blue-600 hover:underline">
                        <Link to="/projects">/projects</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
