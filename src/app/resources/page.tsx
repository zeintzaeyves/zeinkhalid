import type { Metadata } from "next";
import ResourcesSection from "@/components/ResourcesSection";

export const metadata: Metadata = {
  title: "Resources",
  alternates: { canonical: "/resources" },
  description:
    "Tools and resources Zein Khalid uses for design, front-end and full-stack development.",
};

export default function ResourcesPage() {
  return <ResourcesSection />;
}
