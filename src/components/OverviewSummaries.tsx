import Chip from "./Chip";
import OverviewSection from "./OverviewSection";
import ProjectCarousel from "./ProjectCarousel";
import {
  certifications,
  degree,
  experiences,
  projects,
  stackHighlights,
} from "@/data/portfolio";

export function ProjectsSummary() {
  return (
    <OverviewSection
      id="projects"
      title="Selected Work"
      href="/projects"
      cta="View All Projects"
    >
      <ProjectCarousel projects={projects.slice(0, 3)} />
    </OverviewSection>
  );
}

export function ExperienceSummary() {
  return (
    <OverviewSection
      id="experience"
      title="Experience"
      href="/experience"
      cta="View Full History"
    >
      <ul className="flex flex-col divide-y divide-line border-y border-line">
        {experiences.slice(0, 3).map((e) => (
          <li
            key={`${e.company}-${e.role}`}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 py-3"
          >
            <span className="text-[15px]">
              {e.role} <span className="text-muted">· {e.company}</span>
            </span>
            <span className="text-[13px] text-muted">{e.period}</span>
          </li>
        ))}
      </ul>
    </OverviewSection>
  );
}

export function EducationSummary() {
  return (
    <OverviewSection
      id="education"
      title="Education"
      href="/education"
      cta="View Education"
    >
      <div className="flex flex-col gap-1.5 border-y border-line py-3">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
          <span className="text-[15px]">
            {degree.program}{" "}
            <span className="text-muted">· {degree.school}</span>
          </span>
          <span className="text-[13px] text-muted">{degree.period}</span>
        </div>
        <p className="text-[13px] text-muted">
          {certifications.length} certifications
        </p>
      </div>
    </OverviewSection>
  );
}

export function StacksSummary() {
  return (
    <OverviewSection
      id="stacks"
      title="Stacks"
      href="/stacks"
      cta="Explore All Skills"
    >
      <div className="flex flex-wrap gap-2">
        {stackHighlights.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>
    </OverviewSection>
  );
}
