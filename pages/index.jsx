import Head from "next/head";

export default function Index() {
    return (
        <>
            <Head>
                <title>Sai Praneeth</title>
            </Head>

            <div className="box flex flex-col gap-y-6">
                <header>
                    <h1>Sai Praneeth</h1>
                </header>

                <p id="short-description">
                    Gear Head | Computer Programmer | Writer | Shutterbug
                </p>
            </div>
        </>
    );
}
