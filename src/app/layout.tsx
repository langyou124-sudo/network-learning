import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NetCom — 通信知识学习平台",
  description: "网络工程与通信工程交互式学习系统",
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
        <main className="md:ml-60 ml-0 min-h-screen">
          <div className="px-4 sm:px-8 py-4 sm:py-8 max-w-[1100px] pt-16 md:pt-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
