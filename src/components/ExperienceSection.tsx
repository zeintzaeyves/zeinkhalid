"use client";

import { useEffect, useRef, useState } from "react";
import Chip from "./Chip";
import { experiences } from "@/data/portfolio";

type Filter = "All" | "Development" | "Design" | "Support";
const filters: Filter[] = ["All", "Development", "Design", "Support"];

export default function ExperienceSection() {
  const [filter, setFilter] = useState<Filter>("All");
  // Reserve the height of the full list so filtering never shifts the page.
  const listRef = useRef<HTMLDivElement>(null);
  const [minH, setMinH] = useState(0);
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const measure = () => {
      if (filter !== "All") return;
      const prev = el.style.minHeight;
      el.style.minHeight = "0px";
      const h = el.offsetHeight;
      el.style.minHeight = prev;
      setMinH(h);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [filter]);
  const count = (f: Filter) =>
    f === "All"
      ? experiences.length
      : experiences.filter((e) => e.category === f).length;
  const visible = experiences.filter(
    (e) => filter === "All" || e.category === filter,
  );

  return (
    <section id="experience" className="flex scroll-mt-20 flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold tracking-tight">Experience</h2>
        <p className="text-sm text-muted">
          Where I&apos;ve worked and what I&apos;ve built along the way.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-medium">Work history</h3>
        <div className="flex flex-wrap gap-2" role="tablist">
          {filters.map((f) => {
            const on = filter === f;
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
                  on
                    ? "border-white bg-white text-black"
                    : "border-line text-white/70 hover:border-white/40 hover:text-white"
                }`}
              >
                {f} <span className={on ? "text-black/60" : "text-subtle"}>{count(f)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={listRef}
        style={{ minHeight: minH || undefined }}
        className="flex flex-col content-start gap-4 pl-8"
      >
        {visible.map((exp) => (
          <article
            key={`${exp.company}-${exp.role}`}
            className="group/art relative flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-white/30"
          >
            <span
              aria-hidden
              className="absolute -left-8 top-[22px] z-10 size-[13px] rounded-full bg-[#e68600] ring-4 ring-black"
            />
            <span
              aria-hidden
              className="absolute -bottom-4 -left-[26px] top-[35px] w-px bg-white/20 group-last/art:hidden"
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h4 className="text-[15px] font-medium">
                {exp.company} · {exp.role}
              </h4>
              <span className="text-[13px] text-muted">{exp.period}</span>
            </div>
            <p className="text-[13px] leading-relaxed text-white/80">
              {exp.summary}
            </p>
            <ul className="list-disc space-y-1.5 pl-4 text-[13px] leading-relaxed text-muted marker:text-subtle">
              {exp.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className="mt-1 flex flex-wrap gap-2">
              {exp.stack.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
