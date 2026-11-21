import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import AskOverlay from "@/components/AskOverlay";
import IntroLoader from "@/components/IntroLoader";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://zeinkhalid.com";
const tagline = "Zein Khalid — Full-Stack Developer & Aspiring AI Engineer";
const desc =
  "Zein Khalid is a full-stack developer and aspiring AI engineer in Quezon City, Philippines, building with Next.js, React, TypeScript and AI chatbots.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: tagline, template: "%s | Zein Khalid" },
  description: desc,
  applicationName: "Zein Khalid",
  authors: [{ name: "Zein Khalid", url: siteUrl }],
  creator: "Zein Khalid",
  publisher: "Zein Khalid",
  keywords: [
    "Zein Khalid",
    "Zein Khalid Bulaclac",
    "Zein Khalid developer",
    "Zein Khalid portfolio",
    "Full-stack developer Philippines",
    "Next.js developer",
    "AI engineer Philippines",
    "Quezon City web developer",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: tagline,
    description: desc,
    url: "/",
    siteName: "Zein Khalid",
    locale: "en_PH",
    type: "website",
    images: [{ url: "/covert.jpg", width: 3024, height: 3024, alt: "Zein Khalid" }],
  },
  twitter: { card: "summary_large_image", title: tagline, description: desc, images: ["/covert.jpg"] },
  icons: { icon: "/icon.jpg", shortcut: "/icon.jpg", apple: "/icon.jpg" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Zein Khalid",
      alternateName: ["Zein Khalid Bulaclac"],
      url: siteUrl,
      image: `${siteUrl}/covert.jpg`,
      jobTitle: "Full-Stack Developer",
      description:
        "Full-stack developer and aspiring AI engineer building with Next.js, React, TypeScript and AI chatbots.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Quezon City",
        addressRegion: "Metro Manila",
        addressCountry: "PH",
      },
      alumniOf: { "@type": "CollegeOrUniversity", name: "City College of Tagaytay" },
      knowsAbout: ["Next.js", "React", "TypeScript", "Full-stack development", "UI/UX design", "AI chatbots"],
      sameAs: ["https://www.linkedin.com/in/zeinkhalid/"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Zein Khalid",
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-transparent text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <div className="app-shell flex-1 lg:pl-[21rem]">
          <Sidebar />
          <main className="mx-auto flex w-full max-w-[52rem] flex-col gap-14 px-4 pb-10 pt-10 sm:px-6 lg:pt-20">
            {children}
          </main>
          <Footer />
        </div>
        <AskOverlay />
        <IntroLoader />
      </body>
    </html>
  );
}
