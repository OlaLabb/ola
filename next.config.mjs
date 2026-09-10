/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * La pagina no tiene backend ni nada dinamico: se exporta como HTML plano a
   * `out/`. Asi corre en cualquier hosting estatico (Cloudflare Pages, Netlify,
   * GitHub Pages...) sin runtime de Node, sin OpenNext y sin funciones.
   */
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  // Requisito del export estatico si algun dia se usa next/image.
  images: { unoptimized: true },
};

export default nextConfig;
