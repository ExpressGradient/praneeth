import Head from "next/head";
import { Reddit_Mono } from "next/font/google";
import Link from "next/link";

const redditMono = Reddit_Mono({ subsets: ["latin"] });

export default function Index() {
  return (
    <>
      <Head>
        <title>Sai Praneeth</title>
        <meta
          name="description"
          content="Know more about Sai Praneeth Diddigam"
        />
      </Head>

      <header
        className={`${redditMono.className} m-4 text-center lg:text-left lg:w-1/2 lg:mx-auto`}
      >
        <h2 className="text-2xl lg:text-3xl font-black uppercase">
          <Link href="/">Diddigam Sai Praneeth</Link>
        </h2>
      </header>
    </>
  );
}
