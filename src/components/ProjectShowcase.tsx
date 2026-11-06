"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Chip from "./Chip";
import { projectBackground, projects, type Project } from "@/data/portfolio";

const FEATURED = 3;

export default function ProjectShowcase() {
  const [selected, setSelected] = useState<number | null>(null);
  const [openRow, setOpenRow] = useState<string | null>(null);

  // Sheet: Esc to close, lock page scroll while open.
  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [selected]);

  const featured = projects.slice(0, FEATURED);
  const rest = projects.slice(FEATURED);
  const current: Project | null = selected === null ? null : projects[selected];

  return (
    <div className="flex flex-col gap-10">
      {/* Bento: one tall card beside two stacked ones */}
      <div className="grid gap-4 sm:grid-cols-2 sm:grid-rows-2">
        {featured.map((p, i) => (
          <button
            key={p.title}
            type="button"
            onClick={() => setSelected(i)}
            style={{ background: projectBackground(p, i) }}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 p-5 text-left shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] transition-transform duration-300 hover:scale-[1.01] active:scale-[0.98] ${
              i === 0
                ? "min-h-[16rem] sm:row-span-2 sm:min-h-[26rem]"
                : "min-h-[12rem]"
            }`}
          >
            <span className="text-[12px] font-medium uppercase tracking-wider text-white/60">
              {p.category}
            </span>
            <span className="flex items-end justify-between gap-4">
              <span className="min-w-0">
                <span
                  className={`block font-semibold leading-tight tracking-tight text-white ${
                    i === 0 ? "text-2xl" : "text-xl"
                  }`}
                >
                  {p.title}
                </span>
                <span className="mt-1 block truncate text-[13px] text-white/60">
                  {p.tags.join(" · ")}
                </span>
              </span>
              <span
                aria-hidden
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors group-hover:bg-white/30"
              >
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* The rest: grouped list, tap a row to expand */}
      {rest.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-[13px] text-muted">More projects</h3>
          <div className="overflow-hidden rounded-2xl glass">
            {rest.map((p, i) => {
              const isOpen = openRow === p.title;
              return (
                <div key={p.title} className={i > 0 ? "border-t border-line" : ""}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenRow(isOpen ? null : p.title)}
                    className="flex w-full items-center gap-3.5 px-4 py-3.5 text-left transition-colors hover:bg-white/[0.04]"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-medium">
                        {p.title}
                      </span>
                      <span className="block truncate text-[13px] text-muted">
                        {p.tags.join(" · ")}
                      </span>
                    </span>
                    <svg
                      className={`size-4 shrink-0 text-subtle transition-transform duration-300 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-3 px-4 pb-4">
                        <p className="text-[13px] leading-relaxed text-muted">
                          {p.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {p.tags.map((t) => (
                            <Chip key={t} size="sm">
                              {t}
                            </Chip>
                          ))}
                        </div>
                        {p.action === "ask" && (
                          <button
                            type="button"
                            onClick={() => window.dispatchEvent(new Event("open-ask"))}
                            className="w-fit text-[13px] text-[#ffffff] hover:underline"
                          >
                            Ask Zein
                          </button>
                        )}
                        {p.href && (
                          <a
                            href={p.href}
                            target="_blank"
                            rel="noreferrer"
                            className="w-fit text-[13px] text-[#ffffff] hover:underline"
                          >
                            Open project
<ArrowUpRight className="ml-1 inline size-3.5 align-[-2px]" strokeWidth={1.8} aria-hidden />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {current && selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={() => setSelected(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[88vh] w-full max-w-xl flex-col overflow-hidden rounded-t-[28px] glass sm:rounded-[28px]"
          >
            <div
              className="relative flex min-h-40 flex-col justify-end p-5"
              style={{
                background: projectBackground(current, selected),
              }}
            >
              <span
                aria-hidden
                className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-white/40 sm:hidden"
              />
              <button
                type="button"
                aria-label="Close"
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-black/40 text-white/90 transition-colors hover:bg-black/60"
              >
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
              <span className="text-[12px] font-medium uppercase tracking-wider text-white/60">
                {current.category}
              </span>
              <h3 className="mt-1 text-2xl font-semibold leading-tight tracking-tight">
                {current.title}
              </h3>
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto p-5">
              <p className="text-[14px] leading-relaxed text-white/80">
                {current.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {current.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
              {current.action === "ask" && (
                <button
                  type="button"
                  onClick={() => {
                    setSelected(null);
                    window.dispatchEvent(new Event("open-ask"));
                  }}
                  className="mt-1 inline-flex h-11 items-center justify-center rounded-full bg-white text-[14px] font-medium text-black transition-colors hover:bg-white/90"
                >
                  Ask Zein
                </button>
              )}
              {current.href && (
                <a
                  href={current.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex h-11 items-center justify-center rounded-full bg-white text-[14px] font-medium text-black transition-colors hover:bg-white/90"
                >
                  Open project
<ArrowUpRight className="ml-1 inline size-3.5 align-[-2px]" strokeWidth={1.8} aria-hidden />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
