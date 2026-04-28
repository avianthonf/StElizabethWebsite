export default function imageLoader({ src, width }: {
  src: string;
  width: number;
  quality?: number;
}) {
  // For static export, point to pre-optimized images
  // Images are optimized by scripts/optimize-images.js during build

  // Remove leading slash if present
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src;

  // Extract path and filename
  const lastSlash = cleanSrc.lastIndexOf('/');
  const path = lastSlash >= 0 ? cleanSrc.slice(0, lastSlash) : '';
  const filename = lastSlash >= 0 ? cleanSrc.slice(lastSlash + 1) : cleanSrc;

  // Remove extension
  const lastDot = filename.lastIndexOf('.');
  const name = lastDot >= 0 ? filename.slice(0, lastDot) : filename;

  // Build optimized image path
  const optimizedPath = path ? `/${path}/optimized/${name}` : `/optimized/${name}`;

  // Return WebP version (browser will fall back to AVIF or JPEG if needed)
  return `${optimizedPath}-${width}w.webp`;
}
