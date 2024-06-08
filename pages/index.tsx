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

      <main className={`${redditMono.className} m-4 lg:w-1/2 lg:mx-auto`}>
        <div>
          <h4 className="text-lg lg:text-xl font-black uppercase">About</h4>

          <p>
            Hey there! I’m Sai, a deep learning engineer from Hyderabad, now
            living in Bengaluru. I started at{" "}
            <a href="https://thouc-labs.ai" className="text-blue-500">
              Thoucentric Labs
            </a>{" "}
            in 2022, kicking off with Next.js and Postgres before diving into
            Deep Learning. Now, I’m all about text, images, and figuring out how
            news can mess with forecasts. My latest obsession? Seeing just how
            powerful tiny language models can be.
          </p>

          <br />

          <p>
            Motorcycles are my escape. I love solo rides, whether it&apos;s just
            dinner out or a 1000km ride, 4-day trip to an off-grid coffee
            estate. I&apos;m a huge fan of Euro bikes, especially Ducati and
            Triumph. On weekends, you&apos;ll find me glued to F1 races,
            cheering for Sainz and Alonso like my life depends on it.
          </p>

          <br />

          <p>
            I recently got into speedcubing—my best time is 1:15, and I&apos;m
            determined to break the 1-minute mark. When I need a break, I
            binge-watch "The Big Bang Theory," "Dexter," and "Modern Family."
          </p>

          <br />

          <p>
            I&apos;m a world-class introvert with a tiny circle of friends. My
            dream job? One where I get to do math all day. I really miss it.
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
        </div>
      </main>
    </>
  );
}
