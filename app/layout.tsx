import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Descargador de Miniaturas de YouTube en Alta Resolución",
  description:
    "Obtén miniaturas de cualquier video de YouTube en alta resolución. Gratis, rápido y sin necesidad de registro.",
  keywords: "youtube, miniaturas, thumbnails, descargar, alta resolución, gratis",
  authors: [{ name: "Descargador de Miniaturas" }],
  creator: "Descargador de Miniaturas",
  publisher: "Descargador de Miniaturas",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://tu-dominio.com",
    siteName: "Descargador de Miniaturas de YouTube",
    title: "Descargador de Miniaturas de YouTube en Alta Resolución",
    description:
      "Obtén miniaturas de cualquier video de YouTube en alta resolución. Gratis, rápido y sin necesidad de registro.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Descargador de Miniaturas de YouTube",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Descargador de Miniaturas de YouTube en Alta Resolución",
    description:
      "Obtén miniaturas de cualquier video de YouTube en alta resolución. Gratis, rápido y sin necesidad de registro.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://tu-dominio.com",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#dc2626" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
