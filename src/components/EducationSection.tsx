"use client";

import { useEffect, useRef, useState } from "react";
import Chip from "./Chip";
import { activity, certifications, degree } from "@/data/portfolio";

type Filter = "All" | "Development" | "Design" | "AI";
const filters: Filter[] = ["All", "Development", "Design", "AI"];

const summary = [
  { id: "degree", label: "Degree" },
  { id: "certifications", label: "Certifications" },
  { id: "activities", label: "Activities" },
];

export default function EducationSection() {
  const [showDetails, setShowDetails] = useState(false);
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
      ? certifications.length
      : certifications.filter((c) => c.category === f).length;
  const visible = certifications.filter(
    (c) => filter === "All" || c.category === filter,
  );

  return (
    <section id="education" className="flex scroll-mt-20 flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold tracking-tight">Education</h2>
        <p className="text-sm text-muted">
          Formal study, bootcamps and activities.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {summary.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full border border-line px-3.5 py-1.5 text-[13px] text-white/70 transition-colors hover:border-white/40 hover:text-white"
          >
            {s.label}
          </a>
        ))}
      </div>

      <div id="degree" className="flex scroll-mt-20 flex-col gap-4">
        <h3 className="text-base font-medium">Degree</h3>
        <article className="flex flex-col gap-3 rounded-2xl glass p-5 transition-colors hover:border-white/30">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h4 className="text-[15px] font-medium">
              {degree.school} · {degree.program}
            </h4>
            <span className="text-[13px] text-muted">{degree.period}</span>
          </div>
          <p className="text-[13px] leading-relaxed text-muted">
            {degree.note}
          </p>
          {showDetails && (
            <ul className="list-disc space-y-1.5 pl-4 text-[13px] leading-relaxed text-muted marker:text-[#ffffff]">
              {degree.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          )}
          <button
            type="button"
            aria-expanded={showDetails}
            onClick={() => setShowDetails((v) => !v)}
            className="w-fit text-[13px] text-[#ffffff] hover:underline"
          >
            {showDetails ? "Hide details" : "Show details"}
          </button>
        </article>
      </div>

      <div id="certifications" className="flex scroll-mt-20 flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base font-medium">Certifications &amp; training</h3>
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
                  {f}{" "}
                  <span className={on ? "text-black/60" : "text-subtle"}>
                    {count(f)}
                  </span>
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
          {visible.map((c) => (
            <article
              key={c.title}
              className="group/art relative flex flex-col gap-3 rounded-2xl glass p-5 transition-colors hover:border-white/30"
            >
              <span
                aria-hidden
                className="absolute -left-8 top-[22px] z-10 size-[13px] rounded-full bg-[#ffffff] ring-4 ring-black"
              />
              <span
                aria-hidden
                className="absolute -bottom-4 -left-[26px] top-[35px] w-px bg-white/20 group-last/art:hidden"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h4 className="text-[15px] font-medium">
                  {c.subtitle} · {c.title}
                </h4>
                {c.period && (
                  <span className="text-[13px] text-muted">{c.period}</span>
                )}
              </div>
              <p className="text-[13px] leading-relaxed text-muted">
                {c.note}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div id="activities" className="flex scroll-mt-20 flex-col gap-4">
        <h3 className="text-base font-medium">Activities</h3>
        <article className="flex flex-col gap-3 rounded-2xl glass p-5 transition-colors hover:border-white/30">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h4 className="text-[15px] font-medium">{activity.title}</h4>
            <span className="text-[13px] text-muted">
              {activity.place} · {activity.label}
            </span>
          </div>
          <p className="text-[13px] leading-relaxed text-white/80">
            {activity.text}
          </p>
          <div className="flex flex-wrap gap-2">
            {activity.topics.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
