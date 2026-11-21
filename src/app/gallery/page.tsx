import type { Metadata } from "next";
import GallerySection from "@/components/GallerySection";

export const metadata: Metadata = {
  title: "Gallery",
  alternates: { canonical: "/gallery" },
  description:
    "Photo gallery of Zein Khalid: graduation, hackathons and build sessions.",
};

export default function GalleryPage() {
  return <GallerySection />;
}
