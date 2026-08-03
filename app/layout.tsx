import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import GlassDistortion from "@/components/GlassDistortion";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ColorPickerWidget from "@/components/theme/ColorPickerWidget";
import { site } from "@/data/site";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = site.url ?? "https://mrafiq.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Muhammad Rafiq | Full-Stack Developer & Software Engineer",
    template: "%s | Muhammad Rafiq",
  },
  description:
    "Explore Muhammad Rafiq's portfolio. Full-Stack Developer specializing in high-performance web/mobile apps, AI/ML integrations, DevOps, and SDET.",
  applicationName: "Muhammad Rafiq Portfolio",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  keywords: [
    "Muhammad Rafiq",
    "Rafiq Portfolio",
    "Full-Stack Developer",
    "Software Engineer",
    "DevOps",
    "SDET",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MERN Stack",
    "React Native",
    "MongoDB",
    "SQL",
    "Python",
    "FastAPI",
    "Docker",
    "Playwright",
    "Vercel",
    "AI agents",
    "LLM applications",
  ],
  authors: [{ name: "Muhammad Rafiq" }],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Muhammad Rafiq | Full-Stack Developer & Software Engineer",
    description:
      "Explore Muhammad Rafiq's portfolio. Full-Stack Developer specializing in high-performance web/mobile apps, AI/ML integrations, DevOps, and SDET.",
    url: siteUrl,
    type: "website",
    siteName: "Muhammad Rafiq Portfolio",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}${site.ogImage}`,
        width: 1200,
        height: 630,
        alt: "Muhammad Rafiq portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Rafiq | Full-Stack Developer & Software Engineer",
    description:
      "Explore Muhammad Rafiq's portfolio. Full-Stack Developer specializing in high-performance web/mobile apps, AI/ML integrations, DevOps, and SDET.",
    creator: "@mrafiq825",
    images: [`${siteUrl}${site.ogImage}`],
  },
};

export const viewport: Viewport = {
  themeColor: "#EDEEE9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent flash of default accent color and dark theme for returning visitors */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedAccent = localStorage.getItem('accentColor');
                  if (savedAccent) {
                    document.documentElement.style.setProperty('--color-rose', savedAccent);
                  }
                  var savedMode = localStorage.getItem('themeMode');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (savedMode === 'dark' || (!savedMode && systemDark) || (savedMode === 'system' && systemDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full bg-bg-page text-text-primary selection:bg-accent-600/40 selection:text-text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-text-primary"
        >
          Skip to content
        </a>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>
        <ThemeProvider>
          <GlassDistortion />
          <div id="main-content">{children}</div>
          <ColorPickerWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
