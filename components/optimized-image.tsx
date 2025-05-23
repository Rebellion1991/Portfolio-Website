import Image from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  decorative?: boolean // For decorative images that don't need alt text
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  decorative = false,
}: OptimizedImageProps) {
  // Handle placeholder SVG URLs
  if (src.startsWith("/placeholder.svg")) {
    const params = new URLSearchParams(src.split("?")[1])
    const placeholderWidth = params.get("width") || "400"
    const placeholderHeight = params.get("height") || "300"

    return (
      <div
        className={cn("bg-muted flex items-center justify-center text-muted-foreground", className)}
        style={{
          width: width || placeholderWidth + "px",
          height: height || placeholderHeight + "px",
        }}
        role={decorative ? "presentation" : "img"}
        aria-label={decorative ? undefined : alt || "Image placeholder"}
      >
        <span className="text-sm" aria-hidden={decorative}>
          {alt || "Image placeholder"}
        </span>
      </div>
    )
  }

  // Ensure alt text is provided for non-decorative images
  const imageAlt = decorative ? "" : alt || "Image"

  // For external images
  if (src.startsWith("http")) {
    return (
      <Image
        src={src || "/placeholder.svg"}
        alt={imageAlt}
        width={width || 800}
        height={height || 600}
        className={className}
        priority={priority}
        fill={fill}
        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        loading={priority ? "eager" : "lazy"}
        role={decorative ? "presentation" : undefined}
      />
    )
  }

  // For local images
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={imageAlt}
      width={width || 800}
      height={height || 600}
      className={className}
      priority={priority}
      fill={fill}
      sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      loading={priority ? "eager" : "lazy"}
      role={decorative ? "presentation" : undefined}
    />
  )
}
