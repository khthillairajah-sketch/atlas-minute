import Link from "next/link";
import { briefs } from "@/app/data/briefs";

export default function HomePage() {
  const latestBrief = briefs[0];

  return (
    <main className="min-h-screen bg-[#F7F3EB] text-black">

      {/* Navbar */}
      <nav className="border-b border-gray-200 px-6 py-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            Atlas Minute
          </h1>

          <button className="border border-black px-4 py-2 rounded-xl text-sm">
            Join Newsletter
          </button>

        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-24">

        <p className="uppercase tracking-[0.3em] text-sm text-gray-500">
          Moroccan Daily Briefing
        </p>

        <h1 className="text-7xl font-bold leading-tight mt-5">
          Morocco in 3 minutes.
        </h1>

        <p className="text-xl text-gray-600 mt-8 leading-8 max-w-2xl">
          A concise and unbiased daily briefing for Moroccans around the world.
        </p>

        <div className="mt-10 flex gap-4">

          <Link
            href={`/brief/${latestBrief.slug}`}
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            Read Today’s Brief
          </Link>

          <button className="border border-black px-6 py-3 rounded-xl">
            Join Newsletter
          </button>

        </div>

      </section>

      {/* Latest Brief */}
      <section className="max-w-5xl mx-auto px-6 pb-20">

        <div className="border-t border-gray-300 pt-10">

          <p className="uppercase text-sm tracking-wider text-gray-500">
            Latest Edition
          </p>

          <Link href={`/brief/${latestBrief.slug}`}>

            <div className="mt-5 bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition cursor-pointer">

              <p className="text-sm text-gray-500">
                {latestBrief.date}
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {latestBrief.stories[0].title}
              </h2>

              <p className="mt-5 text-lg text-gray-700 leading-8">
                {latestBrief.stories[0].content}
              </p>

            </div>

          </Link>

        </div>

      </section>

      {/* Archive */}
      <section className="max-w-5xl mx-auto px-6 pb-24">

        <div className="border-t border-gray-300 pt-10">

          <h3 className="text-3xl font-bold">
            Previous Briefings
          </h3>

          <div className="mt-8 space-y-4">

            {briefs.map((brief) => (
              <Link
                key={brief.slug}
                href={`/brief/${brief.slug}`}
                className="block bg-white p-6 rounded-2xl hover:shadow-md transition"
              >

                <p className="text-sm text-gray-500">
                  {brief.date}
                </p>

                <h4 className="text-2xl font-semibold mt-2">
                  {brief.stories[0].title}
                </h4>

              </Link>
            ))}

          </div>

        </div>

      </section>

    </main>
  );
}