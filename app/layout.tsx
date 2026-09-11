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

/**
 * ---------------------------------------------------------------------------
 * EL REVELADO AL ENTRAR EN PANTALLA
 * ---------------------------------------------------------------------------
 * Un IntersectionObserver unico para todos los `[data-revelar]` de la pagina,
 * en JS plano dentro del HTML. Tres razones para que no sea un componente:
 *
 *   1. No espera a React. Se activa con el DOM listo, no con la hidratacion.
 *   2. No pesa: no suma nada al bundle.
 *   3. Un solo observer para veinte elementos, no veinte observers.
 *
 * Cada elemento se revela UNA vez y deja de observarse. Si falta el observer o
 * el visitante pidio menos movimiento, la clase `js-revelar` no se pone y el
 * CSS no esconde nada: la pagina se ve entera, sin animacion.
 *
 * El mar del hero no entra aqui: no lleva `data-revelar` y su animacion vive
 * aparte, en components/MarVivo.tsx y en globals.css.
 * ---------------------------------------------------------------------------
 */
const REVELADO = `(function(){try{
if(!("IntersectionObserver" in window))return;
if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
var r=document.documentElement;r.classList.add("js-revelar");
function a(){
var o=new IntersectionObserver(function(es){
for(var i=0;i<es.length;i++){if(!es[i].isIntersecting)continue;
es[i].target.classList.add("revelado");o.unobserve(es[i].target);}
},{rootMargin:"0px 0px -8% 0px",threshold:0});
var n=document.querySelectorAll("[data-revelar]");
for(var i=0;i<n.length;i++)o.observe(n[i]);}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",a);}else{a();}
}catch(e){document.documentElement.classList.remove("js-revelar");}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${poppins.variable} ${mono.variable}`}>
      <body>
        {/* Va de primero a proposito: corre antes de que se pinte el resto del
            body, asi lo que se va a revelar nunca alcanza a verse y esconderse.
            Y va suelto, no dentro de un componente de React: el revelado no
            depende de la hidratacion, que en un celular de gama baja puede
            tardar segundos. Cero kB de bundle. */}
        <script dangerouslySetInnerHTML={{ __html: REVELADO }} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
