import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Validates if a URL is a valid YouTube URL
 */
export function validateYouTubeUrl(url: string): boolean {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[\w-]+/
  return youtubeRegex.test(url)
}

/**
 * Extracts video ID from various YouTube URL formats
 */
export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

/**
 * Generates thumbnail URLs for a given video ID
 */
export function generateThumbnailUrls(videoId: string) {
  const baseUrl = "https://img.youtube.com/vi"

  return {
    maxres: `${baseUrl}/${videoId}/maxresdefault.jpg`,
    hq: `${baseUrl}/${videoId}/hqdefault.jpg`,
    mq: `${baseUrl}/${videoId}/mqdefault.jpg`,
    sd: `${baseUrl}/${videoId}/sddefault.jpg`,
    default: `${baseUrl}/${videoId}/default.jpg`,
  }
}
