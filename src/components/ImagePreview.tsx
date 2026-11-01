"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

/** Makes its children (a card) clickable and opens `src` in a full-size preview. */
export default function ImagePreview({
  src,
  title,
  ratio = 1046 / 711,
  className = "",
  children,
}: {
  src: string;
  title: string;
  ratio?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-label={`Preview ${title}`}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className={`flex cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-[28px] ${className}`}
      >
        {children}
      </div>

      {open &&
        createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-50 flex animate-[ask-in_0.25s_ease-out_both] flex-col items-center justify-center gap-4 bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative animate-[ask-rise_0.45s_var(--ease-ios)_both] overflow-hidden rounded-3xl border border-white/10"
            style={{
              aspectRatio: ratio,
              width: `min(90vw, 48rem, calc(78vh * ${ratio}))`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={title}
              fill
              sizes="(min-width: 768px) 768px, 90vw"
              className="object-contain"
            />
          </div>
          <p className="text-[15px] font-medium" onClick={(e) => e.stopPropagation()}>
            {title}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            className="rounded-full bg-white px-4 py-1.5 text-[13px] text-black"
          >
            Close
          </button>
        </div>,
        document.body,
      )}
    </>
  );
}
