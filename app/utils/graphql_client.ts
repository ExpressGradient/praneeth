import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(
    "https://praneeth-backend.graphcdn.app"
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
    }>;
};
