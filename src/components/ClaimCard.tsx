import Image from "next/image";
import { VoteButtons } from "@/components/VoteButtons";

type Submission = {
  id: string;
  title: string;
  source_url: string | null;
  platform: string | null;
  image_url: string | null;
  vote_score: number;
  categories: { name: string; slug: string } | null;
};

export function ClaimCard({ s }: { s: Submission }) {
  return (
    <article className="card-lift flex flex-col gap-3 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper)] p-4">
      {s.image_url && (
        <div className="relative aspect-video w-full overflow-hidden rounded">
          <Image
            src={s.image_url}
            alt={s.title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        </div>
      )}
      <h3 className="text-base font-semibold">{s.title}</h3>
      <div className="flex flex-wrap items-center gap-2 text-xs opacity-70">
        {s.categories && (
          <span className="rounded border border-[var(--color-rule)] px-2 py-0.5">{s.categories.name}</span>
        )}
        {s.platform && (
          <span className="rounded border border-[var(--color-rule)] px-2 py-0.5">{s.platform}</span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <VoteButtons submissionId={s.id} score={s.vote_score} />
        {s.source_url && (
          <a
            href={s.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--color-accent)] hover:underline"
          >
            source ↗
          </a>
        )}
      </div>
    </article>
  );
}