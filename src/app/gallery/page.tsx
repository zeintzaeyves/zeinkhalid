import type { Metadata } from "next";
import GallerySection from "@/components/GallerySection";

export const metadata: Metadata = {
  title: "Gallery — Zein Khalid",
};

export default function GalleryPage() {
  return <GallerySection />;
}
