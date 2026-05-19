import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atlas Minute",
  description: "A concise daily Moroccan briefing for Moroccans around the world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F7F3EB] text-black">

        {/* GLOBAL NAVBAR */}
        <nav className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">

            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Atlas Minute"
                height={40}
                width={0}
                style={{ width: "auto", height: "40px" }}
                priority
              />
            </Link>

            <div className="flex gap-4 items-center">
              <Link
                href="/admin"
                className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
              >
                Admin
              </Link>

              <button className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition">
                Join Newsletter
              </button>
            </div>

          </div>
        </nav>

        {/* PAGE CONTENT */}
        {children}

      </body>
    </html>
  );
}
