import { MetaFunction } from "remix";

export const meta: MetaFunction = () => ({ title: "Praneeth - Blogs" });

export default function BlogsHome() {
    return (
        <>
            <h2 className="text-2xl font-bold">Blog Posts</h2>
        </>
    );
}
