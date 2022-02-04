import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient("https://praneeth-backend.graphcdn.app");

export type HomeLoaderQuery = {
    shortAbouts: Array<{
        content: string;
    }>;
    abouts: Array<{
        id: string;
        content: string;
    }>;
    journeys: Array<{
        id: string;
        title: string;
        description: string;
        organization: string;
        organizationLink: string;
        startDate: string;
        endDate: string;
        createdAt: string;
    }>;
};

export type ProjectLoaderQuery = {
    projects: Array<{
        id: string;
        title: string;
        description: string;
        projectLink: string;
        githubLink: string;
        created: string;
        image: {
            url: string;
        };
    }>;
};

export type BlogView = {
    id: string;
    content: string;
    createdAt: string;
    categories: Array<string>;
};
