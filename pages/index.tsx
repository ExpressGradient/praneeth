import Page from "../components/Page";
import Link from "next/link";
import Image from "next/image";

const Home = (): JSX.Element => {
    return (
        <>
            <Page
                title="Praneeth - Home"
                meta="Sai Praneeth's Personal Website"
            />
            <main className="m-2 md:w-1/3 md:mx-auto">
                <h1 className="text-2xl md:text-4xl text-center">
                    Hello there 👋!!!
                </h1>
                <h3 className="text-xl md:text-2xl mt-4 underline">
                    A little about me:
                </h3>
                <ul className="list-disc list-inside tracking-tight md:text-lg">
                    <li>My name is Sai Praneeth.</li>
                    <li>I&apos;m a Computer Science Undergrad.</li>
                    <li>I code, learn, cook and watch TV.</li>
                    <li>
                        Right now, I&apos;m building a product which will speed
                        up the process of creating backend for any application.
                    </li>
                </ul>
                <h3 className="text-xl md:text-2xl mt-4 underline">
                    Social Media:
                </h3>
                <ul className="tracking-tight md:text-lg">
                    <li>
                        <Link href="https://github.com/ExpressGradient">
                            <a className="text-blue-700 underline flex items-center">
                                <Image
                                    src="/github_icon.svg"
                                    width={20}
                                    height={20}
                                    alt="GitHub Icon"
                                />
                                <span className="ml-1">GitHub</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://twitter.com/ExpressGradient">
                            <a className="text-blue-700 underline flex items-center">
                                <Image
                                    src="/twitter_icon.svg"
                                    width={20}
                                    height={20}
                                    alt="Twitter Icon"
                                />
                                <span className="ml-1">Twitter</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="mailto:sai.praneeth.diddigam@gmail.com">
                            <a className="text-blue-700 underline flex items-center">
                                <Image
                                    src="/mail_icon.svg"
                                    width={20}
                                    height={20}
                                    alt="Mail Icon"
                                />
                                <span className="ml-1">Mail</span>
                            </a>
                        </Link>
                    </li>
                </ul>
            </main>
        </>
    );
};

export default Home;
