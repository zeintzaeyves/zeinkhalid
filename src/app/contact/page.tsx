import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact — Zein Khalid",
};

export default function ContactPage() {
  return (
      <ContactSection />
  );
}
