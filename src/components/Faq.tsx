"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/data/portfolio";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[13px] text-muted">FAQs</h3>
      <div className="overflow-hidden rounded-[22px] glass">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className={i > 0 ? "border-t border-line" : ""}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left hover:bg-white/[0.03] active:bg-white/[0.06]"
              >
                <span className="text-[15px] font-medium">{f.q}</span>
                <ChevronDown
                  aria-hidden
                  strokeWidth={1.8}
                  className={`size-4 shrink-0 text-white/50 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                id={`faq-${i}`}
                role="region"
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-4 pb-4 text-[13px] leading-relaxed text-muted">
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
