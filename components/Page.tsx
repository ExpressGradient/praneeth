import NavBar from "./NavBar";
import Head from "next/head";

type PageProps = {
    title: string;
    meta: string;
};

const Page = ({ title, meta }: PageProps): JSX.Element => (
    <>
        <Head>
            <title>{title}</title>
            <meta name="description" content={meta} />
            <meta name="author" content="Sai Praneeth" />
        </Head>
        <NavBar />
    </>
);

export default Page;
