import type { Metadata } from "next";
import Chip from "@/components/Chip";
import ProjectCta from "@/components/ProjectCta";
import { howIWork, services } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Services — Zein Khalid",
};

export default function ServicesPage() {
  return (
    <section id="services" className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold tracking-tight">Services</h2>
        <p className="text-sm text-muted">
          What I can build for you. Open to freelance projects and
          collaborations.
        </p>
      </div>

      {/* Services: grouped list */}
      <div className="overflow-hidden rounded-2xl glass">
        {services.map((s, i) => (
          <article
            key={s.title}
            className={`flex items-start gap-3.5 px-4 py-4 ${
              i > 0 ? "border-t border-line" : ""
            }`}
          >
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <h3 className="text-[15px] font-medium">{s.title}</h3>
              <p className="text-[13px] leading-relaxed text-muted">
                {s.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {s.tools.map((t) => (
                  <Chip key={t} size="sm">
                    {t}
                  </Chip>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* How I work */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[13px] text-muted">How I work</h3>
        <ol className="rounded-2xl glass px-5 py-5">
          {howIWork.map((step, i) => {
            const last = i === howIWork.length - 1;
            return (
              <li key={step.title} className="relative flex gap-4">
                {!last && (
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-[6px] top-5 w-px bg-[#ffffff]/30"
                  />
                )}
                <span
                  aria-hidden
                  className="relative z-10 mt-1 size-[13px] shrink-0 rounded-full border-2 border-[#ffffff] bg-surface"
                />
                <div className={`min-w-0 ${last ? "" : "pb-6"}`}>
                  <p className="text-[15px] font-medium">{step.title}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-muted">
                    {step.note}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* CTA */}
      <ProjectCta secondary={{ label: "View Projects", href: "/projects" }} />
    </section>
  );
}
