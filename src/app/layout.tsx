"use client";

import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/Shared/CustomCursor";
import PageTransition from "@/components/Shared/PageTransition";

export const metadata: Metadata = {
  title: "Digital Jaeger Protocol",
  description: "A Production-Grade Next.js Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="cursor-none">
        <CustomCursor />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
