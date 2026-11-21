import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
  description:
    "Contact Zein Khalid for web development, UI/UX and AI chatbot projects. Based in Quezon City, Philippines.",
};

export default function ContactPage() {
  return (
      <ContactSection />
  );
}
