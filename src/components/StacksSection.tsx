"use client";

import { useState } from "react";
import { stacks } from "@/data/portfolio";

export default function StacksSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="stacks" className="flex scroll-mt-20 flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold tracking-tight">Stacks</h2>
        <p className="text-sm text-muted">
          Languages, frameworks and tools I use to design and build.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div
          role="tablist"
          aria-label="Stack categories"
          className="flex flex-wrap gap-2"
        >
          {stacks.map((group, i) => {
            const on = active === i;
            return (
              <button
                key={group.label}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className={`rounded-full px-3.5 py-1.5 text-[13px] transition-colors ${
                  on
                    ? "bg-white/90 text-black"
                    : "bg-white/[0.07] text-white/60 hover:bg-white/[0.12] hover:text-white"
                }`}
              >
                {group.label}
              </button>
            );
          })}
        </div>

        {/* All lists share one grid cell, so the height stays that of the tallest. */}
        <div className="grid">
          {stacks.map((group, i) => {
            const on = active === i;
            return (
              <div
                key={group.label}
                role="tabpanel"
                aria-hidden={!on}
                className={`col-start-1 row-start-1 flex flex-col gap-3 transition-opacity duration-200 ${
                  on ? "opacity-100" : "pointer-events-none invisible opacity-0"
                }`}
              >
                <div className="flex items-baseline justify-between px-1">
                  <h3 className="text-[13px] text-muted">{group.label}</h3>
                  <span className="text-[13px] text-subtle">
                    {group.items.length}
                  </span>
                </div>
                <div className="w-full self-start overflow-hidden rounded-2xl glass">
                  {group.items.map((item, n) => (
                    <div
                      key={item}
                      className={`px-4 py-3.5 text-[15px] ${
                        n > 0 ? "border-t border-line" : ""
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
