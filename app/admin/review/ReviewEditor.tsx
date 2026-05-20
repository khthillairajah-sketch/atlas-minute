"use client";

import { useState } from "react";

export default function ReviewEditor({
  initialBrief,
}: {
  initialBrief: any;
}) {
  const [brief, setBrief] = useState(initialBrief);
  const [saving, setSaving] = useState(false);

  function updateStory(
    index: number,
    field: string,
    value: string
  ) {
    const updatedStories = [...brief.stories];

    updatedStories[index] = {
      ...updatedStories[index],
      [field]: value,
    };

    setBrief({
      ...brief,
      stories: updatedStories,
    });
  }

  function deleteStory(index: number) {
    const updatedStories = brief.stories.filter(
      (_: any, i: number) => i !== index
    );

    setBrief({
      ...brief,
      stories: updatedStories,
    });
  }

  function addStory() {
    setBrief({
      ...brief,
      stories: [
        ...brief.stories,
        {
          category: "General",
          title: "",
          summary: "",
          source: "Manual",
          readTime: "2 min",
          publishedAt: new Date().toISOString(),
        },
      ],
    });
  }

  async function saveChanges() {
    setSaving(true);

    const res = await fetch("/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(brief),
    });

    setSaving(false);

    if (res.ok) {
      alert("Changes saved.");
    } else {
      const err = await res.json();
      console.log(err);
      alert(err.error || "Failed to save.");
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F3EB] p-10">

      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-5xl font-bold">
              Review Brief
            </h1>

            <p className="mt-3 text-gray-600">
              {brief.date}
            </p>
          </div>

          <div className="flex gap-3">

            <button
              onClick={addStory}
              className="bg-white border border-black px-5 py-3 rounded-xl"
            >
              Add Story
            </button>

            <button
              onClick={saveChanges}
              className="bg-black text-white px-5 py-3 rounded-xl"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </div>

        <div className="mt-12 space-y-8">

          {brief.stories?.map((story: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >

              <input
                value={story.category}
                onChange={(e) =>
                  updateStory(index, "category", e.target.value)
                }
                className="text-sm uppercase text-red-700 font-semibold w-full outline-none"
              />

              <input
                value={story.title}
                onChange={(e) =>
                  updateStory(index, "title", e.target.value)
                }
                className="text-2xl font-bold mt-3 w-full outline-none"
              />

              <textarea
                value={story.summary}
                onChange={(e) =>
                  updateStory(index, "summary", e.target.value)
                }
                className="mt-4 text-gray-700 leading-7 w-full min-h-[120px] outline-none"
              />

              <div className="mt-5 flex justify-between items-center">

                <div className="text-sm text-gray-500 flex gap-4">
                  <span>{story.source}</span>
                  <span>{story.publishedAt}</span>
                </div>

                <button
                  onClick={() => deleteStory(index)}
                  className="text-red-600"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </main>
  );
}