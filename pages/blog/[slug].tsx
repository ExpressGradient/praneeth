import { GetStaticPaths, GetStaticProps } from "next";
import { connectDB } from "../../utils/mongoClient";
import { BlogPost } from "../../utils/typeUtils";
import Page from "../../components/Page";
import Renderer from "../../components/Renderer";
import { useRouter } from "next/router";

const Blog = ({ blog }): JSX.Element => {
    const router = useRouter();

    if (router.isFallback) {
        return (
            <>
                <Page title={"Blog Fallback"} meta={"Blog Fallback"} />
                <h1 className="text-center text-2xl">Blog Loading...</h1>
            </>
        );
    }

    return (
        <>
            <Page title={`Praneeth - ${blog.title}`} meta={blog.meta} />
            <main className="mx-2 md:w-1/2 md:mx-auto">
                <article>
                    {blog.content.map((contentBlock, index) => {
                        return <Renderer {...contentBlock} key={index} />;
                    })}
                </article>
            </main>
        </>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const db = await connectDB("main");
    const blog: BlogPost = await db
        .collection("blogs")
        .findOne({ slug: params.slug });
    blog._id = blog._id.toString();
    blog.createdOn = new Date(Date.parse(blog.createdOn)).toString();

    return {
        props: {
            blog,
        },
        revalidate: 1000,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const db = await connectDB("main");
    const blogs: BlogPost[] = await db.collection("blogs").find().toArray();
    const paths = blogs.map((blog) => ({ params: { slug: blog.slug } }));

    return {
        paths,
        fallback: "blocking",
    };
};

export default Blog;
