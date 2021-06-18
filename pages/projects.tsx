import { InferGetStaticPropsType } from "next";
import client from "../utils/mongoClient";
import { Project } from "../utils/typeUtils";
import Page from "../components/Page";
import Link from "next/link";
import Image from "next/image";

const Projects = ({
    projects,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => (
    <>
        <Page
            title="Praneeth - Projects"
            meta="All the projects that I've done"
        />
        <main className="mx-2 md:w-1/2 md:mx-auto">
            <h2 className="text-center text-2xl my-2 underline">Projects</h2>
            <ul>
                {projects
                    .slice(0)
                    .reverse()
                    .map((project) => (
                        <li
                            key={project._id}
                            className="p-3 mb-3 rounded-md shadow cursor-pointer hover:shadow-lg active:shadow-none"
                        >
                            <Link href={project.link}>
                                <a>
                                    <div className="flex gap-x-2 items-center">
                                        <Image
                                            src="/link_icon.svg"
                                            width={18}
                                            height={18}
                                            alt="Link Icon"
                                        />
                                        <h4 className="text-lg md:text-xl">
                                            {project.name}
                                        </h4>
                                    </div>
                                    <p className="text-gray-700 text-sm">
                                        {project.description}
                                    </p>
                                    <ul className="flex gap-x-4 flex-wrap">
                                        {project.technologies.map(
                                            (technology, index) => (
                                                <li
                                                    key={index}
                                                    className="px-3 py-1 rounded-full text-white bg-gray-700 shadow-md mt-2 text-sm md:text-base"
                                                >
                                                    {technology}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </a>
                            </Link>
                        </li>
                    ))}
            </ul>
        </main>
    </>
);

export const getStaticProps = async () => {
    await client.connect();
    const db = client.db("main");
    const projects: Project[] = await db
        .collection("projects")
        .find()
        .toArray();
    projects.forEach((project) => (project._id = project._id.toString()));
    await client.close();

    return {
        props: {
            projects,
        },
        revalidate: 1000,
    };
};

export default Projects;
