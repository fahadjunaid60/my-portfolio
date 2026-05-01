import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Fad Junaid — Full-Stack Developer",
  description:
    "Full-stack developer with seven years of experience crafting scalable web applications. Specializing in React, Next.js, .NET Core, and Node.js.",
  keywords: [
    "Fad Junaid",
    "Full Stack Developer",
    "Software Engineer",
    "React",
    "Next.js",
    ".NET",
    "Node.js",
    "Freelance Developer",
  ],
  authors: [{ name: "Fad Junaid" }],
  openGraph: {
    title: "Fad Junaid — Full-Stack Developer",
    description:
      "Full-stack developer crafting scalable web applications with React, Next.js, and .NET Core.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
