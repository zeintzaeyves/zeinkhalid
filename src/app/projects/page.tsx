import type { Metadata } from "next";
import ProjectShowcase from "@/components/ProjectShowcase";
import { projects } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Projects — Zein Khalid",
};

export default function ProjectsPage() {
  return (
    <section id="projects" className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold tracking-tight">Projects</h2>
        <p className="text-sm text-muted">
          {projects.length} things I&apos;ve designed and built. Tap a card for
          details.
        </p>
      </div>
      <ProjectShowcase />
    </section>
  );
}
