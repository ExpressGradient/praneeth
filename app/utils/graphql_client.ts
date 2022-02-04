import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(
    "https://api-ap-south-1.graphcms.com/v2/ckyv4u2o706xr01y28o8sh64y/master"
);

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
