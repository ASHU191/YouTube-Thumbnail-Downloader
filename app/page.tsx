"use client"

import type React from "react"
import type { ThumbnailData } from "@/types" // Import ThumbnailData

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, Youtube, AlertCircle, Loader2 } from "lucide-react"
import { extractVideoId, validateYouTubeUrl } from "@/lib/utils"
import MainThumbnailViewer from "@/components/MainThumbnailViewer"
import Image from "next/image"

interface ThumbnailSizes {
  maxres: string
  hq: string
  mq: string
  sd: string
}

export default function HomePage() {
  const [url, setUrl] = useState("")
  const [thumbnailSizes, setThumbnailSizes] = useState<ThumbnailSizes | null>(null)
  const [mainThumbnail, setMainThumbnail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [videoTitle, setVideoTitle] = useState("")

  const thumbnailQualities: ThumbnailData[] = [
    { quality: "maxresdefault", url: "", label: "Máxima Resolución (1280x720)" },
    { quality: "hqdefault", url: "", label: "Alta Calidad (480x360)" },
    { quality: "mqdefault", url: "", label: "Calidad Media (320x180)" },
    { quality: "sddefault", url: "", label: "Calidad Estándar (640x480)" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setThumbnailSizes(null)
    setMainThumbnail("")
    setVideoTitle("")

    if (!validateYouTubeUrl(url)) {
      setError("Por favor, ingresa una URL válida de YouTube")
      return
    }

    setLoading(true)

    try {
      const videoId = extractVideoId(url)
      if (!videoId) {
        setError("No se pudo extraer el ID del video de la URL proporcionada")
        return
      }

      const sizes = {
        maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        hq: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        mq: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        sd: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
      }

      setThumbnailSizes(sizes)
      setMainThumbnail(sizes.maxres)
      setVideoTitle(`Video ID: ${videoId}`)
    } catch (err) {
      setError("Ocurrió un error al procesar la URL. Por favor, inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const downloadThumbnail = async (thumbnailUrl: string, filename: string) => {
    try {
      const response = await fetch(thumbnailUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${filename}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Error downloading thumbnail:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 mt-8 relative">
          {/* Logo positioned top-left on desktop */}
          <div className="absolute top-0 left-0 hidden md:block">
            <Image
              src="/placeholder.svg?height=40&width=120"
              alt="Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </div>

          {/* Mobile logo - left aligned */}
          <div className="text-left mb-4 md:hidden">
            <Image
              src="/placeholder.svg?height=32&width=100"
              alt="Logo"
              width={100}
              height={32}
              className="object-contain"
            />
          </div>

          <div className="flex items-center justify-center mb-4">
            <Youtube className="h-8 w-8 md:h-12 md:w-12 text-red-600 mr-2 md:mr-3" />
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">Descargador de Miniaturas</h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Obtén miniaturas de cualquier video de YouTube en alta resolución. Gratis, rápido y sin necesidad de
            registro.
          </p>
        </div>

        {/* Main Form */}
        <Card className="max-w-2xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-lg md:text-xl">
              <Search className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Ingresa la URL del Video
            </CardTitle>
            <CardDescription>Pega la URL completa del video de YouTube para obtener sus miniaturas</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                  disabled={loading}
                />
                <Button type="submit" disabled={loading || !url.trim()} className="w-full sm:w-auto">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  {loading ? "Procesando..." : "Download Thumbnail"}
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {thumbnailSizes && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Miniatura Disponible</h2>
              <p className="text-gray-600 dark:text-gray-300">{videoTitle}</p>
            </div>

            <MainThumbnailViewer
              thumbnailSizes={thumbnailSizes}
              mainThumbnail={mainThumbnail}
              onDownload={downloadThumbnail}
            />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2025 Descargador de Miniaturas de YouTube. Desarrollado por Muhammad Arsalan.</p>
            <p className="mt-2 text-sm">Esta herramienta es independiente y no está afiliada con YouTube o Google.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
