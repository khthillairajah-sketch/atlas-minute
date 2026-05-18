"use client";

import { useState, useEffect } from "react";
import { getBaseUrl } from "@/lib/baseUrl";

type Story = {
  id: string;
  category: string;
  title: string;
  summary: string;
  source: string;
  readTime: string;
  publishedAt: string;
};

export default function AdminPage() {
  const [date, setDate] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");

  const [stories, setStories] = useState<Story[]>([]);
  const [existingBriefs, setExistingBriefs] = useState<any[]>([]);
  const [editingSlug, setEditingSlug] = useState("");

  function addStory() {
    setStories([
      ...stories,
      {
        id: crypto.randomUUID(),
        category: "",
        title: "",
        summary: "",
        source: "",
        readTime: "",
        publishedAt: "",
      },
    ]);
  }

  function updateStory(id: string, field: keyof Story, value: string) {
    setStories((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      )
    );
  }

  function removeStory(id: string) {
    setStories((prev) => prev.filter((s) => s.id !== id));
  }

  async function publishBrief() {
    const payload = {
      slug: editingSlug || date,
      date,
      heroTitle,
      heroDescription,
      stories,
    };

    const method = editingSlug ? "PUT" : "POST";

    await fetch("/api/briefs", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    alert("Brief saved successfully!");

    setEditingSlug("");
    setDate("");
    setHeroTitle("");
    setHeroDescription("");
    setStories([]);

    loadBriefs();
  }

  useEffect(() => {
    loadBriefs();
  }, []);

  async function loadBriefs() {
    const res = await fetch(`${getBaseUrl()}/api/briefs`);
    const data = await res.json();

    setExistingBriefs(data.briefs || []);
  }

  async function deleteBrief(slug: string) {
    if (!confirm("Delete this brief?")) return;

    await fetch(`${getBaseUrl()}/api/briefs`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug }),
    });

    loadBriefs();
  }

  function editBrief(brief: any) {
    setDate(brief.date);
    setEditingSlug(brief.slug);
    setHeroTitle(brief.heroTitle);
    setHeroDescription(brief.heroDescription);
    setStories(brief.stories);
  }

  return (
    <main className="min-h-screen bg-[#F7F3EB] text-black">

      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-6 flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Atlas Minute Admin
        </h1>

        {editingSlug && (
          <p className="text-sm text-gray-500 mt-1">
            Editing: {editingSlug}
          </p>
        )}

        <button
          onClick={publishBrief}
          className="bg-black text-white px-5 py-3 rounded-xl"
        >
          Publish Briefing
        </button>

      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">

          {/* META */}
          <div className="bg-white p-6 rounded-3xl shadow-sm space-y-4">

            <input
              placeholder="Date (e.g. 13-05-2026)"
              className="w-full border p-3 rounded-xl"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              placeholder="Hero Title"
              className="w-full border p-3 rounded-xl"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
            />

            <textarea
              placeholder="Hero Description"
              className="w-full border p-3 rounded-xl h-24"
              value={heroDescription}
              onChange={(e) => setHeroDescription(e.target.value)}
            />

          </div>

          {/* STORIES */}
          <div className="bg-white p-6 rounded-3xl shadow-sm">

            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold">Stories</h2>

              <button
                onClick={addStory}
                className="border px-4 py-2 rounded-xl"
              >
                Add Story
              </button>
            </div>

            <div className="space-y-6">

              {stories.map((story) => (
                <div key={story.id} className="border p-4 rounded-xl space-y-3">

                  <input
                    placeholder="Category"
                    className="w-full border p-2 rounded"
                    value={story.category}
                    onChange={(e) =>
                      updateStory(story.id, "category", e.target.value)
                    }
                  />

                  <input
                    placeholder="Title"
                    className="w-full border p-2 rounded"
                    value={story.title}
                    onChange={(e) =>
                      updateStory(story.id, "title", e.target.value)
                    }
                  />

                  <textarea
                    placeholder="Summary"
                    className="w-full border p-2 rounded h-20"
                    value={story.summary}
                    onChange={(e) =>
                      updateStory(story.id, "summary", e.target.value)
                    }
                  />

                  <div className="grid grid-cols-3 gap-2">

                    <input
                      placeholder="Source"
                      className="border p-2 rounded"
                      value={story.source}
                      onChange={(e) =>
                        updateStory(story.id, "source", e.target.value)
                      }
                    />

                    <input
                      placeholder="Read Time"
                      className="border p-2 rounded"
                      value={story.readTime}
                      onChange={(e) =>
                        updateStory(story.id, "readTime", e.target.value)
                      }
                    />

                    <input
                      placeholder="Time"
                      className="border p-2 rounded"
                      value={story.publishedAt}
                      onChange={(e) =>
                        updateStory(story.id, "publishedAt", e.target.value)
                      }
                    />

                  </div>

                  <button
                    onClick={() => removeStory(story.id)}
                    className="text-red-600 text-sm"
                  >
                    Remove
                  </button>

                </div>
              ))}

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="bg-white p-6 rounded-3xl shadow-sm">

          <h2 className="text-2xl font-bold mb-6">
            Existing Briefs
          </h2>

          <div className="space-y-4">

            {existingBriefs.map((brief) => (
              <div
                key={brief.slug}
                className="border p-4 rounded-xl"
              >

                <p className="font-semibold">
                  {brief.date}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {brief.heroTitle}
                </p>

                <div className="flex gap-3 mt-4">

                  <button
                    onClick={() => editBrief(brief)}
                    className="border px-3 py-1 rounded-lg text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteBrief(brief.slug)}
                    className="border border-red-500 text-red-500 px-3 py-1 rounded-lg text-sm"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </main>
  );
}