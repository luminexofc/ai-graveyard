import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
        About AI Graveyard
      </h1>
      <div className="mt-4 space-y-4 opacity-90">
        <p>
          AI Graveyard collects social-media posts claiming a job sector is dead because of
          AI. People submit them, the community votes, and the most-claimed categories get
          buried as tombstones.
        </p>
        <h2 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>
          Rules
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Submit real posts. No fabrication.</li>
          <li>One claim per submission. Pick the right category.</li>
          <li>Vote honestly: upvote claims you actually see circulating.</li>
        </ul>
        <h2 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>
          Disclaimer
        </h2>
        <p>
          This site ranks <strong>claims</strong>, not truth. A category is buried because
          social media says it is dead and the community upvotes that claim — not because the
          sector is verified dead. Vote counts are community signals, not rigorous data
          (anonymous voting is easily stuffed). Treat the whole thing as a cultural artifact.
        </p>
      </div>
      <div className="mt-8">
        <Link href="/" className="text-sm text-[var(--color-accent)] hover:underline">
          ← Home
        </Link>
      </div>
    </main>
  );
}