import Link from "next/link";
import type { Metadata } from "next";
import { Cinzel, Atkinson_Hyperlegible, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "AI Graveyard",
  description:
    "Where careers go to be disputed. Track social-media claims that a job sector is dead because of AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${atkinson.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)]">
        <header className="sticky top-0 z-10 border-b border-[var(--color-rule)] bg-[var(--color-paper)]/80 backdrop-blur">
          <nav className="mx-auto flex max-w-5xl items-center justify-between p-4">
            <Link href="/" className="font-bold" style={{ fontFamily: "var(--font-display)" }}>
              AI Graveyard
            </Link>
            <div className="flex gap-4 text-sm">
              <Link href="/" className="hover:text-[var(--color-accent)]">Graveyard</Link>
              <Link href="/submit" className="hover:text-[var(--color-accent)]">Submit</Link>
              <Link href="/browse" className="hover:text-[var(--color-accent)]">Browse</Link>
              <Link href="/leaderboard" className="hover:text-[var(--color-accent)]">Leaderboard</Link>
              <Link href="/about" className="hover:text-[var(--color-accent)]">About</Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}