import type { Metadata } from "next";
import AboutBento from "@/components/AboutBento";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
  description:
    "About Zein Khalid — full-stack developer and aspiring AI engineer from Quezon City, Philippines. Background, interests and what I build.",
};

export default function AboutPage() {
  return <AboutBento />;
}
