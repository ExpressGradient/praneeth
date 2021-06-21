import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import Page from "../components/Page";
import { connectDB } from "../utils/mongoClient";
import { BlogPost } from "../utils/typeUtils";

const BlogsIndex = ({
    blogs,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => (
    <>
        <Page title="Praneeth - Blogs List" meta="Sai Praneeth's Blogs" />
        <main className="mx-2 md:w-1/2 md:mx-auto">
            <h3 className="text-2xl underline text-center my-2">Blogs List</h3>
            <ul className="tracking-tight">
                {blogs
                    .slice(0)
                    .reverse()
                    .map((blog) => (
                        <li
                            key={blog._id}
                            className="p-3 mb-3 rounded-md shadow cursor-pointer hover:shadow-lg active:shadow-none"
                        >
                            <Link href={`/blog/${blog.slug}`}>
                                <a>
                                    <h4 className="text-lg md:text-xl">
                                        {blog.title}
                                    </h4>
                                    <p className="text-gray-700">{blog.meta}</p>
                                    <p className="text-gray-500">
                                        on {blog.createdOn}
                                    </p>
                                </a>
                            </Link>
                        </li>
                    ))}
            </ul>
        </main>
    </>
);

export const getStaticProps = async () => {
    const db = await connectDB("main");
    const blogs: BlogPost[] = await db.collection("blogs").find().toArray();
    blogs.forEach((blog) => {
        blog._id = blog._id.toString();
        const date = new Date(Date.parse(blog.createdOn)).getDate().toString();
        const month = new Date(Date.parse(blog.createdOn))
            .getMonth()
            .toString();
        const year = new Date(Date.parse(blog.createdOn))
            .getFullYear()
            .toString();
        blog.createdOn = `${date}-${month}-${year}`;
    });

    return {
        props: {
            blogs,
        },
        revalidate: 1000,
    };
};

export default BlogsIndex;
