import type { Metadata } from "next";
import StacksSection from "@/components/StacksSection";

export const metadata: Metadata = {
  title: "Stacks",
  alternates: { canonical: "/stacks" },
  description:
    "Tech stack of Zein Khalid: Next.js, React, TypeScript, Tailwind, Git, Figma and more.",
};

export default function StacksPage() {
  return (
      <StacksSection />
  );
}
