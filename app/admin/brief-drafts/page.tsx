import { supabaseServer } from "@/lib/supabase-server";
import Link from "next/link";

async function getDrafts() {
  const { data } = await supabaseServer
    .from("brief_drafts")
    .select("*")
    .order("created_at", { ascending: false });

  return data || [];
}

export default async function Page() {
  const drafts = await getDrafts();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Brief Drafts</h1>

      <div className="mt-6 space-y-4">
        {drafts.map((d) => (
          <div key={d.id} className="border p-4 rounded">
            <h2 className="font-bold">{d.heroTitle}</h2>
            <p className="text-sm text-gray-500">{d.date}</p>

            <Link
              className="text-blue-500"
              href={`/admin/brief-drafts/${d.slug}`}
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}