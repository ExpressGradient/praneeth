import Footer from "../../shared/footer";
import Header from "../../shared/header";
import { getThought, getThoughts } from "../../utils/content";

export default function Thought({ thought }) {
    return (
        <div className="box list gap-y-6">
            <Header
                shortDesc={`Now reading the "${thought.title}" thought. Published on ${thought.publishedAt}.`}
            />

            <hr className="border border-gray-500" />

            <main>
                <article
                    className="prose prose-invert md:prose-lg lg:prose-xl"
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
