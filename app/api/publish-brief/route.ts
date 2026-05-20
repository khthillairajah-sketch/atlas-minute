import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(req: Request) {
  const { slug } = await req.json();

  // 1. get draft
  const { data: draft } = await supabaseServer
    .from("brief_drafts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!draft) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // 2. move to published briefs
  const { error: insertError } = await supabaseServer
    .from("briefs")
    .upsert([draft], { onConflict: "slug" });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  // 3. delete draft (optional but recommended)
  await supabaseServer
    .from("brief_drafts")
    .delete()
    .eq("slug", slug);

  return NextResponse.json({ success: true });
}