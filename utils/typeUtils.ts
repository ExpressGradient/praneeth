export type BlogPost = {
    _id: string;
    title: string;
    slug: string;
    content: {
        type: string;
        block: string;
    }[];
    createdOn: any;
    meta: string;
};

export type Project = {
    _id: string;
    name: string;
    description: string;
    technologies: string[];
    link: string;
};
