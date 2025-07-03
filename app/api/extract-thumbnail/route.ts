import { type NextRequest, NextResponse } from "next/server"
import { extractVideoId, validateYouTubeUrl, generateThumbnailUrls } from "@/lib/utils"

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL es requerida" }, { status: 400 })
    }

    if (!validateYouTubeUrl(url)) {
      return NextResponse.json({ error: "URL de YouTube inválida" }, { status: 400 })
    }

    const videoId = extractVideoId(url)
    if (!videoId) {
      return NextResponse.json({ error: "No se pudo extraer el ID del video" }, { status: 400 })
    }

    const thumbnailUrls = generateThumbnailUrls(videoId)

    return NextResponse.json({
      videoId,
      thumbnails: thumbnailUrls,
      success: true,
    })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
