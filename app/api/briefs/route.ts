import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabase";

const filePath = path.join(process.cwd(), "app/data/database.json");

function readDB() {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeDB(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET all briefs
export async function GET() {
  const { data, error } = await supabase
    .from("briefs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    briefs: data,
  });
}

// CREATE brief
export async function POST(req: Request) {
  const body = await req.json();

  // generate stable slug once
  const slug =
    body.slug ||
    body.date
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/\//g, "-");

  const payload = {
    ...body,
    slug,
  };

  const { error } = await supabase
    .from("briefs")
    .insert([payload]);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

// UPDATE brief
export async function PUT(req: Request) {
  const body = await req.json();

  const { error } = await supabase
    .from("briefs")
    .update(body)
    .eq("slug", body.slug);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

// DELETE brief
export async function DELETE(req: Request) {
  const { slug } = await req.json();

  const { error } = await supabase
    .from("briefs")
    .delete()
    .eq("slug", slug);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}