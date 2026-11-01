"use client";

import { Check, ChevronRight, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Faq from "./Faq";
import { email, linkedin, location } from "@/data/portfolio";

const rowCls =
  "flex items-center justify-between gap-4 px-4 py-3.5 transition-colors";

const fieldCls =
  "w-full bg-transparent px-4 py-3 text-[15px] text-white outline-none placeholder:text-subtle";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = () => {
    navigator.clipboard?.writeText(email).catch(() => {});
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  const mailto = `mailto:${email}?subject=${encodeURIComponent(
    `Hello Zein${name ? ` — ${name}` : ""}`,
  )}&body=${encodeURIComponent(message)}`;

  return (
    <section id="contact" className="flex scroll-mt-20 flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold tracking-tight">Contact</h2>
        <p className="text-sm text-muted">
          Open to freelance projects and collaborations. Say hello.
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href={`mailto:${email}`}
          className="flex h-12 items-center justify-center rounded-2xl bg-white text-[14px] font-medium text-black hover:bg-white/90 active:scale-[0.97]"
        >
          Email me
        </a>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("open-ask"))}
          className="flex h-12 items-center justify-center rounded-2xl border border-line bg-surface text-[14px] font-medium hover:bg-white/[0.06] active:scale-[0.97]"
        >
          Ask Zein
        </button>
      </div>

      {/* Details: inset grouped list */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[13px] text-muted">Details</h3>
        <div className="overflow-hidden rounded-[22px] border border-line bg-surface">
          <div className={rowCls}>
            <div className="min-w-0">
              <p className="text-[12px] text-muted">Email</p>
              <a
                href={`mailto:${email}`}
                className="block break-all text-[15px] hover:text-white/70"
              >
                {email}
              </a>
            </div>
            <button
              type="button"
              onClick={copy}
              aria-label={copied ? "Copied" : "Copy email"}
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-white/80 hover:bg-white/[0.14] hover:text-white"
            >
              {copied ? (
                <Check className="size-4" strokeWidth={2} aria-hidden />
              ) : (
                <Copy className="size-4" strokeWidth={1.8} aria-hidden />
              )}
            </button>
          </div>

          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className={`${rowCls} group border-t border-line hover:bg-white/[0.03] active:bg-white/[0.06]`}
          >
            <div className="min-w-0">
              <p className="text-[12px] text-muted">LinkedIn</p>
              <p className="break-all text-[15px]">linkedin.com/in/zeinkhalid</p>
            </div>
            <ChevronRight
              className="size-4 shrink-0 text-white/40 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={1.8}
              aria-hidden
            />
          </a>

          <div className={`${rowCls} border-t border-line`}>
            <div className="min-w-0">
              <p className="text-[12px] text-muted">Location</p>
              <p className="text-[15px]">{location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Message form */}
      <form
        action={mailto}
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = mailto;
        }}
        className="flex flex-col gap-3"
      >
        <h3 className="text-[13px] text-muted">Send a message</h3>
        <div className="overflow-hidden rounded-[22px] border border-line bg-surface transition-colors focus-within:border-white/30">
          <input
            className={fieldCls}
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Your name"
          />
          <div className="border-t border-line" />
          <textarea
            className={`${fieldCls} min-h-36 resize-none`}
            placeholder="Tell me what you're building..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-label="Message"
          />
        </div>
        <button
          type="submit"
          disabled={!message.trim()}
          className="flex h-12 items-center justify-center rounded-2xl bg-white text-[14px] font-medium text-black hover:bg-white/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-35"
        >
          Send message
        </button>
        <p className="px-1 text-[12px] text-subtle">
          Opens your email app with the message ready to send.
        </p>
      </form>

      <Faq />
    </section>
  );
}
