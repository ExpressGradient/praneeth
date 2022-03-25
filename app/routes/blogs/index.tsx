import { Link, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { Blog, client } from "~/utils/graphql_client";
import { gql } from "graphql-request";

export const meta: MetaFunction = () => ({
    title: "Praneeth - Blogs",
    description: "All the blogs I've written",
});

export const loader: LoaderFunction = async () => {
    console.log("/blogs hit");

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

    console.log(blogs);

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

    console.log(views);

    blogs.forEach((blog) => {
        blog["views"] = parseInt(views[views.indexOf(blog.id) + 1]);
    });

    return blogs;
};

export function headers() {
    return { "Cache-Control": "max-age=60" };
}

export default function BlogsHome() {
    const blogs = useLoaderData<Array<Blog>>();

    return (
        <>
            <h2 className="text-2xl font-bold">Blog Posts</h2>

            <ul className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 auto-rows-fr">
                {blogs
                    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                    .map((blog) => (
                        <li
                            key={blog.id}
                            className="p-4 border border-white rounded-md"
                        >
                            <Link
                                to={blog.slug}
                                className="flex flex-col hover:no-underline gap-y-2"
                                aria-label={`Link to ${blog.title}`}
                            >
                                <h3 className="text-xl font-bold">
                                    {blog.title}
                                </h3>
                                <ul className="flex gap-x-2">
                                    {blog.categories.map((category) => (
                                        <li
                                            key={category}
                                            className="px-2 py-1 text-sm bg-gray-700 border border-white rounded-full"
                                        >
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-sm text-gray-300">
                                    {blog.preview}
                                </p>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-300">
                                        Created on:{" "}
                                        {new Date(
                                            blog.createdAt
                                        ).toDateString()}
                                    </p>
                                    <p
                                        className="flex items-center text-sm text-gray-300 gap-x-1"
                                        aria-label={`Number of views: ${blog.views}`}
                                    >
                                        <img
                                            src="eye_icon.svg"
                                            alt="Eye Icon"
                                        />{" "}
                                        <span>{blog.views}</span>
                                    </p>
                                </div>
                            </Link>
                        </li>
                    ))}
            </ul>

            <hr className="invisible" />
            <hr className="invisible" />
            <hr className="invisible" />
            <hr className="invisible" />
        </>
    );
}
