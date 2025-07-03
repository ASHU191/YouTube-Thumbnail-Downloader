"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Search, ImageIcon, User, Crop } from "lucide-react"
import Image from "next/image"

interface ThumbnailSizes {
  maxres: string
  hq: string
  mq: string
  sd: string
}

interface MainThumbnailViewerProps {
  thumbnailSizes: ThumbnailSizes
  mainThumbnail: string
  onDownload: (url: string, filename: string) => void
}

export default function MainThumbnailViewer({ thumbnailSizes, mainThumbnail, onDownload }: MainThumbnailViewerProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const searchOnGoogleLens = () => {
    const lensUrl = `https://lens.google.com/uploadbyurl?url=${encodeURIComponent(mainThumbnail)}`
    window.open(lensUrl, "_blank")
  }

  const sizeOptions = [
    { key: "maxres", label: "1280x720", size: "Máxima Resolución" },
    { key: "hq", label: "480x360", size: "Alta Calidad" },
    { key: "mq", label: "320x180", size: "Calidad Media" },
    { key: "sd", label: "640x480", size: "Calidad Estándar" },
  ]

  const additionalFormats = [
    {
      icon: ImageIcon,
      label: "Banner/Cover",
      description: "Formato banner (1280x720)",
      action: () => onDownload(thumbnailSizes.maxres, "youtube-banner"),
    },
    {
      icon: User,
      label: "Foto de Perfil",
      description: "Formato cuadrado (480x480)",
      action: () => onDownload(thumbnailSizes.hq, "youtube-profile"),
    },
    {
      icon: Crop,
      label: "Miniatura Recortada",
      description: "Formato compacto (320x180)",
      action: () => onDownload(thumbnailSizes.mq, "youtube-thumbnail"),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Main Thumbnail Display */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl text-center">Vista Previa de la Miniatura</CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden max-w-2xl mx-auto">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              </div>
            )}

            {imageError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                <ImageIcon className="h-12 w-12 mb-2" />
                <p className="text-sm text-center">Error al cargar la miniatura</p>
              </div>
            ) : (
              <Image
                src={mainThumbnail || "/placeholder.svg"}
                alt="Vista previa de miniatura de YouTube"
                fill
                className="object-cover"
                onLoad={handleImageLoad}
                onError={handleImageError}
                crossOrigin="anonymous"
              />
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" onClick={searchOnGoogleLens} disabled={imageError}>
            <Search className="h-4 w-4 mr-2" />
            Buscar en Google Lens
          </Button>
        </CardFooter>
      </Card>

      {/* Size Download Buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-center">Descargar por Tamaño</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 justify-center">
            {sizeOptions.map((option) => (
              <Button
                key={option.key}
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 bg-transparent"
                onClick={() => onDownload(thumbnailSizes[option.key as keyof ThumbnailSizes], `youtube-${option.key}`)}
                disabled={imageError}
              >
                <Download className="h-4 w-4" />
                {option.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Format Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-center">Descargas Opcionales</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Formatos adicionales para diferentes usos
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {additionalFormats.map((format, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-3 flex flex-col items-center space-y-2 bg-transparent"
                onClick={format.action}
                disabled={imageError}
              >
                <format.icon className="h-5 w-5 text-red-600" />
                <div className="text-center">
                  <div className="font-semibold text-sm">{format.label}</div>
                  <div className="text-xs text-gray-500">{format.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
