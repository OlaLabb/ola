import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Poppins } from "next/font/google";

import "./globals.css";
import { EMAIL, OG_IMAGE, SITE_URL, brand, seo } from "@/content/site";

/**
 * Tipografia:
 * - Poppins 300 (cuerpo) / 600 (titulos) / 800 (display).
 * - JetBrains Mono 400 solo para las lineas de "codigo" decorativas.
 * `display: swap` evita bloquear el render en conexiones lentas.
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "600", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: seo.title,
    template: seo.titleTemplate,
  },
  description: seo.description,
  keywords: seo.keywords,
  applicationName: "OLA LAB",
  authors: [{ name: brand.empresa, url: brand.linkedin }],
  creator: brand.empresa,
  publisher: brand.empresa,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "OLA LAB",
    locale: "es_CO",
    title: seo.title,
    description: seo.description,
  },

  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: "#0A0E12",
  colorScheme: "dark",
};

/** Datos estructurados: ayudan a que Google entienda quien esta detras de OLA LAB. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OLA LAB",
  alternateName: "ola lab",
  url: SITE_URL,
  logo: `${SITE_URL}${OG_IMAGE}`,
  image: `${SITE_URL}${OG_IMAGE}`,
  description: seo.description,
  email: EMAIL,
  areaServed: "Pacífico colombiano",
  sameAs: [brand.linkedin],
  parentOrganization: {
    "@type": "Organization",
    name: brand.empresa,
    taxID: brand.nitPlano,
    url: brand.linkedin,
    sameAs: [brand.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: brand.ciudad,
      addressCountry: "CO",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${poppins.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
