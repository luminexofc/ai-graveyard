type Category = { id: string; name: string; slug: string };

const cls = "rounded border border-[var(--color-rule)] bg-[var(--color-paper)] px-2 py-1 text-sm";

export function FilterBar({
  categories,
  current,
}: {
  categories: Category[];
  current: { category?: string; platform?: string; sort?: string };
}) {
  return (
    <form method="get" action="/browse" className="flex flex-wrap gap-2">
      <select name="category" defaultValue={current.category ?? ""} className={cls}>
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>
      <select name="platform" defaultValue={current.platform ?? ""} className={cls}>
        <option value="">All platforms</option>
        {["twitter", "reddit", "linkedin", "tiktok", "other"].map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <select name="sort" defaultValue={current.sort ?? "newest"} className={cls}>
        <option value="newest">Newest</option>
        <option value="top">Top voted</option>
      </select>
      <button
        type="submit"
        className="rounded border border-[var(--color-rule)] px-3 py-1 text-sm hover:bg-[var(--color-rule)]"
      >
        Filter
      </button>
    </form>
  );
}