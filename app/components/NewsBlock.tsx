type NewsBlockProps = {
  category: string;
  title: string;
  summary: string;
  source: string;
  readTime: string;
  publishedAt: string;
};

export default function NewsBlock({
  category,
  title,
  summary,
  source,
  readTime,
  publishedAt,
}: NewsBlockProps) {
  return (
    <section className="mb-12 border-b border-gray-200 pb-10">

      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">

        <span className="uppercase tracking-wider text-red-700 font-semibold">
          {category}
        </span>

        <span>•</span>

        <span>{publishedAt}</span>

        <span>•</span>

        <span>{readTime}</span>

      </div>

      <h2 className="text-3xl font-bold leading-tight">
        {title}
      </h2>

      <p className="mt-4 text-lg leading-8 text-gray-700">
        {summary}
      </p>

      <p className="mt-5 text-sm text-gray-500">
        Source: {source}
      </p>

    </section>
  );
}