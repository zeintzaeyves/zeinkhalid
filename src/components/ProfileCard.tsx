import Link from "next/link";
import { personal } from "@/data/portfolio";

export default function ProfileCard({ className = "" }: { className?: string }) {
  const { profile } = personal;

  return (
    <div
      className={`relative isolate flex min-h-[26rem] sm:min-h-[28rem] flex-col justify-between overflow-hidden rounded-[28px] border border-line bg-[#0e0e0e] p-5 ${className}`}
    >
      <div className="mt-auto flex flex-col gap-4">
        <div>
          <p className="text-[30px] font-medium leading-tight tracking-tight">
            {profile.name}
          </p>
          <p className="mt-1 text-[14px] text-white/70">{profile.role}</p>
        </div>

        <p className="max-w-xs text-[13px] leading-relaxed text-white/60">
          {profile.bio}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/contact"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-[13px] font-medium text-black transition-colors hover:bg-white/90"
          >
            Get in touch
            <span aria-hidden>↗</span>
          </Link>
          <span className="inline-flex h-9 items-center rounded-full border border-white/20 bg-black/30 px-3.5 text-[13px] text-white/80 backdrop-blur-sm">
            Since {profile.since}
          </span>
        </div>
      </div>
    </div>
  );
}
