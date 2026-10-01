import type { Metadata } from "next";
import { Inter, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/digi/theme-provider";
import { SiteShell } from "@/components/digi/site-shell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://digiartha.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Digi∞Artha | Digital. Measurable. Growth.",
    template: "%s | Digi∞Artha",
  },
  description:
    "Digi∞Artha connects performance marketing, search, creative, conversion, data and automation to build measurable digital growth. Digital. Measurable. Growth.",
  keywords: [
    "digital growth",
    "performance marketing",
    "SEO",
    "AI search visibility",
    "CRO",
    "marketing analytics",
    "CRM automation",
    "AI growth",
    "DigiArtha",
  ],
  authors: [{ name: "Digi∞Artha" }],
  creator: "Digi∞Artha",
  publisher: "Digi∞Artha",
  applicationName: "Digi∞Artha",
  category: "Digital Growth & Performance Marketing",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Digi∞Artha",
    title: "Digi∞Artha — Digital. Measurable. Growth.",
    description:
      "Turn Digital Into Measurable Growth. Performance marketing, search, creative, conversion, data and automation connected into one digital growth system.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Digi∞Artha — Digital. Measurable. Growth.", type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digi∞Artha — Digital. Measurable. Growth.",
    description:
      "Turn Digital Into Measurable Growth. One connected digital growth system across performance, search, creative, conversion, data and automation.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  other: {
    "theme-color": "#001331",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Digi∞Artha",
  alternateName: "DigiArtha",
  url: SITE_URL,
  slogan: "Digital. Measurable. Growth.",
  description:
    "Digi∞Artha is a digital growth and performance brand connecting performance marketing, search, creative, conversion, data and automation into one continuous digital growth system.",
  parentOrganization: { "@type": "Organization", name: "ISD" },
  knowsAbout: [
    "Performance Marketing",
    "Search & AI Visibility",
    "Creative & Content",
    "Web & Conversion",
    "Data & Analytics",
    "CRM & Automation",
    "AI Growth",
  ],
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Digi∞Artha",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?s={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${manrope.variable} ${jetbrains.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SiteShell>{children}</SiteShell>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
