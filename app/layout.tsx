import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nature",
  description: "Descubre nuestra tienda online de productos naturales: jabones, shampoos y más, elaborados con ingredientes ecológicos y saludables para el cuidado de humanos y mascotas. Vive una experiencia de bienestar y sostenibilidad con alternativas libres de químicos, amigables con el medio ambiente y pensadas para toda la familia. ¡Cuida tu piel y la de tus mascotas con lo mejor de la naturaleza!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} ${lato.variable} antialiased bg-[#fdfee7]`}
      >
        {children}
      </body>
    </html>
  );
}
