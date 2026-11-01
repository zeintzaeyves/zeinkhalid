"use client";

import { useState } from "react";
import NavItem from "./NavItem";
import { Mail } from "lucide-react";
import Avatar from "./Avatar";
import { email, navGroups } from "@/data/portfolio";

// Flat surface for the Ask Zein pill.
const surface =
  "border border-line bg-surface-raised transition-all duration-200";

function PanelToggleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className="size-4"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M9 4v16" />
    </svg>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line bg-black/90 px-4 py-2 backdrop-blur lg:hidden">
        <div className="flex min-w-0 items-center gap-2">
          <Avatar className="size-7 rounded-lg" sizes="28px" />
          <span className="truncate text-sm font-medium">Zein Khalid</span>
        </div>
        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="-mr-1.5 shrink-0 rounded-xl p-2.5 text-white/80 transition-[background-color,transform] duration-200 hover:bg-white/[0.08] active:scale-90 active:bg-white/[0.14]"
        >
          <PanelToggleIcon />
        </button>
      </header>

      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/70 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-3 left-3 z-40 flex w-[min(19rem,calc(100vw-1.5rem))] flex-col rounded-2xl border border-line bg-surface p-3 transition-transform duration-200 lg:left-5 lg:top-5 lg:bottom-5 lg:w-72 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-[110%]"
        }`}
      >
        <div className="flex items-start justify-between gap-2 px-1">
          <div className="flex items-center gap-2.5">
            <Avatar className="size-8 rounded-lg" sizes="32px" />
            <div className="leading-tight">
              <p className="text-sm font-medium">Zein Khalid</p>
              <p className="text-[12px] text-subtle">Personal Workspace</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Collapse navigation"
            onClick={() => setOpen(false)}
            className="hidden text-white/70 lg:block"
          >
            <PanelToggleIcon />
          </button>
        </div>

        <nav className="mt-3 flex-1 space-y-5 overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-1">
              <p className="px-2 pb-1 text-[11px] text-subtle">
                {group.title}
              </p>
              {group.links.map((link) => (
                <NavItem
                  key={`${group.title}-${link.label}`}
                  {...link}
                  onClick={() => setOpen(false)}
                />
              ))}
            </div>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => {
            setOpen(false);
            window.dispatchEvent(new Event("open-ask"));
          }}
          aria-label="Ask Zein"
          className={`${surface} group mt-3 flex h-11 items-center gap-2.5 rounded-full px-3.5 text-left hover:border-white/35 active:scale-[0.97]`}
        >
          <svg
            className="size-4 shrink-0 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M12 4v16M4 12h16" />
          </svg>
          <span className="flex-1 text-[13px] text-white/50 transition-colors group-hover:text-white/80">
            Ask Zein
          </span>
          <kbd className="rounded-md border border-line px-1.5 py-0.5 font-sans text-[11px] text-subtle">
            Ctrl K
          </kbd>
        </button>

        <a
          href={`mailto:${email}`}
          className="mt-3 flex items-center gap-2 px-1 text-[12px]"
        >
          <Mail className="size-3.5 shrink-0" strokeWidth={1.7} aria-hidden />
          <span className="truncate">{email}</span>
        </a>
      </aside>
    </>
  );
}
