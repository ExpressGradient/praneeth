import { Link, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { Blog, client } from "~/utils/graphql_client";
import { gql } from "graphql-request";

export const meta: MetaFunction = () => ({
    title: "Praneeth - Blogs",
    description: "All the blogs I've written",
});

export const loader: LoaderFunction = async () => {
    const { blogs }: { blogs: Array<Blog> } = await client.request(gql`
        query GetBlogPosts {
            blogs {
                id
                title
                preview
                createdAt
                categories
                slug
            }
        }
    `);

    const response = await fetch(
        `https://global-kind-goldfish-31724.upstash.io/hgetall/views`,
        {
            headers: {
                Authorization:
                    "AnvsACQgMWY4NTg2NTctNmRjNC00OThhLWJmOGEtZTU1ZDU1ODJiMjg0EuFLNu8wtqSwo4-3JDpzP2-4EMkrWsbSnpMpOVQDS5k=",
            },
        }
    );

    const { result: views }: { result: Array<string> } = await response.json();

    blogs.forEach((blog) => {
        blog["views"] = parseInt(views[views.indexOf(blog.id) + 1]);
    });

    return blogs;
};

export default function BlogsHome() {
    const blogs = useLoaderData<Array<Blog>>();

    return (
        <>
            <h2 className="text-2xl font-bold">Blog Posts</h2>
            <ul className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
                {blogs
                    .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
                    .map((blog) => (
                        <li
                            key={blog.id}
                            className="border rounded-md border-white p-4"
                        >
                            <Link
                                to={blog.slug}
                                className="hover:no-underline flex flex-col gap-y-2"
                                aria-label={`Link to ${blog.title}`}
                            >
                                <h3 className="text-xl font-bold">
                                    {blog.title}
                                </h3>
                                <ul className="flex gap-x-2">
                                    {blog.categories.map((category) => (
                                        <li
                                            key={category}
                                            className="border border-white rounded-full px-2 py-1 text-sm bg-gray-700"
                                        >
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-gray-300 text-sm">
                                    {blog.preview}
                                </p>
                                <p className="text-gray-300 text-sm">
                                    Created on:{" "}
                                    {new Date(blog.createdAt).toDateString()}
                                </p>
                                <p
                                    className="text-gray-300 text-sm flex items-center gap-x-1"
                                    aria-label={`Number of views: ${blog.views}`}
                                >
                                    <img src="eye_icon.svg" alt="Eye Icon" />{" "}
                                    <span>{blog.views}</span>
                                </p>
                            </Link>
                        </li>
                    ))}
            </ul>
        </>
    );
}
