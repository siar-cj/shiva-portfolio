import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import ClientWrapper from "@/components/ClientWrapper";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "siva.cs | Cloud & DevOps Engineer",
  description: "Building reliable pipelines, scalable infrastructure, and automated workflows. Turning complexity into clean, reproducible systems.",
  keywords: ["DevOps", "Platform Engineer", "Kubernetes", "AWS", "Azure", "CI/CD", "Terraform", "Siva Chandrasekhar Javvadi"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
