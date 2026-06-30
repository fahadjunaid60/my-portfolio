import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getOgImage } from "@/lib/settings";
import { yearsOfExperience } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// The site is dark-only, so the mobile browser UI (Chrome address bar, etc.)
// matches the page background.
export const viewport: Viewport = {
  themeColor: "#000319",
  colorScheme: "dark",
};

export async function generateMetadata(): Promise<Metadata> {
  const og = await getOgImage();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const images = og
    ? [{ url: og.url, width: og.width, height: og.height }]
    : undefined;

  return {
    metadataBase: new URL(siteUrl),
    title: "Fad Junaid — .NET + Next.js Developer | AI Automation",
    description: `Philippines-based full-stack developer in the rare .NET + Next.js stack, plus AI automation. ${yearsOfExperience} years building scalable web apps and agentic workflows. Open to freelance and remote work.`,
    alternates: { canonical: "/" },
    keywords: [
      "Fad Junaid",
      "Fahad Junaid",
      ".NET and Next.js Developer",
      ".NET React Developer Philippines",
      "AI Automation Developer Philippines",
      "Agentic Workflow Developer",
      "Freelance .NET Developer",
      "Next.js Developer Philippines",
      "Full Stack Developer Philippines",
      "Hire .NET Next.js Developer",
    ],
    authors: [{ name: "Fad Junaid" }],
    openGraph: {
      title: "Fad Junaid — Full-Stack Developer",
      description:
        "Full-stack developer crafting scalable web applications with React, Next.js, and .NET Core.",
      type: "website",
      locale: "en_US",
      url: siteUrl,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: "Fad Junaid — Full-Stack Developer",
      description:
        "Full-stack developer crafting scalable web applications with React, Next.js, and .NET Core.",
      images: og ? [og.url] : undefined,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
