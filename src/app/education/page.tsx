import type { Metadata } from "next";
import EducationSection from "@/components/EducationSection";

export const metadata: Metadata = {
  title: "Education",
  alternates: { canonical: "/education" },
  description:
    "Education and certifications of Zein Khalid: BS Computer Science, freeCodeCamp, Flux Academy and Anthropic Claude Code certification.",
};

export default function EducationPage() {
  return (
      <EducationSection />
  );
}
