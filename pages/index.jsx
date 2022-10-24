import Head from "next/head";
import Link from "next/link";

export default function Index() {
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

            <div className="box list gap-y-6 min-h-screen">
                <header className="list gap-y-6">
                    <h1>Sai Praneeth</h1>

                    <p id="short-description">
                        Gear Head | Computer Programmer | Writer | Shutterbug |
                        Bibliophile
                    </p>
                </header>

                <main className="list gap-y-6">
                    <section id="thoughts">
                        <h2 className="section-heading">Thoughts</h2>
                    </section>

                    <section id="snaps">
                        <h2 className="section-heading">Snaps</h2>
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

                <footer id="contact">
                    <p>
                        Wanna talk? Reach me at{" "}
                        <Link href="mailto://sai.praneeth.diddigam@gmail.com?subject=Hey there, I've just seen your website. Let's talk.">
                            <a>sai.praneeth.diddigam@gmail.com</a>
                        </Link>{" "}
                        or{" "}
                        <Link href="https://twitter.com/ExpressGradient">
                            <a target="_blank" rel="noreferrer noopener">
                                @ExpressGradient
                            </a>
                        </Link>
                        .
                    </p>
                </footer>
            </div>
        </>
    );
}
