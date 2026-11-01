import type { Metadata } from "next";
import AboutBento from "@/components/AboutBento";

export const metadata: Metadata = {
  title: "About — Zein Khalid",
};

export default function AboutPage() {
  return <AboutBento />;
}
