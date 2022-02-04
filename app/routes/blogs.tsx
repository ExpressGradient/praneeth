import { Outlet } from "remix";
import Navbar from "~/components/navbar";

export default function Blogs() {
    return (
        <>
            <Navbar />
            <main className="mx-4 md:w-1/2 md:mx-auto">
                <Outlet />
            </main>
        </>
    );
}
