import type { Metadata } from "next";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectCta from "@/components/ProjectCta";

export const metadata: Metadata = {
  title: "Experience",
  alternates: { canonical: "/experience" },
  description:
    "Work experience of Zein Khalid across software development, front-end, full-stack, UI/UX design and technical support roles.",
};

export default function ExperiencePage() {
  return (
    <>
        <ExperienceSection />

        <ProjectCta secondary={{ label: "View Projects", href: "/projects" }} />

    </>
  );
}
