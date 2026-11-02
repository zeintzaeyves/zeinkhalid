"use client";

import { useRef, useState } from "react";
import Chip from "./Chip";
import { projectBackground, type Project } from "@/data/portfolio";


const SWIPE = 40;
const DRAG_START = 6;

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(Math.floor((projects.length - 1) / 2));
  const start = useRef<number | null>(null);
  const moved = useRef(false);
  const t0 = useRef(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const last = projects.length - 1;

  const go = (i: number) => setActive(Math.max(0, Math.min(last, i)));

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Projects"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(active + 1);
          if (e.key === "ArrowLeft") go(active - 1);
        }}
        onPointerDown={(e) => {
          start.current = e.clientX;
          t0.current = performance.now();
          moved.current = false;
        }}
        onPointerMove={(e) => {
          if (start.current === null) return;
          const dx = e.clientX - start.current;
          if (!dragging && Math.abs(dx) < DRAG_START) return;
          if (!dragging) {
            setDragging(true);
            moved.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
          }
          // Rubber-band at the first and last card.
          const edge = (active === 0 && dx > 0) || (active === last && dx < 0);
          setDrag(edge ? dx * 0.3 : dx);
        }}
        onPointerUp={(e) => {
          if (start.current === null) return;
          const dx = e.clientX - start.current;
          const v = dx / Math.max(1, performance.now() - t0.current); // px per ms
          start.current = null;
          if (Math.abs(dx) > SWIPE || Math.abs(v) > 0.45) {
            go(active + (dx < 0 ? 1 : -1));
          }
          setDrag(0);
          setDragging(false);
        }}
        onPointerCancel={() => {
          start.current = null;
          setDrag(0);
          setDragging(false);
        }}
        style={{
          ["--w" as string]: "min(250px, 60vw)",
          touchAction: "pan-y",
          perspective: "1100px",
        }}
        className="relative h-[330px] w-full cursor-grab select-none overflow-hidden outline-none active:cursor-grabbing sm:h-[360px]"
      >
        {projects.map((p, i) => {
          const offset = i - active;
          const abs = Math.abs(offset);
          const linked = offset === 0 && !!(p.href || p.action);
          const common = {
            "aria-current": offset === 0,
            style: {
              width: "var(--w)",
              aspectRatio: "0.86",
              background: projectBackground(p, i),
              transform: `translate3d(calc(-50% + var(--w) * ${offset * 0.74} + ${drag}px), -50%, ${offset === 0 ? 0 : -60}px) rotateY(${-offset * 16}deg) scale(${offset === 0 ? 1 : 0.84})`,
              willChange: "transform, opacity",
              zIndex: 10 - abs,
              opacity: abs > 1 ? 0 : offset === 0 ? 1 : 0.7,
              pointerEvents: abs > 1 ? "none" : "auto",
            } as React.CSSProperties,
            className: `absolute left-1/2 top-1/2 flex cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-[32px] border border-white/10 p-6 text-center shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] transition-[transform,opacity,border-color] ${
              dragging
                ? "duration-0"
                : "duration-[650ms] ease-[cubic-bezier(0.25,0.8,0.25,1)]"
            } ${
              offset === 0 ? "hover:border-white/30" : ""
            }`,
          };
          const inner = (
            <>
              <span
                className={`text-xl font-semibold leading-tight tracking-tight text-white transition-opacity duration-300 ${
                  offset === 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                {p.title}
              </span>
              <span
                className={`text-[12px] text-white/60 transition-opacity duration-300 ${
                  offset === 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                {p.tags.join(" · ")}
              </span>
              {linked && (
                <svg
                  className="mt-1 size-4 text-white/70"
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
              )}
            </>
          );
          // One element type for every state: swapping <button> and <a> would
          // remount the card and kill the transition.
          const activate = () => {
            if (moved.current) {
              moved.current = false;
              return;
            }
            if (offset !== 0) go(i);
            else if (p.action === "ask") window.dispatchEvent(new Event("open-ask"));
            else if (p.href) window.open(p.href, "_blank", "noopener,noreferrer");
          };
          return (
            <div
              key={p.title}
              role={linked ? "link" : "button"}
              tabIndex={offset === 0 ? 0 : -1}
              aria-label={
                linked
                  ? p.action ? `Ask Zein` : `Open ${p.title}`
                  : `${p.title}${offset === 0 ? "" : " — show project"}`
              }
              draggable={false}
              onClick={activate}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  activate();
                }
              }}
              {...common}
            >
              {inner}
            </div>
          );
        })}
      </div>

      {projects.length > 1 && (
        <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-2">
          {projects.map((p, i) => (
            <button
              key={p.title}
              type="button"
              aria-label={`Go to ${p.title}`}
              onClick={() => go(i)}
              className={`size-1.5 rounded-full transition-colors ${
                i === active ? "bg-[#b36800]" : "bg-white/35 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}

      {/* All descriptions share one grid cell so the height never changes. */}
      <div className="grid w-full max-w-[34rem]" aria-live="polite">
        {projects.map((p, i) => (
          <div
            key={p.title}
            aria-hidden={i !== active}
            className={`col-start-1 row-start-1 flex flex-col items-center gap-3 text-center transition-all duration-500 ease-out ${
              i === active
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-2 opacity-0"
            }`}
          >
            <h3 className="text-lg font-medium">{p.title}</h3>
            <p className="text-[13px] leading-relaxed text-muted">
              {p.description}
            </p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {p.tags.map((t) => (
                <Chip key={t} size="sm">
                  {t}
                </Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
