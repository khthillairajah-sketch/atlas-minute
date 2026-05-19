import { NextResponse } from "next/server";
import Parser from "rss-parser";
import { supabaseServer } from "@/lib/supabase-server";


const parser = new Parser({
  customFields: {
    item: ["content:encoded", "enclosure"],
  },
});

const FEEDS = [
  {
    source: "Morocco World News",
    url: "https://www.moroccoworldnews.com/feed",
    category: "General",
  },
  {
    source: "Yabiladi",
    url: "https://www.yabiladi.com/rss",
    category: "General",
  },
  {
    source: "Le Desk",
    url: "https://ledesk.ma/feed",
    category: "Politics",
  },
  {
    source: "TelQuel",
    url: "https://telquel.ma/feed",
    category: "Politics",
  },
];

export async function GET() {
  try {
    let insertedCount = 0;
    let failedCount = 0;

    for (const feed of FEEDS) {
      try {
        const rss = await parser.parseURL(feed.url);

        console.log("FEED:", feed.source);
        console.log("ITEM COUNT:", rss.items.length);

        if (rss.items?.length > 0) {
          console.log("SAMPLE ITEM:", rss.items[0]);
        }

        for (const item of rss.items.slice(0, 5)) {
          const title = item.title || "";
          const summary =
            item.contentSnippet ||
            item.content ||
            item.summary ||
            (item as any).description ||
            "";

          const url = item.link || "";

          // skip broken entries
          if (!title || !url) continue;

          const { error } = await supabaseServer.from("drafts").insert({
            title,
            summary,
            url,
            source: feed.source,
            category: feed.category,
            published_at:
              item.pubDate || new Date().toISOString(),
            status: "draft",
          });

          if (error) {
            failedCount++;
            console.log(
              `INSERT ERROR (${feed.source}):`,
              error.message
            );
          } else {
            insertedCount++;
          }
        }
      } catch (e: any) {
        console.log(
          "FEED FAILED:",
          feed.source,
          feed.url,
          e.message
        );
      }
    }

    return NextResponse.json({
      success: true,
      inserted: insertedCount,
      failed: failedCount,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}