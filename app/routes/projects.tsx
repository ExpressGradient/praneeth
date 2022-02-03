import { gql } from "graphql-request";
import { LoaderFunction, MetaFunction, useLoaderData } from "remix";
import Navbar from "~/components/navbar";
import { client, ProjectLoaderQuery } from "~/utils/graphql_client";

export const meta: MetaFunction = () => {
    return {
        title: "Praneeth - Projects",
        description: "See all the projects I've worked upon",
    };
};

export const loader: LoaderFunction = async () => {
    return await client.request(gql`
        query GetAllProjects {
            projects {
                id
                title
                description
                projectLink
                githubLink
                created
                image {
                    url
                }
            }
        }
    `);
};

export default function Projects() {
    const data = useLoaderData<ProjectLoaderQuery>();

    return (
        <>
            <Navbar />
            <main className="flex flex-col mx-4 mt-4 gap-y-6 md:w-1/2 md:mx-auto">
                <h3 className="text-2xl font-bold">Projects</h3>

                <ul className="grid grid-flow-row grid-cols-1 gap-4 auto-rows-fr md:grid-cols-2">
                    {data.projects
                        .sort((a, b) => {
                            return a.created > b.created ? -1 : 1;
                        })
                        .map((project) => (
                            <li
                                key={project.id}
                                className="flex flex-col border border-white rounded-md gap-y-2"
                            >
                                <img
                                    src={project.image.url}
                                    alt={project.title + " Preview Image"}
                                    className="rounded-md"
                                />
                                <div className="flex flex-col p-3 gap-y-2">
                                    <h5 className="text-xl">{project.title}</h5>
                                    <p className="text-sm text-gray-300">
                                        {project.description}
                                    </p>
                                    <div className="flex text-sm gap-x-3">
                                        <a
                                            className="flex items-center px-3 py-1 bg-blue-700 rounded gap-x-1"
                                            href={project.projectLink}
                                            aria-label="Project Link"
                                        >
                                            <img src="link_icon.svg" />
                                            <p>Visit Project</p>
                                        </a>
                                        <a
                                            className="flex items-center px-3 py-1 bg-gray-600 rounded gap-x-1"
                                            href={project.githubLink}
                                            aria-label="GitHub Link"
                                        >
                                            <img src="github_icon.svg" />
                                            <p>View Source Code</p>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        ))}
                </ul>
            </main>
        </>
    );
}
