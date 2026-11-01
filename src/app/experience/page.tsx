import type { Metadata } from "next";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectCta from "@/components/ProjectCta";

export const metadata: Metadata = {
  title: "Experience — Zein Khalid",
};

export default function ExperiencePage() {
  return (
    <>
        <ExperienceSection />

        <ProjectCta secondary={{ label: "View Projects", href: "/projects" }} />

    </>
  );
}
