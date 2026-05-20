import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { error } = await supabaseServer
      .from("brief_drafts")
      .update({
        heroTitle: body.heroTitle,
        heroDescription: body.heroDescription,
        stories: body.stories,
      })
      .eq("slug", body.slug);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message,
      },
      { status: 500 }
    );
  }
}