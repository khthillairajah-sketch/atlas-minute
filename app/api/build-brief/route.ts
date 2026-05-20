import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { buildBrief } from "@/src/lib/news/buildBrief";
import type { Cluster } from "@/src/lib/news/clusterEngine";
import { normalizeDate } from "@/lib/utils/date";

export async function GET() {
  const { data: drafts, error } = await supabaseAdmin
    .from("drafts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!drafts || drafts.length === 0) {
    return NextResponse.json({ error: "No drafts found" });
  }

  const clusters = buildBrief(drafts); 

  const stories = (clusters as Cluster[]).map((cluster) => {
    const main = cluster.articles[0];

    return {
      id: cluster.id,
      category: main.category || "General",
      title: main.title,
      summary: main.summary || "",
      source: main.source,
      readTime: "2 min",
      publishedAt: main.published_at,
      related: cluster.articles.slice(1).map((a) => ({
        title: a.title,
        url: a.url,
        source: a.source,
      })),
    };
  });


  const date = normalizeDate(new Date());
  const slug = date;

  const briefPayload = {
    slug,
    date,
    heroTitle: stories[0]?.title || "Today in Morocco",
    heroDescription:
      stories[0]?.summary || "Key news clustered and summarized.",
    stories,
  };

  const { error: insertError } = await supabaseAdmin
    .from("brief_drafts")
    .upsert([briefPayload], { onConflict: "slug" });

  if (insertError) {
    return NextResponse.json(
      { error: insertError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    clusters: clusters.length,
    stories: stories.length,
  });
}