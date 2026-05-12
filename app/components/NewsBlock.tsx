type NewsBlockProps = {
  category: string;
  title: string;
  content: string;
};

export default function NewsBlock({
  category,
  title,
  content,
}: NewsBlockProps) {
  return (
    <section className="mb-12 border-b border-gray-200 pb-10">
      <p className="text-sm uppercase tracking-wider text-red-700 font-semibold">
        {category}
      </p>

      <h2 className="text-3xl font-bold mt-2 leading-tight">
        {title}
      </h2>

      <p className="mt-4 text-lg leading-8 text-gray-700">
        {content}
      </p>
    </section>
  );
}