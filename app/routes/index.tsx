import Navbar from "~/components/navbar";
import { LoaderFunction, MetaFunction, useLoaderData, Link } from "remix";
import { client, HomeLoaderQuery } from "~/utils/graphql_client";
import { gql } from "graphql-request";

export const meta: MetaFunction = () => {
    return { title: "Praneeth - Home" };
};

export const loader: LoaderFunction = async () => {
    const query = gql`
        query GetAllAbouts {
            shortAbouts {
                content
            }
            abouts {
                id
                content
            }
            journeys {
                id
                title
                description
                organization
                organizationLink
                startDate
                endDate
                createdAt
            }
        }
    `;

    return await client.request(query);
};

export function headers() {
    return { "Cache-Control": "max-age=900" };
}

export default function Home() {
    const data = useLoaderData<HomeLoaderQuery>();

    return (
        <>
            <Navbar />
            <main className="flex flex-col mx-4 mt-8 gap-y-8 md:w-1/2 md:mx-auto">
                <h1 className="text-xl font-bold md:text-2xl">
                    {data.shortAbouts[0].content}
                </h1>

                <hr />

                <section>
                    <h2 className="text-3xl font-bold text-orange-400">
                        <Link to="#about-me">About Me</Link>
                    </h2>

                    <ul className="mt-2">
                        {data.abouts.map((about) => (
                            <li
                                key={about.id}
                                className="list-disc list-inside"
                            >
                                {about.content}
                            </li>
                        ))}
                    </ul>
                </section>

                <hr />

                <section>
                    <h2 className="text-3xl font-bold text-orange-400">
                        <Link to="#journey">Journey</Link>
                    </h2>

                    <ul className="flex flex-col mt-2 gap-y-3">
                        {data.journeys
                            .sort((a, b) => {
                                return a.createdAt > b.createdAt ? -1 : 1;
                            })
                            .map((journey) => (
                                <li
                                    key={journey.id}
                                    className="list-disc list-inside"
                                >
                                    {journey.endDate ? "Worked" : "Working"} as
                                    a{" "}
                                    <span className="font-bold">
                                        {journey.title}
                                    </span>{" "}
                                    at{" "}
                                    <a
                                        href={journey.organizationLink}
                                        className="italic hover:underline hover:underline-offset-4"
                                    >
                                        {journey.organization}
                                    </a>{" "}
                                    from {journey.startDate.substring(0, 4)}{" "}
                                    {journey.endDate
                                        ? "to " +
                                          journey.endDate.substring(0, 4)
                                        : ""}
                                    .
                                    <br />
                                    <span className="italic text-gray-300">
                                        {journey.description}
                                    </span>
                                </li>
                            ))}
                    </ul>
                </section>

                <hr />

                <section>
                    <h2 className="text-3xl font-bold text-orange-400">
                        <Link to="#socials">Socials</Link>
                    </h2>

                    <ul className="flex flex-col mt-2 gap-y-3">
                        <li>
                            <a
                                href="https://twitter.com/ExpressGradient"
                                className="flex items-center gap-x-2"
                                aria-label="Twitter ExpressGradient"
                            >
                                <img
                                    src="./twitter_icon.svg"
                                    alt="Twitter Icon"
                                />
                                <span>ExpressGradient</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://github.com/ExpressGradient"
                                className="flex items-center gap-x-2"
                                aria-label="GitHub ExpressGradient"
                            >
                                <img
                                    src="./github_icon.svg"
                                    alt="GitHub Icon"
                                />
                                <span>ExpressGradient</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.linkedin.com/in/sai-praneeth-diddigam/"
                                className="flex items-center gap-x-2"
                                aria-label="LinkedIn Sai Praneeth Diddigam"
                            >
                                <img
                                    src="./linkedin_icon.svg"
                                    alt="LinkedIn Icon"
                                />
                                <span>Sai Praneeth Diddigam</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:sai.praneeth.diddigam@gmail.com"
                                className="flex items-center gap-x-2"
                                aria-label="Mail sai.praneeth.diddigam@gmail.com"
                            >
                                <img src="./mail_icon.svg" alt="Mail Icon" />
                                <span>sai.praneeth.diddigam@gmail.com</span>
                            </a>
                        </li>
                    </ul>
                </section>

                <hr className="invisible" />
                <hr className="invisible" />
                <hr className="invisible" />
            </main>
        </>
    );
}
