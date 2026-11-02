import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  id: string;
  title: string;
  href: string;
  cta: string;
  children: React.ReactNode;
};

/** A short overview block: title, a subtle link to the full page, content. */
export default function OverviewSection({
  id,
  title,
  href,
  cta,
  children,
}: Props) {
  return (
    <section id={id} className="flex scroll-mt-20 flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-[22px] font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
        <Link
          href={href}
          className="group shrink-0 whitespace-nowrap text-[13px] text-muted transition-colors hover:text-white"
        >
          {cta}{" "}
          <ArrowRight
            className="inline size-3.5 align-[-2px] transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.8}
            aria-hidden
          />
        </Link>
      </div>
      {children}
    </section>
  );
}
