import Avatar from "./Avatar";
import SocialIcon from "./SocialIcon";
import { email, location, socials } from "@/data/portfolio";

const iconCls = "size-4";

const iconLink =
  "flex size-5 items-center justify-center transition-colors hover:text-white";

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[52rem] px-4 pt-10 sm:px-6">
      <div className="flex flex-col gap-10 border-t border-line pt-10 sm:flex-row sm:justify-between">
        <div className="flex max-w-[16rem] flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <Avatar className="size-8 rounded-lg" sizes="32px" />
            <span className="text-[15px] font-medium">Zein Khalid</span>
          </div>
          <p className="text-[13px] leading-relaxed text-muted">
            AI-first software developer and aspiring AI engineer, building with
            LLMs.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-[13px] font-medium">Contact</p>
          <a
            href={`mailto:${email}`}
            className="break-all text-[13px] text-muted transition-colors hover:text-white"
          >
            {email}
          </a>
          <p className="text-[13px] leading-relaxed text-muted">{location}</p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5 text-[12px] text-subtle">
        <span>© 2026 Zein Khalid. All rights reserved.</span>
        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className={iconLink}
            >
              <SocialIcon name={s.label} />
            </a>
          ))}
          <a href={`mailto:${email}`} aria-label="Email" className={iconLink}>
            <svg
              className={iconCls}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <rect x="3" y="5" width="18" height="14" rx="2.5" />
              <path d="M3.5 7.5l8.5 6 8.5-6" />
            </svg>
          </a>
        </div>
      </div>

      {/* Oversized wordmark, cropped and faded out at the bottom */}
      {/* Oversized wordmark, cropped and faded out at the bottom */}
      <div
        aria-hidden
        className="pointer-events-none mt-6 h-[clamp(5rem,16vw,9.5rem)] select-none overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, #000 25%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 25%, transparent 100%)",
        }}
      >
        <p className="text-center text-[clamp(7rem,24vw,15rem)] font-semibold leading-[0.85] tracking-tighter text-white">
          Zein
        </p>
      </div>
    </footer>
  );
}
