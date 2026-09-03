import type { Metadata } from "next";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ 
  subsets: ["latin"],
  variable: "--font-fraunces"
});

const manrope = Manrope({ 
  subsets: ["latin"],
  variable: "--font-manrope"
});

const jetbrains = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains"
});

import { resume } from "@/data/resume";

export const metadata: Metadata = {
  title: `${resume.name} | ${resume.role}`,
  description: `Portfolio of ${resume.name}, ${resume.role}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${fraunces.variable} ${manrope.variable} ${jetbrains.variable} font-sans antialiased bg-slate-950 text-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}
