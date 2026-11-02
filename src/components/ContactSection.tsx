"use client";

import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Faq from "./Faq";
import { email, linkedin, location } from "@/data/portfolio";

function IconTile({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#b36800]/30 bg-[#b36800]/15 text-[#b36800]">
      {children}
    </span>
  );
}

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
    <section id="contact" className="flex scroll-mt-20 flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold tracking-tight">Contact</h2>
        <p className="text-sm text-muted">
          Open to freelance projects and collaborations. Say hello.
        </p>
      </div>

      {/* Hero card */}
      <div className="glass relative isolate flex flex-col gap-6 overflow-hidden rounded-[28px] p-6 sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 -z-10 size-72 rounded-full bg-[#b36800]/25 blur-3xl"
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-[28px] font-semibold leading-[1.1] tracking-tight sm:text-[36px]">
            Let&apos;s build something
            <br />
            <span className="text-white/40">together.</span>
          </h3>
          <p className="max-w-[26rem] text-[14px] leading-relaxed text-muted">
            Websites, product UI or full-stack builds. Tell me what you have
            in mind and I&apos;ll get back to you.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <a
            href={`mailto:${email}`}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-[14px] font-medium text-black transition-colors hover:bg-white/85 active:scale-[0.97]"
          >
            <Mail className="size-4" strokeWidth={1.8} aria-hidden />
            Email me
          </a>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-ask"))}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-[14px] text-white/85 transition-colors hover:border-white/40 hover:text-white active:scale-[0.97]"
          >
            <MessageCircle className="size-4" strokeWidth={1.8} aria-hidden />
            Ask Zein
          </button>
        </div>
      </div>

      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* Details */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[13px] text-muted">Details</h3>
          <div className="flex flex-col gap-3">
            <div className="glass flex items-center gap-3.5 rounded-2xl p-4">
              <IconTile>
                <Mail className="size-[18px]" strokeWidth={1.7} aria-hidden />
              </IconTile>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] text-muted">Email</p>
                <a
                  href={`mailto:${email}`}
                  className="block truncate text-[14px] hover:text-white/70"
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
              className="glass group flex items-center gap-3.5 rounded-2xl p-4"
            >
              <IconTile>
                <span className="text-[13px] font-semibold">in</span>
              </IconTile>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] text-muted">LinkedIn</p>
                <p className="truncate text-[14px]">linkedin.com/in/zeinkhalid</p>
              </div>
              <ArrowUpRight
                className="size-4 shrink-0 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                strokeWidth={1.8}
                aria-hidden
              />
            </a>

            <div className="glass flex items-center gap-3.5 rounded-2xl p-4">
              <IconTile>
                <MapPin className="size-[18px]" strokeWidth={1.7} aria-hidden />
              </IconTile>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] text-muted">Location</p>
                <p className="text-[14px]">{location}</p>
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
          <div className="glass overflow-hidden rounded-[22px] focus-within:border-[#b36800]/50">
            <input
              className={fieldCls}
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Your name"
            />
            <div className="border-t border-line" />
            <textarea
              className={`${fieldCls} min-h-40 resize-none`}
              placeholder="Tell me what you&apos;re building..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-label="Message"
            />
          </div>
          <button
            type="submit"
            disabled={!message.trim()}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white text-[14px] font-medium text-black transition-colors hover:bg-white/85 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-35"
          >
            <Send className="size-4" strokeWidth={1.8} aria-hidden />
            Send message
          </button>
          <p className="px-1 text-[12px] text-subtle">
            Opens your email app with the message ready to send.
          </p>
        </form>
      </div>

      <Faq />
    </section>
  );
}
