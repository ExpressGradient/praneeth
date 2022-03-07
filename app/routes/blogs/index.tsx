import {
    ActionFunction,
    Form,
    Link,
    LoaderFunction,
    MetaFunction,
    useLoaderData,
    useTransition,
    useActionData,
} from "remix";
import { Blog, client } from "~/utils/graphql_client";
import { gql } from "graphql-request";
import { toast, Toaster } from "react-hot-toast";
import { useEffect } from "react";

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

export const action: ActionFunction = async ({ request }) => {
    try {
        const form = await request.formData();
        const email = form.get("email");

        const res = await fetch("https://api.buttondown.email/v1/subscribers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `TOKEN ${process.env.BUTTONDOWN_API_KEY}`,
            },
            body: JSON.stringify({
                email,
                referrer_url: "https://saipraneeth.in",
            }),
        });

        console.log(res.status);

        if (res.status === 201) {
            return new Response(
                '{"message": "You are now subscribed. Confirm your Email to start receiving blog posts."}',
                {
                    status: res.status,
                    headers: { "Content-Type": "application/json" },
                }
            );
        } else if (res.status === 400) {
            return new Response('{"message": "You are already subscribed"}', {
                status: res.status,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(
                '{"error": "Error while subscribing, try again after sometime."}',
                {
                    status: res.status,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }
    } catch (error) {
        return error;
    }
};

export function headers() {
    return { "Cache-Control": "max-age=60" };
}

export default function BlogsHome() {
    const blogs = useLoaderData<Array<Blog>>();
    const { state } = useTransition();
    const actionResponse = useActionData<{ message: string; error: string }>();

    useEffect(() => {
        if (actionResponse?.message) {
            toast(actionResponse.message, {
                icon: "👋",
            });
        } else if (actionResponse?.error) {
            toast.error(actionResponse.error);
        }
    }, [actionResponse]);

    return (
        <>
            <h2 className="text-2xl font-bold">Blog Posts</h2>

            <Form className="mt-4 border p-3 rounded-md" method="post">
                <label className="text-xl font-bold" htmlFor="email">
                    Subscribe to my NewsLetter
                </label>
                <div className="flex flex-col gap-y-4 md:flex-row gap-x-2 mt-3">
                    <input
                        type="email"
                        required={true}
                        name="email"
                        disabled={state === "submitting"}
                        placeholder="wonderfulyou@email.com"
                        className="w-full px-3 py-2 rounded bg-black text-white border focus:outline-none focus:ring focus:ring-white focus:ring-1"
                    />
                    <button
                        type="submit"
                        className="py-2 px-3 rounded bg-white text-black"
                    >
                        {state === "submitting"
                            ? "Subscribing..."
                            : "Subscribe"}
                    </button>
                </div>
            </Form>

            <Toaster />

            <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
                {blogs
                    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
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
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-300 text-sm">
                                        Created on:{" "}
                                        {new Date(
                                            blog.createdAt
                                        ).toDateString()}
                                    </p>
                                    <p
                                        className="text-gray-300 text-sm flex items-center gap-x-1"
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
        </>
    );
}
