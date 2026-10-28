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
        <header className="sticky top-0 z-20 border-b border-[var(--color-rule)] bg-[var(--color-paper)]/70 backdrop-blur-md">
          <nav className="mx-auto flex max-w-5xl items-center justify-between p-4">
            <Link
              href="/"
              className="text-lg tracking-wide"
              style={{ fontFamily: "var(--font-display)" }}
            >
              AI Graveyard
            </Link>
            <div className="flex gap-5 text-sm">
              <Link href="/" className="opacity-80 transition hover:text-[var(--color-accent)] hover:opacity-100">Graveyard</Link>
              <Link href="/submit" className="opacity-80 transition hover:text-[var(--color-accent)] hover:opacity-100">Submit</Link>
              <Link href="/browse" className="opacity-80 transition hover:text-[var(--color-accent)] hover:opacity-100">Browse</Link>
              <Link href="/leaderboard" className="opacity-80 transition hover:text-[var(--color-accent)] hover:opacity-100">Leaderboard</Link>
              <Link href="/about" className="opacity-80 transition hover:text-[var(--color-accent)] hover:opacity-100">About</Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}