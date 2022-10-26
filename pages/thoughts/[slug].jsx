import Head from "next/head";
import Footer from "../../shared/footer";
import Header from "../../shared/header";
import { getThought, getThoughts } from "../../utils/content";

export default function Thought({ thought }) {
    const title = `Sai Praneeth's Thought: ${thought.title}`;
    const description = `Now reading ${thought.title} thought post`;

    return (
        <div className="box list gap-y-6">
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta
                    property="og:image"
                    content={`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?description=${description}`}
                />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@ExpressGradient" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta
                    name="twitter:image"
                    content={`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?description=${description}`}
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
