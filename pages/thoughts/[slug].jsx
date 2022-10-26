import Head from "next/head";
import Footer from "../../shared/footer";
import Header from "../../shared/header";
import { getThought, getThoughts } from "../../utils/content";

export default function Thought({ thought }) {
    return (
        <div className="box list gap-y-6">
            <Head>
                <title>Sai Praneeth - {thought.title}</title>
                <meta
                    name="description"
                    content={`Now reading ${thought.title} thought post`}
                />
                <meta
                    property="og:image"
                    content={`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?description=Now reading ${thought.title} thought post`}
                />
            </Head>

            <Header
                shortDesc={`Now reading the "${thought.title}" thought. Published on ${thought.publishedAt}.`}
            />

            <hr className="border border-gray-500" />

            <main className="max-w-none">
                <article
                    className="prose prose-invert prose-sm lg:prose-base w-full max-w-none mx-auto"
                    dangerouslySetInnerHTML={{ __html: thought.body }}
                />
            </main>

            <hr className="border border-gray-400" />

            <Footer />
        </div>
    );
}

export async function getStaticProps({ params }) {
    const thought = getThought(params.slug);

    return { props: { thought } };
}

export async function getStaticPaths() {
    const thoughts = getThoughts();

    const paths = thoughts.map((thought) => ({
        params: { slug: thought.slug },
    }));

    return {
        paths,
        fallback: false,
    };
}
