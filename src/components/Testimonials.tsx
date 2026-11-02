"use client";

import { useRef } from "react";
import type { Testimonial } from "@/data/portfolio";

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden
    >
      {dir === "left" ? (
        <path d="M19 12H5m6-6-6 6 6 6" />
      ) : (
        <path d="M5 12h14m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const track = useRef<HTMLDivElement>(null);
  if (items.length === 0) return null;

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  const btn =
    "flex size-9 items-center justify-center rounded-full bg-white text-black transition-[transform,background-color] hover:bg-white/85 active:scale-90";

  return (
    <section id="testimonials" className="flex scroll-mt-20 flex-col gap-6">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h2 className="text-[22px] font-semibold tracking-tight sm:text-2xl">
            What <span className="text-white/35">People</span> Say
          </h2>
        </div>
        <div className="flex shrink-0 gap-2 self-center">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scroll(-1)}
            className={btn}
          >
            <Arrow dir="left" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scroll(1)}
            className={btn}
          >
            <Arrow dir="right" />
          </button>
        </div>
      </div>

      <div
        ref={track}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((t, i) => (
          <figure
            key={`${t.name}-${i}`}
            className="flex min-h-[16rem] w-[82%] shrink-0 snap-start flex-col justify-between gap-8 rounded-3xl border border-line bg-white/[0.03] p-6 sm:w-[20rem]"
          >
            <blockquote className="text-[16px] leading-[1.6] text-pretty text-white/90">
              {t.quote}
            </blockquote>

            <figcaption className="border-l border-white/25 pl-3 text-[13px] text-white/60">
              {t.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
