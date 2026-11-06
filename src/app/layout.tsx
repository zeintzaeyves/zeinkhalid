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

export const metadata: Metadata = {
  title: "Zein Khalid — Full-Stack Developer & Aspiring AI Engineer",
  description:
    "Portfolio of Zein Khalid — full-stack developer and aspiring AI engineer in Quezon City, Philippines. Next.js, React, TypeScript and AI chatbots.",
  icons: { icon: "/icon.jpg", shortcut: "/icon.jpg", apple: "/icon.jpg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-transparent text-white">
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
