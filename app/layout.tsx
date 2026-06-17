import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indalo ROB — Sistema de Lanzamiento",
  description:
    "Sistema completo de lanzamiento del Indalo ROB en el mercado hispano USA. Validación 90 días · $10,000/mes · 8 entregables.",
  openGraph: {
    title: "Indalo ROB — Sistema de Lanzamiento",
    description: "Mercado Hispano USA · Validación 90 días · $10,000/mes",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
