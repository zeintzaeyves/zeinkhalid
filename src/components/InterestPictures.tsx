"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useState } from "react";
import { projectGradients } from "@/data/portfolio";

type Picture = { title: string; src?: string; position?: string };

function Visual({ p, index, sizes }: { p: Picture; index: number; sizes: string }) {
  if (p.src) {
    return (
      <Image
        src={p.src}
        alt={p.title}
        fill
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition: p.position }}
      />
    );
  }
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{ background: projectGradients[(index + 1) % projectGradients.length] }}
    />
  );
}

/** A row of small pictures; click one to preview it full size. */
export default function InterestPictures({ pictures }: { pictures: Picture[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const last = pictures.length - 1;

  const move = useCallback(
    (d: number) =>
      setOpen((i) => (i === null ? i : Math.max(0, Math.min(last, i + d)))),
    [last],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, move]);

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {pictures.map((p, i) => (
          <button
            key={`${p.title}-${i}`}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Preview ${p.title}`}
            className="relative aspect-square cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 transition-transform duration-200 hover:scale-[1.04] hover:border-white/30 active:scale-95"
          >
            <Visual p={p} index={i} sizes="(min-width: 640px) 110px, 30vw" />
          </button>
        ))}
      </div>

      {open !== null &&
        createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={pictures[open].title}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <div
            className={`relative w-full overflow-hidden rounded-3xl border border-white/10 ${
              pictures[open].src
                ? "aspect-video max-w-[min(44rem,90vw)]"
                : "aspect-square max-w-[min(32rem,80vh)]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <Visual p={pictures[open]} index={open} sizes="(min-width: 640px) 704px, 100vw" />
          </div>
          <p
            className="text-[15px] font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            {pictures[open].title}
          </p>
          <div
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => move(-1)}
              disabled={open === 0}
              aria-label="Previous"
              className="rounded-full border border-line px-4 py-1.5 text-[13px] text-white/80 transition-colors hover:border-white/40 disabled:opacity-30"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="rounded-full bg-white px-4 py-1.5 text-[13px] text-black"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              disabled={open === last}
              aria-label="Next"
              className="rounded-full border border-line px-4 py-1.5 text-[13px] text-white/80 transition-colors hover:border-white/40 disabled:opacity-30"
            >
              →
            </button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
