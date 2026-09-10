"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * Carga solo el subconjunto de Framer Motion que usamos (animaciones + exit +
 * variantes). Ahorra ~20 kB frente a importar la libreria completa: importa en
 * celulares de gama baja con conectividad limitada, que es donde se vera esta
 * pagina. Dentro de este proveedor se usan componentes `m.*`, no `motion.*`.
 */
export default function Movimiento({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
