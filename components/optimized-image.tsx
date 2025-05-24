import Image from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  decorative?: boolean; // For decorative images that don't need alt text
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
    const params = new URLSearchParams(src.split("?")[1]);
    const placeholderWidth = params.get("width") || "400";
    const placeholderHeight = params.get("height") || "300";

    if (decorative) {
      // eslint-disable-next-line react/forbid-dom-props
      return (
        <div
          className={cn(
            "bg-muted flex items-center justify-center text-muted-foreground image-placeholder",
            className
          )}
          style={
            {
              "--image-width": `${width || placeholderWidth}px`,
              "--image-height": `${height || placeholderHeight}px`,
            } as React.CSSProperties
          }
          role="presentation"
          aria-hidden="true"
        >
          <span className="text-sm" aria-hidden="true">
            {alt || "Image placeholder"}
          </span>
        </div>
      );
    }

    // eslint-disable-next-line react/forbid-dom-props
    return (
      <div
        className={cn(
          "bg-muted flex items-center justify-center text-muted-foreground image-placeholder",
          className
        )}
        style={
          {
            "--image-width": `${width || placeholderWidth}px`,
            "--image-height": `${height || placeholderHeight}px`,
          } as React.CSSProperties
        }
        role="img"
        aria-label={alt || "Image placeholder"}
      >
        <span className="text-sm" aria-hidden="true">
          {alt || "Image placeholder"}
        </span>
      </div>
    );
  }
  // For external images
  if (src.startsWith("http")) {
    if (decorative) {
      return (
        <Image
          src={src || "/placeholder.svg"}
          alt=""
          width={width || 800}
          height={height || 600}
          className={className}
          priority={priority}
          fill={fill}
          sizes={
            sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
          loading={priority ? "eager" : "lazy"}
          role="presentation"
        />
      );
    }

    return (
      <Image
        src={src || "/placeholder.svg"}
        alt={alt || "Image"}
        width={width || 800}
        height={height || 600}
        className={className}
        priority={priority}
        fill={fill}
        sizes={
          sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        }
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  // For local images
  if (decorative) {
    return (
      <Image
        src={src || "/placeholder.svg"}
        alt=""
        width={width || 800}
        height={height || 600}
        className={className}
        priority={priority}
        fill={fill}
        sizes={
          sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        }
        loading={priority ? "eager" : "lazy"}
        role="presentation"
      />
    );
  }

  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt || "Image"}
      width={width || 800}
      height={height || 600}
      className={className}
      priority={priority}
      fill={fill}
      sizes={
        sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      }
      loading={priority ? "eager" : "lazy"}
    />
  );
}
