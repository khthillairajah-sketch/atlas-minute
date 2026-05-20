import { supabaseServer } from "@/lib/supabase-server";
import ReviewEditor from "./ReviewEditor";

async function getDraftBrief() {
  const { data, error } = await supabaseServer
    .from("brief_drafts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.log(error);
    return null;
  }

  return data?.[0] ?? null;
}

export default async function ReviewPage() {
  const brief = await getDraftBrief();

  if (!brief) {
    return (
      <main className="p-10">
        <h1 className="text-3xl font-bold">
          No draft brief found.
        </h1>
      </main>
    );
  }

  return <ReviewEditor initialBrief={brief} />;
}