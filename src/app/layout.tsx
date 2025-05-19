/* eslint-disable @next/next/next-script-for-ga */ 
// Disables a specific Next.js lint rule (probably for Google Analytics script usage)

import React from "react";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google"; // Imports a Google font
import { Person, WithContext } from "schema-dts"; // Imports types for structured data (Schema.org)
import "./globals.css"; // Global CSS
import { SanityLive } from "@/sanity/client"; // Sanity CMS live preview

// Define structured data about the person for SEO (JSON-LD format)
const personStructuredData: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bbosa Muhamood GALLIOD",
  url: "https://www.bbosamuhamood.com/",
  image: "https://www.bbosamuhamood.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprprofil.1419460a.png&w=640&q=75",
  sameAs: [
    "https://www.linkedin.com/in/Bbosa Muhamood-galliod/",
    "https://github.com/Bbosa MuhamoodWebPro",
    "https://www.agencenocode.com/",
  ],
  jobTitle: "Next.js / Webflow Web Developer",
  worksFor: {
    "@type": "Organization",
    name: "No Code Agency",
  },
};

// Load the Bricolage Grotesque font
const bG = Bricolage_Grotesque({ subsets: ["latin"] });

// Website metadata for SEO
export const metadata: Metadata = {
  title: "Next.js Web Developer Portfolio - Bbosa MuhamoodWebPro",
  description: "Next.js / Webflow web developer, freelancer, and independent entrepreneur",
  metadataBase: new URL("https://www.bbosamuhamood.com/"),
  keywords: [
    "Web Developer",
    "Next.js",
    "React",
    "web applications",
    "Node.js",
    "Webflow",
    "Freelance",
    "Entrepreneur",
  ],
  alternates: {
    canonical: `/`, // Canonical URL for the homepage
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.bbosamuhamood.com/",
    title: "Portfolio - Bbosa Muhamood",
    description: "Entrepreneur and freelance full-stack Web developer dedicated to your business",
    images: [
      {
        url: `https://www.bbosamuhamood.com/assets/images/opengraph-image.png`,
        width: 800,
        height: 600,
        alt: "Portfolio - Bbosa Muhamood",
      },
    ],
    siteName: "Bbosa Muhamood Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bbosamuhamood",
    title: "Portfolio Bbosa Muhamood",
    description: "Entrepreneur and freelance full-stack Web developer dedicated to your business",
    images: `https://www.bbosamuhamood.com/assets/images/twitter-image.png`,
  },
};

// Root layout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${bG.className}`}> {/* Sets French as the page language and applies the font */}
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Structured data (JSON-LD for SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />
      </head>
      <body>
        {children}
        <SanityLive /> {/* Enables live content updates from Sanity CMS */}
      </body>
    </html>
  );
}
