"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  certifications,
  degree,
  email,
  experiences,
  location,
  personal,
  projects,
  stacks,
} from "@/data/portfolio";

type Msg = { me: boolean; text: string };

const suggestions = [
  "What's your stack?",
  "Where have you worked?",
  "What are you building?",
  "Are you available?",
  "How can I reach you?",
];

/** Simple keyword answers built from the portfolio data. */
function answer(q: string): string {
  const s = q.toLowerCase();
  const has = (...w: string[]) => w.some((x) => s.includes(x));

  if (has("stack", "tech", "skill", "tool", "language", "framework")) {
    const dev = stacks.find((g) => g.label === "Frontend")?.items.join(", ");
    const be = stacks.find((g) => g.label.startsWith("Backend"))?.items.join(", ");
    return `Front end: ${dev}. Back end: ${be}. I design in Figma and ship on Vercel.`;
  }
  if (has("work", "job", "experience", "filinvest", "career", "company")) {
    const f = experiences[0];
    return `Most recently I was a ${f.role} at ${f.company} (${f.period}), building features for the Futura, Aspire and Prestige websites. Before that: freelance front-end, full-stack and UI/UX work, plus technical support at Bangko Mabuhay.`;
  }
  if (has("build", "elevate", "gym", "currently", "working on", "now")) {
    return `Right now I'm building ${personal.building.title}, an ${personal.building.note.toLowerCase()}. I'm also focused on AI engineering: LLM apps and chatbots.`;
  }
  if (has("project", "portfolio", "made", "built", "shipped")) {
    return `A few projects: ${projects
      .slice(0, 4)
      .map((p) => p.title)
      .join(", ")}. See them all on the Projects page.`;
  }
  if (has("available", "hire", "freelance", "open to", "collab")) {
    return "Yes, I'm open to freelance projects and collaborations. Send me a message and tell me what you're building.";
  }
  if (has("where", "based", "live", "location", "city", "from")) {
    return `I'm based in ${location}.`;
  }
  if (has("school", "education", "study", "degree", "college", "university")) {
    return `${degree.program} at ${degree.school} (${degree.period}).`;
  }
  if (has("certif", "claude code", "bootcamp", "course")) {
    return `Certifications and training: ${certifications
      .map((c) => `${c.title} (${c.subtitle})`)
      .join("; ")}.`;
  }
  if (has("contact", "reach", "email", "mail", "message", "talk")) {
    return `The quickest way is email: ${email}. You can also find me on LinkedIn.`;
  }
  if (has("ai", "llm", "chatbot", "claude")) {
    return "I'm an AI-first developer: I build LLM-powered chatbots and I'm working toward a career in AI engineering.";
  }
  if (has("hi", "hello", "hey", "who are you", "about you")) {
    return "Hi! I'm Zein, an AI-first software developer and aspiring AI engineer in Quezon City. Ask me about my work, stack or projects.";
  }
  return `I don't have an answer for that yet. Try asking about my stack, work, projects or availability, or email me at ${email}.`;
}

export default function AskOverlay() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const close = useCallback(() => setOpen(false), []);

  // Ctrl/Cmd + K toggles it; the sidebar pill dispatches "open-ask".
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-ask", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-ask", onOpen);
    };
  }, []);

  // Lock page scroll and focus the field while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const [busy, setBusy] = useState(false);

  const ask = async (q: string) => {
    const text = q.trim().slice(0, 500);
    if (!text || busy) return;
    const history = messages
      .filter((m) => m.text !== "…")
      .map((m) => ({
        role: m.me ? "user" : "assistant",
        content: m.text,
      }));
    setInput("");
    setBusy(true);
    setMessages((m) => [...m, { me: true, text }, { me: false, text: "…" }]);

    let reply: string;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, messages: history }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && typeof data.reply === "string" && data.reply.trim()) {
        reply = data.reply;
      } else if (res.status === 429 || res.status === 400) {
        reply = data.error ?? "Please try again in a moment.";
      } else {
        reply = answer(text); // AI unavailable: fall back to the built-in answers
      }
    } catch {
      reply = answer(text);
    }
    setMessages((m) => [...m.slice(0, -1), { me: false, text: reply }]);
    setBusy(false);
  };

  // Stay mounted briefly after closing so the exit animation can play.
  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }
    const t = setTimeout(() => setMounted(false), 220);
    return () => clearTimeout(t);
  }, [open]);

  if (!mounted) return null;

  const started = messages.length > 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Ask Zein"
      onClick={close}
      className={`fixed inset-0 z-[60] flex items-center bg-black/60 px-5 backdrop-blur-2xl sm:px-10 ${
        open
          ? "animate-[ask-in_0.3s_var(--ease-ios)_both]"
          : "pointer-events-none animate-[ask-out_0.2s_ease-in_forwards]"
      }`}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.07] text-white/80 transition-colors hover:bg-white/15 hover:text-white sm:right-8 sm:top-8"
      >
        <svg
          className="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className={`mx-auto flex max-h-[90vh] w-full max-w-4xl flex-col gap-6 lg:ml-[21rem] lg:mr-auto ${
          open ? "animate-[ask-rise_0.5s_var(--ease-ios)_both]" : ""
        }`}
      >
        <h2 className="text-[34px] font-medium leading-[1.1] tracking-tight sm:text-[48px]">
          What do you want to ask?
        </h2>

        {started && (
          <div className="flex max-h-[40vh] flex-col gap-2.5 overflow-y-auto pr-1">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex animate-[msg-in_0.4s_var(--ease-ios)_both] ${
                  m.me ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  key={m.text === "…" ? "loading" : "done"}
                  className={`max-w-[85%] animate-[ask-in_0.35s_ease-out_both] rounded-[18px] px-4 py-2.5 text-[14px] leading-relaxed ${
                    m.me
                      ? "rounded-br-[6px] bg-white text-black"
                      : "rounded-bl-[6px] border border-white/10 bg-white/[0.08] text-white/90"
                  }`}
                >
                  {m.text === "…" && !m.me ? (
                    <span
                      className="flex h-[22px] items-center gap-1"
                      role="status"
                      aria-label="Zein is typing"
                    >
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="size-1.5 animate-[ask-dot_1.2s_ease-in-out_infinite] rounded-full bg-white/60"
                          style={{ animationDelay: `${d * 0.16}s` }}
                        />
                      ))}
                    </span>
                  ) : m.me ? (
                    m.text
                  ) : (
                    <div className="ask-md">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {m.text}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
          className="flex items-center gap-3 border-b border-white/20 pb-3 transition-colors focus-within:border-white/60"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about Zein"
            aria-label="Your question"
            className="min-w-0 flex-1 bg-transparent text-[20px] text-white outline-none placeholder:text-white/35"
          />
          <button
            type="submit"
            disabled={!input.trim() || busy}
            aria-label="Send"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-black transition-opacity disabled:opacity-30"
          >
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          {suggestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => ask(q)}
              className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[13px] text-white/75 transition-colors hover:bg-white/15 hover:text-white"
            >
              {q}
            </button>
          ))}
        </div>

        <p className="text-[12px] text-white/35">
          Enter to send · Esc to close
        </p>
      </div>
    </div>
  );
}
