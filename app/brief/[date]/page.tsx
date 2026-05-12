import { briefs } from "@/app/data/briefs";
import NewsBlock from "@/app/components/NewsBlock";

export default async function DailyBriefPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;

  const brief = briefs.find((b) => b.slug === date);

  if (!brief) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Brief not found.</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F3EB] text-black">

      <nav className="border-b border-gray-200 px-6 py-5 bg-[#F7F3EB]">
        <div className="max-w-5xl mx-auto flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            Atlas Minute
          </h1>

          <button className="border border-black px-4 py-2 rounded-xl text-sm">
            Join Newsletter
          </button>

        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-14">

        <div className="mb-16">

          <p className="uppercase tracking-[0.3em] text-sm text-gray-500">
            Daily Briefing
          </p>

          <h1 className="text-6xl font-bold mt-4 leading-tight">
            {brief.heroTitle}
          </h1>

          <p className="mt-6 text-xl text-gray-600 leading-8">
            {brief.heroDescription}
          </p>

          <p className="mt-4 text-gray-500">
            {brief.date}
          </p>

        </div>

        {brief.stories.map((story, index) => (
          <NewsBlock
            key={index}
            category={story.category}
            title={story.title}
            content={story.content}
          />
        ))}

      </div>

    </main>
  );
}