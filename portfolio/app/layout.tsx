import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Igor Lis - DevOps & AI Specialist | Portfolio",
  description: "Founder of PWr Now (400+ users, 200k TikTok views) | Systems Engineering Student at WUST | DevOps & AI Specialist from Wrocław. Kubernetes pipelines, local LLMs, audio AI processing.",
  keywords: ["Igor Lis", "DevOps", "AI", "Machine Learning", "Kubernetes", "PWr Now", "Portfolio"],
  authors: [{ name: "Igor Lis" }],
  openGraph: {
    title: "Igor Lis - DevOps & AI Specialist",
    description: "Founder of PWr Now | Systems Engineering Student at WUST",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
