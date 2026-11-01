import Image from "next/image";
import Link from "next/link";
import { email } from "@/data/portfolio";

/** The "Have a project in mind?" card, shared by every page that uses it. */
export default function ProjectCta({
  id,
  secondary,
}: {
  id?: string;
  secondary: { label: string; href: string };
}) {
  return (
    <section
      id={id}
      className="relative isolate flex scroll-mt-20 flex-col items-start gap-6 overflow-hidden rounded-[28px] border border-line bg-surface p-6 sm:p-8"
    >
      <Image
        src="/gallery/archi.jpg"
        alt=""
        fill
        sizes="(min-width: 768px) 736px, 100vw"
        className="-z-20 object-cover"
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/65 to-black/35"
      />

      <div className="flex flex-col gap-2">
        <h2 className="text-[22px] font-semibold tracking-tight">
          Have a project in mind?
        </h2>
        <p className="max-w-xs text-[13px] leading-relaxed text-white/65">
          Tell me what you are building and let us make it happen.
        </p>
      </div>

      <div className="flex w-full max-w-sm gap-3">
        <a
          href={`mailto:${email}`}
          className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-white text-[14px] font-medium text-black hover:bg-white/90 active:scale-[0.97]"
        >
          Talk to Zein
        </a>
        <Link
          href={secondary.href}
          className="flex h-12 flex-1 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.1] text-[14px] font-medium text-white/90 backdrop-blur-md hover:bg-white/[0.18] active:scale-[0.97]"
        >
          {secondary.label}
        </Link>
      </div>
    </section>
  );
}
