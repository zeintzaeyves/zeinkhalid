"use client";

import { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import { email, linkedin, projects } from "@/data/portfolio";

const stats = [
  { value: "2+ yrs", label: "Shipping" },
  { value: `${projects.length}`, label: "Projects" },
  { value: "1", label: "AI Hackathon" },
];

const roles = [
  "Full-Stack Developer | Aspiring AI Engineer",
  "Figma to production Next.js",
  "Based in Quezon City, Philippines",
];

function useTypewriter() {
  const [text, setText] = useState("");
  useEffect(() => {
    let ri = 0;
    let n = 0;
    let del = false;
    let hold = 0;
    const iv = setInterval(() => {
      const word = roles[ri];
      if (!del) {
        if (n < word.length) n++;
        else if (hold < 34) hold++;
        else {
          del = true;
          hold = 0;
        }
      } else if (n > 0) n = Math.max(0, n - 2);
      else {
        del = false;
        ri = (ri + 1) % roles.length;
      }
      setText(word.slice(0, n));
    }, 70);
    return () => clearInterval(iv);
  }, []);
  return text;
}

const pill =
  "transition-colors hover:border-zinc-600 hover:bg-[#111] hover:text-zinc-50";

export default function About() {
  const roleText = useTypewriter();
  const [contactsOpen, setContactsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(
    () => () => {
      clearTimeout(copyTimer.current);
    },
    [],
  );

  const copyEmail = () => {
    navigator.clipboard?.writeText(email).catch(() => {});
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <>
      {/*
        Phones/small tablets: photo sits beside the name + title, then the intro below.
        md and up: text column on the left, large portrait on the right.
      */}
      <section
        id="overview"
        className="grid scroll-mt-20 grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-5 md:grid-cols-[minmax(0,1fr)_260px] md:grid-rows-[1fr_auto_auto_1fr] md:gap-x-10 md:gap-y-3.5"
      >
        <div className="size-[72px] overflow-hidden rounded-full border border-[#1f1f1f] bg-[#0a0a0a] md:col-start-2 md:row-span-4 md:row-start-1 md:aspect-[4/5] md:size-auto md:w-full md:rounded-2xl">
          <Avatar
            className="size-full rounded-none"
            imgClassName="object-[50%_25%] transition-transform duration-500 hover:scale-[1.03]"
            fallbackClassName="text-[20px] md:text-[22px]"
            sizes="(min-width: 768px) 260px, 72px"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-1 md:col-start-1 md:row-start-2 md:gap-3.5">
          <h1 className="text-[26px] font-normal leading-tight tracking-[-0.02em] md:text-[34px]">
            Zein Khalid Bulaclac
          </h1>
          <div className="grid text-[13px] leading-snug text-pretty text-zinc-400 md:leading-relaxed">
            <span aria-hidden className="invisible col-start-1 row-start-1">
              {roles[0]}
            </span>
            <span className="col-start-1 row-start-1" aria-label={roles[0]}>
              {roleText}
              <span className="ml-0.5 inline-block h-[13px] w-0.5 animate-pulse bg-[#ffffff] align-[-2px]" />
            </span>
          </div>
        </div>

        <div className="col-span-2 flex min-w-0 flex-col gap-4 md:col-span-1 md:col-start-1 md:row-start-3 md:gap-3.5">
          <p className="max-w-[400px] text-[14px] leading-[1.65] text-pretty text-[#b4b4bc] md:mt-1 md:leading-[1.7]">
            I&apos;m a full-stack developer and an aspiring AI engineer, learning
            to build with LLMs. I design and ship front-end and full-stack products,
            most recently responsive Next.js features across three Filinvest Land
            websites.
          </p>
          <div className="flex flex-wrap gap-2 md:mt-1">
            <button
              type="button"
              onClick={() => setContactsOpen((v) => !v)}
              aria-expanded={contactsOpen}
              className="min-h-11 rounded-full bg-white px-5 text-[13px] font-medium text-black transition-colors hover:bg-white/85 md:min-h-[38px]"
            >
              Contacts
            </button>
            <a
              href="#projects"
              className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-5 text-[13px] text-zinc-300 transition-colors hover:border-white/40 hover:text-white md:min-h-[38px]"
            >
              View projects
            </a>
            <a
              href="/resume.pdf"
              download="Zein-Khalid-Bulaclac-Resume.pdf"
              className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-5 text-[13px] text-zinc-300 transition-colors hover:border-white/40 hover:text-white md:min-h-[38px]"
            >
              Résumé
            </a>
          </div>
          <dl className="mt-3 grid grid-cols-3 border-y border-line">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col gap-2 py-5 ${
                  i > 0 ? "border-l border-line pl-4 sm:pl-5" : "pr-2"
                }`}
              >
                <dd className="flex items-start gap-1 text-[22px] leading-none text-white sm:text-[26px]">
                  {s.value}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 size-3 text-[#ffffff]/70"
                    aria-hidden
                  >
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </dd>
                <dt className="text-[10px] uppercase tracking-[0.12em] text-white/50 sm:text-[11px]">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
          {contactsOpen && (
            <div className="flex max-w-[420px] flex-wrap items-center gap-2.5 rounded-xl border border-[#1f1f1f] bg-[#080808] px-3.5 py-3">
              <span className="min-w-0 flex-[1_1_200px] break-all text-[13px] text-zinc-200">
                {email}
              </span>
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className={`${pill} inline-flex min-h-[30px] items-center rounded-lg border border-zinc-800 px-3 text-[13px] text-zinc-300`}
              >
                LinkedIn
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className={`${pill} min-h-[30px] rounded-lg border border-zinc-800 px-3 text-[13px] text-zinc-300`}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
