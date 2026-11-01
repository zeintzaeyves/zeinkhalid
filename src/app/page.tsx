import About from "@/components/About";
import ProjectCta from "@/components/ProjectCta";
import {
  EducationSummary,
  ExperienceSummary,
  ProjectsSummary,
  StacksSummary,
} from "@/components/OverviewSummaries";

export default function Home() {
  return (
    <>
        <About />

        <ProjectsSummary />

        <ExperienceSummary />

        <EducationSummary />

        <StacksSummary />

        <ProjectCta
          id="contact"
          secondary={{ label: "View Services", href: "/services" }}
        />

    </>
  );
}
