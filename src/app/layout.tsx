import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import ChatWidget from "@/components/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "达博理 — 智能知识学习平台",
  description: "多领域知识体系智能学习平台，AI驱动个性化学习体验",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full" style={{ background: 'var(--bg)' }}>
        <Sidebar />
        <main className="min-h-screen">
          <div className="px-4 sm:px-8 py-4 sm:py-8 max-w-[1100px] pt-16 md:pt-8 mx-auto">
            {children}
          </div>
        </main>
        <ChatWidget />
      </body>
    </html>
  );
}
