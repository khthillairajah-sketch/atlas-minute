import Link from "next/link";
import { getBaseUrl } from "@/lib/baseUrl";
import { supabaseServer } from "@/lib/supabase-server";

type Story = {
  title: string;
  summary: string;
};

type Brief = {
  slug: string;
  date: string;
  stories: Story[];
};

async function getBriefs() {
  const { data, error } = await supabaseServer
    .from("briefs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return { briefs: [] };
  }

  return { briefs: data || [] };
}

export default async function HomePage() {
  const data = await getBriefs();

  const briefs: Brief[] = data?.briefs || [];
  const latestBrief = briefs[0];

  return (
    <main className="min-h-screen bg-[#F7F3EB] text-black">
      
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
            href={latestBrief ? `/brief/${latestBrief.slug}` : "#"}
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

          {latestBrief && (
            <Link href={`/brief/${latestBrief.slug}`}>

              <div className="mt-5 bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition cursor-pointer">

                <p className="text-sm text-gray-500">
                  {latestBrief.date}
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {latestBrief.stories?.[0]?.title ?? "No title"}
                </h2>

                <p className="mt-5 text-lg text-gray-700 leading-8">
                  {latestBrief.stories?.[0]?.summary ?? "No summary"}
                </p>

              </div>

            </Link>
          )}

          {!latestBrief && (
            <p className="mt-5 text-gray-500">
              No briefs published yet.
            </p>
          )}

        </div>

      </section>

      {/* Archive */}
      <section className="max-w-5xl mx-auto px-6 pb-24">

        <div className="border-t border-gray-300 pt-10">

          <h3 className="text-3xl font-bold">
            Previous Briefings
          </h3>

          <div className="mt-8 space-y-4">

            {briefs.length > 0 ? (
              briefs.map((brief) => (
                <Link
                  key={brief.slug}
                  href={`/brief/${brief.slug}`}
                  className="block bg-white p-6 rounded-2xl hover:shadow-md transition"
                >

                  <p className="text-sm text-gray-500">
                    {brief.date}
                  </p>

                  <h4 className="text-2xl font-semibold mt-2">
                    {brief.stories?.[0]?.title}
                  </h4>

                </Link>
              ))
            ) : (
              <p className="text-gray-500">
                No archive available yet.
              </p>
            )}

          </div>

        </div>

      </section>

    </main>
  );
}