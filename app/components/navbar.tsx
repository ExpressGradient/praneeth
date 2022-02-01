import { NavLink, Link } from "remix";

export default function Navbar() {
    return (
        <header className="flex items-center justify-between m-4 md:w-1/2 md:mx-auto">
            <Link to="/">
                <h3 className="text-3xl font-bold text-orange-400 md:text-4xl">
                    Praneeth
                </h3>
            </Link>
            <nav>
                <ul className="flex text-blue-500 gap-x-3">
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? "underline underline-offset-4" : ""
                            }
                            to="/blogs"
                        >
                            /blogs
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? "underline underline-offset-4" : ""
                            }
                            to="/projects"
                        >
                            /projects
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
