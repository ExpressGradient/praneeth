import Head from "next/head";
import { Borel } from "next/font/google";
import Link from "next/link";
import Header from "@/components/Header";

const borel = Borel({ weight: "400", subsets: ["latin"] });

export default function HelloWorld() {
  return (
    <>
      <Head>
        <title>Sai Praneeth - Hello World</title>
        <meta name="description" content="Sai Praneeth - Hello World" />
      </Head>

      <Header />

      <main className={`${borel.className} container mx-auto p-4`}>
        <article>
          <h1>Hello World</h1>
          <p>11-11-2024</p>

          <div className="mt-4 space-y-3">
            <p>Just a simple hello world . Nothing crazy to look at</p>
          </div>
        </article>
      </main>
    </>
  );
}
