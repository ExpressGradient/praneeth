import { gql } from "graphql-request";
import { LoaderFunction, useLoaderData } from "remix";
import { BlogView, client } from "~/utils/graphql_client";
import { marked } from "marked";

export const loader: LoaderFunction = async ({ params }) => {
    const { blog } = await client.request(
        gql`
            query GetSingleBlogPost($slug: String!) {
                blog(where: { slug: $slug }) {
                    id
                    content
                    createdAt
                    categories
                }
            }
        `,
        { slug: params.slug }
    );

    if (!blog) {
        throw new Response("Blog not found", { status: 404 });
    }

    // Increment views
    await fetch(
        `https://global-kind-goldfish-31724.upstash.io/incr/${blog.id}`,
        {
            headers: {
                Authorization:
                    "AXvsACQgMWY4NTg2NTctNmRjNC00OThhLWJmOGEtZTU1ZDU1ODJiMjg0ODIwNjA2NTUzMmM3NDI3MmEyNDJkYWQ0MDAwNDgyNjY=",
            },
        }
    );

    return blog;
};

export default function BlogPostView() {
    const blog = useLoaderData<BlogView>();

    return (
        <section className="flex flex-col gap-y-4">
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

            <article
                dangerouslySetInnerHTML={{ __html: marked.parse(blog.content) }}
                className="prose prose-invert max-w-none"
            />

            <p className="text-sm">
                Wrote with 😑 mood on: {new Date(blog.createdAt).toDateString()}
            </p>
        </section>
    );
}
