import { resources } from "@/data/portfolio";

export default function ResourcesSection() {
  return (
    <section id="resources" className="flex scroll-mt-20 flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold tracking-tight">Resources</h2>
        <p className="text-sm text-muted">
          The tools and references I rely on while designing and building.
        </p>
      </div>

      {resources.map((group) => (
        <div key={group.title} className="flex flex-col gap-3">
          <h3 className="text-[13px] text-muted">{group.title}</h3>
          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            {group.items.map((item, i) => {
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group flex items-center gap-3.5 px-4 py-3.5 transition-colors hover:bg-white/[0.04] ${
                    i > 0 ? "border-t border-line" : ""
                  }`}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-medium">
                      {item.name}
                    </span>
                    <span className="block truncate text-[13px] text-muted">
                      {item.note}
                    </span>
                  </span>
                  <svg
                    className="size-4 shrink-0 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </a>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
