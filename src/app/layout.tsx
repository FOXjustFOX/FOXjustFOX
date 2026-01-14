import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import CustomCursor from "@/components/CustomCursor";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "Igor Lis | Systems Engineering",
  description: "Portfolio of Igor Lis - Systems Engineering Student, DevOps & AI Specialist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen font-sans antialiased selection:bg-primary/30 selection:text-white",
          inter.variable,
          ibmPlexMono.variable
        )}
      >
        <SmoothScrolling>
          <CustomCursor />
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
