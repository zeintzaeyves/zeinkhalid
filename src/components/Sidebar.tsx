"use client";

import { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { ChevronRight, Menu, X } from "lucide-react";
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
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (collapsed) document.documentElement.dataset.sidebar = "collapsed";
    else delete document.documentElement.dataset.sidebar;
  }, [collapsed]);

  // Lock page scroll while the full-screen mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const closeOrCollapse = () => {
    setOpen(false);
    if (window.matchMedia("(min-width: 1024px)").matches) setCollapsed(true);
  };

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line bg-black/40 px-4 py-2 backdrop-blur-xl lg:hidden">
        <p className="truncate text-[18px] font-semibold tracking-tight">
          Zein Khalid.
        </p>
        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="-mr-1.5 shrink-0 rounded-xl p-2.5 text-white/80 transition-[background-color,transform] duration-200 hover:bg-white/[0.08] active:scale-90 active:bg-white/[0.14]"
        >
          <Menu className="size-[22px]" strokeWidth={1.8} aria-hidden />
        </button>
      </header>

      {collapsed && (
        <button
          type="button"
          aria-label="Open sidebar"
          onClick={() => setCollapsed(false)}
          className="fixed left-4 top-4 z-30 hidden rounded-lg border border-line bg-black p-2 text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white lg:block"
        >
          <PanelToggleIcon />
        </button>
      )}

      <aside
        className={`fixed inset-0 z-40 flex w-full flex-col bg-black/95 px-4 pb-4 pt-2 backdrop-blur-2xl lg:p-4 transition-[opacity,transform] duration-200 lg:inset-y-0 lg:right-auto lg:w-72 lg:border-r lg:border-line lg:bg-black lg:opacity-100 lg:backdrop-blur-none ${
          collapsed ? "lg:-translate-x-full" : "lg:translate-x-0"
        } ${
          open
            ? "opacity-100"
            : "pointer-events-none opacity-0 lg:pointer-events-auto"
        }`}
      >
        <div className="flex items-center justify-between lg:px-2 lg:pt-1">
          <p className="text-[18px] font-semibold tracking-tight text-white">
            Zein Khalid.
          </p>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={closeOrCollapse}
            className="-mr-1 rounded-xl p-2.5 text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white lg:mr-0 lg:rounded-md lg:p-1.5 lg:text-white/40"
          >
            <X className="size-[22px] lg:hidden" strokeWidth={1.8} aria-hidden />
            <span className="hidden lg:block">
              <PanelToggleIcon />
            </span>
          </button>
        </div>

        <nav className="mt-5 flex-1 space-y-6 overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-1">
              <p className="px-3 pb-1 text-[11px] font-medium uppercase tracking-wider text-subtle">
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
          className="mt-3 flex items-center gap-3 rounded-xl bg-white/[0.06] p-2.5 transition-colors hover:bg-white/[0.1]"
        >
          <img
            src="/icon.jpg"
            alt=""
            className="size-10 shrink-0 rounded-lg object-cover"
          />
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-[13px] font-medium text-white">
              Zein Khalid
            </span>
            <span className="block truncate text-[12px] text-subtle">
              {email}
            </span>
          </span>
          <ChevronRight className="size-4 shrink-0 text-white/40" aria-hidden />
        </a>
      </aside>
    </>
  );
}
