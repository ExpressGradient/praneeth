import Head from "next/head";
import { Rubik_Mono_One } from "next/font/google";
import Link from "next/link";
import Header from "@/components/Header.tsx";

const rubikMonoOne = Rubik_Mono_One({ weight: "400", subsets: ["latin"] });

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

      <Header />

      <main className={`${rubikMonoOne.className} container mx-auto p-4`}>
        <section className="bg-white p-6 shadow-lg border-4 border-purple-500">
          <p>
            Hey there! I&apos;m Sai, a deep learning engineer from Hyderabad,
            now living in Bengaluru. I started my career at{" "}
            <a href="https://thouc-labs.ai" className="text-blue-500">
              Thoucentric Labs
            </a>{" "}
            in 2022, kicking off with Next.js and Postgres before diving into
            Deep Learning. Now, I&apos;m all about text, images, and figuring
            out how news can mess with forecasts. My latest obsession? Seeing
            just how powerful tiny language models can be.
          </p>

          <br />

          <p>
            Motorcycles are my escape. I love solo rides, whether it&apos;s just
            dinner out or a 1000km ride, 4-day trip to an off-grid coffee
            estate. I&apos;m a huge fan of Euro bikes, especially Ducati and
            Triumph. On weekends, you&apos;ll find me glued to F1 races,
            cheering for Verstappen and Sainz like my life depends on it.
          </p>

          <br />

          <p>
            I recently got into speedcubing—my best time is 1:15, and I&apos;m
            determined to break the 1-minute mark. When I need a break, I watch
            &ldquo;The Big Bang Theory&rdquo;, and &ldquo;House, M.D.&rdquo;
          </p>

          <br />

          <p>
            I&apos;m a world-class introvert with a tiny circle of friends. My
            dream job? One where I get to do math all day.
          </p>

          <br />

          <p>
            Oh, and I&apos;m a vegetarian who loves spicy South Indian dishes. I
            also take what I believe are good photos of nature and shapes.
            Sorting out my life one thread at a time, just trying to get by and
            maybe, just maybe, get a little better at this whole life thing.
          </p>

          <br />

          <p>Welcome to my world. It&apos;s a bit messy.</p>
        </section>
      </main>

      <footer className={`${rubikMonoOne.className} my-3 mx-6`}>
        <Link href="/api/admin" className="text-xs text-blue-500">
          Admin
        </Link>
      </footer>
    </>
  );
}
