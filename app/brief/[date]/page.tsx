import { supabaseServer } from "@/lib/supabase-server";
import type { BriefRow } from "@/types/supabase";


type Story = {
  id?: string;
  category: string;
  title: string;
  summary: string;
  source: string;
  readTime: string;
  publishedAt: string;
};

type Brief = {
  slug: string;
  date: string;
  heroTitle: string;
  heroDescription: string;
  stories: Story[];
};

async function getBrief(date: string): Promise<BriefRow | null> {
  const { data, error } = await supabaseServer
    .from("briefs")
    .select("*")
    .eq("slug", date);

  if (error) {
    console.log(error);
    return null;
  }

  return data?.[0] ?? null;
}

export default async function BriefPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;

  const brief = await getBrief(date);
  
  if (!brief) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F7F3EB]">
        <h1 className="text-3xl font-bold">Brief not found.</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F3EB] text-black">

      {/* Navbar */}
      <nav className="border-b border-gray-200 px-6 py-5">

        <div className="max-w-5xl mx-auto flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            Atlas Minute
          </h1>

          <button className="border border-black px-4 py-2 rounded-xl text-sm">
            Join Newsletter
          </button>

        </div>

      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 py-14">

        <p className="uppercase tracking-[0.3em] text-sm text-gray-500">
          Moroccan Daily Briefing
        </p>

        <h1 className="text-6xl font-bold leading-tight mt-5">
          {brief.heroTitle}
        </h1>

        <p className="text-xl text-gray-600 mt-8 leading-8 max-w-3xl">
          {brief.heroDescription}
        </p>

        <p className="mt-4 text-gray-500">
          {brief.date}
        </p>

      </section>

      {/* Stories */}
      <section className="max-w-3xl mx-auto px-6">

        <div className="">

          {brief.stories?.map((story, index) => (
            <article
              key={story.id || index}
              className="py-10 border-b border-gray-300"
            >

              <p className="text-sm uppercase tracking-wider text-red-700 font-semibold">
                {story.category}
              </p>

              <h2 className="text-3xl font-bold mt-4 leading-tight">
                {story.title}
              </h2>

              <p className="mt-5 text-lg leading-8 text-gray-700">
                {story.summary}
              </p>

              <div className="mt-6 flex gap-5 text-sm text-gray-500">

                <span>{story.source}</span>
                <span>{story.readTime}</span>
                <span>{story.publishedAt}</span>

              </div>

            </article>
          ))}

        </div>

      </section>

    </main>
  );
}