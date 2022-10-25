import Head from "next/head";
import Link from "next/link";
import Footer from "../shared/footer";
import Header from "../shared/header";
import { getThoughts } from "../utils/content";

export default function Index({ thoughts }) {
    return (
        <>
            <Head>
                <title>Sai Praneeth</title>
                <meta
                    name="description"
                    content="Gear Head | Computer Programmer | Writer | Shutterbug |
                        Bibliophile"
                />
                <meta
                    name="keywords"
                    content="Sai Praneeth, Personal Website, Blog"
                />
            </Head>

            <div className="box list gap-y-6">
                <Header />

                <hr className="border border-gray-500" />

                <main className="list gap-y-6">
                    <section id="thoughts" className="list gap-y-4">
                        <h2 className="section-heading">Thoughts</h2>
                        <ul className="list list-inside list-disc gap-y-2">
                            {thoughts.map((thought) => (
                                <li key={thought.id}>
                                    <Link href={`/thoughts/${thought.slug}`}>
                                        <a>
                                            {thought.title} on{" "}
                                            {thought.publishedAt}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section id="snaps" className="list gap-y-4">
                        <h2 className="section-heading">Snaps</h2>
                        <p>No snaps as of now...</p>
                    </section>

                    <section id="books" className="list gap-y-4">
                        <h2 className="section-heading">Books</h2>
                        <ul className="list list-inside list-disc gap-y-2">
                            <li>Atomic Habits by John Clear</li>
                            <li>
                                The Hitchhiker&apos;s Guide to the Galaxy by
                                Douglas Adams
                            </li>
                            <li>The Foundation by Issac Asimov</li>
                            <li>The Theory of Everything by Stephen Hawking</li>
                        </ul>
                    </section>

                    <section id="jobs" className="list gap-y-4">
                        <h2 className="section-heading">Jobs</h2>
                        <ul className="list-inside list-disc list gap-y-2">
                            <li>
                                Full Stack Developer at Thoucentric Labs from
                                Jul-2022 to undefined😎.
                            </li>
                            <li>
                                Full Stack Developer Intern at Thoucentric Labs
                                from Jan-2022 to Jun-2022.
                            </li>
                        </ul>
                    </section>
                </main>

                <hr className="border border-gray-500" />

                <Footer />
            </div>
        </>
    );
}

export async function getStaticProps() {
    const thoughts = getThoughts();

    return { props: { thoughts } };
}
