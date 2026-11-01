"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { galleryItems, projectGradients } from "@/data/portfolio";

const SWIPE = 40;

function Visual({ index }: { index: number }) {
  const item = galleryItems[index];
  if (item.src) {
    return (
      <Image
        src={item.src}
        alt={item.title}
        fill
        sizes="(min-width: 640px) 280px, 60vw"
        className="object-cover"
        draggable={false}
      />
    );
  }
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{ background: projectGradients[index % projectGradients.length] }}
    />
  );
}

export default function GallerySection() {
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState(false);
  const start = useRef<number | null>(null);
  const moved = useRef(false);
  const last = galleryItems.length - 1;

  const go = useCallback(
    (i: number) => setActive(Math.max(0, Math.min(last, i))),
    [last],
  );

  // Viewer: Esc to close, arrows to move, lock page scroll.
  useEffect(() => {
    if (!viewer) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewer(false);
      if (e.key === "ArrowRight") go(active + 1);
      if (e.key === "ArrowLeft") go(active - 1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [viewer, active, go]);

  const current = galleryItems[active];

  return (
    <section id="gallery" className="flex scroll-mt-20 flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold tracking-tight">Gallery</h2>
        <p className="text-sm text-muted">
          Moments, workspaces and things I&apos;ve built. Swipe or tap a photo.
        </p>
      </div>

      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Gallery"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(active + 1);
          if (e.key === "ArrowLeft") go(active - 1);
        }}
        onPointerDown={(e) => {
          start.current = e.clientX;
          moved.current = false;
        }}
        onPointerUp={(e) => {
          if (start.current === null) return;
          const dx = e.clientX - start.current;
          start.current = null;
          if (Math.abs(dx) > SWIPE) {
            moved.current = true;
            go(active + (dx < 0 ? 1 : -1));
          }
        }}
        onPointerCancel={() => (start.current = null)}
        style={{
          ["--w" as string]: "min(17rem, 58vw)",
          perspective: "1200px",
          touchAction: "pan-y",
        }}
        className="relative h-[22rem] w-full cursor-grab select-none overflow-hidden rounded-[40px] border border-white/10 bg-[radial-gradient(120%_100%_at_50%_0%,#1a1612_0%,#0a0a0a_60%,#050505_100%)] outline-none active:cursor-grabbing sm:h-[27rem]"
      >
        {galleryItems.map((item, i) => {
          const o = i - active;
          const abs = Math.abs(o);
          const dir = Math.sign(o);
          const x = o === 0 ? 0 : dir * (0.64 + (abs - 1) * 0.26);
          const rotate = o === 0 ? 0 : -dir * 52;
          const shade = o === 0 ? 1 : Math.max(0.25, 0.8 - (abs - 1) * 0.22);
          return (
            <button
              key={item.title}
              type="button"
              tabIndex={o === 0 ? 0 : -1}
              aria-label={o === 0 ? `Open ${item.title}` : `Show ${item.title}`}
              aria-current={o === 0}
              onClick={() => {
                if (moved.current) {
                  moved.current = false;
                  return;
                }
                if (o === 0) setViewer(true);
                else go(i);
              }}
              style={{
                width: "var(--w)",
                aspectRatio: "0.96",
                transform: `translate(calc(-50% + var(--w) * ${x}), -50%) rotateY(${rotate}deg) scale(${o === 0 ? 1 : 0.9})`,
                zIndex: 20 - abs,
                opacity: abs > 3 ? 0 : shade,
                pointerEvents: abs > 3 ? "none" : "auto",
              }}
              className="absolute left-1/2 top-1/2 cursor-pointer overflow-hidden rounded-[28px] border border-white/10 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.9)] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <Visual index={i} />
              {o === 0 && (
                <span className="absolute inset-x-0 bottom-0 flex flex-col items-start bg-gradient-to-t from-black/70 via-black/25 to-transparent px-4 pb-4 pt-12 text-left">
                  <span className="text-[17px] font-medium leading-tight text-white">
                    {item.title}
                  </span>
                  <span className="text-[13px] text-white/60">
                    {item.caption}
                  </span>
                </span>
              )}
            </button>
          );
        })}

        {/* Fade the outer covers into the dark container */}
        <span className="pointer-events-none absolute inset-y-0 left-0 z-30 w-1/5 bg-gradient-to-r from-black/80 to-transparent" />
        <span className="pointer-events-none absolute inset-y-0 right-0 z-30 w-1/5 bg-gradient-to-l from-black/80 to-transparent" />
      </div>

      {viewer && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setViewer(false)}
        >
          <div
            className="relative aspect-square w-full max-w-[min(32rem,80vh)] overflow-hidden rounded-3xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <Visual index={active} />
          </div>
          <div
            className="flex flex-col items-center gap-1 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[15px] font-medium">{current.title}</p>
            <p className="max-w-md text-[13px] text-muted">{current.caption}</p>
          </div>
          <div
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => go(active - 1)}
              disabled={active === 0}
              aria-label="Previous"
              className="rounded-full border border-line px-4 py-1.5 text-[13px] text-white/80 transition-colors hover:border-white/40 disabled:opacity-30"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => setViewer(false)}
              className="rounded-full bg-white px-4 py-1.5 text-[13px] text-black"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              disabled={active === last}
              aria-label="Next"
              className="rounded-full border border-line px-4 py-1.5 text-[13px] text-white/80 transition-colors hover:border-white/40 disabled:opacity-30"
            >
              →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
