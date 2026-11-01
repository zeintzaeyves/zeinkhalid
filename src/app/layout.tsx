import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import AskOverlay from "@/components/AskOverlay";

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
  title: "Zein Khalid — Front-End & Full-Stack Developer",
  description:
    "Portfolio of Zein Khalid — front-end and full-stack developer and UI/UX designer in Quezon City, Philippines. Next.js, React, TypeScript and AI chatbots.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <div className="flex-1 lg:pl-[21rem]">
          <Sidebar />
          <main className="mx-auto flex w-full max-w-[52rem] flex-col gap-14 px-4 pb-10 pt-10 sm:px-6 lg:pt-20">
            {children}
          </main>
          <Footer />
        </div>
        <AskOverlay />
      </body>
    </html>
  );
}
