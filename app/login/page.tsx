"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";



export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const { error } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F7F3EB]">

      <div className="bg-white p-10 rounded-3xl shadow-sm w-full max-w-md">

        <h1 className="text-3xl font-bold mb-8">
          Admin Login
        </h1>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-3 rounded-xl"
          >
            Login
          </button>

        </div>

      </div>

    </main>
  );
}