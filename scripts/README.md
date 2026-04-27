# Image Optimization

This directory contains build-time image optimization scripts for the St. Elizabeth High School website.

## Overview

Since Next.js static export (`output: "export"`) disables automatic image optimization, we use a build-time optimization pipeline with sharp to generate responsive images in modern formats.

## How It Works

1. **Source images** are placed in `public/images/`
2. **Build script** (`optimize-images.js`) runs automatically before build
3. **Optimized images** are generated in `public/images/optimized/`
4. **Next.js Image component** uses custom loader to serve optimized images

## Image Formats Generated

- **AVIF**: Best compression, modern browsers (Chrome 85+, Firefox 93+)
- **WebP**: Good compression, wide support (Chrome 23+, Firefox 65+, Safari 14+)
- **JPEG**: Fallback for older browsers

## Responsive Sizes Generated

Images are generated at these widths for responsive srcset:
- 640w, 750w, 828w, 1080w, 1200w, 1920w, 2048w, 3840w

## Usage

### Adding New Images

1. Place original high-resolution image in `public/images/`
2. Run optimization: `npm run optimize:images`
3. Use Next.js Image component in code:

```tsx
import Image from 'next/image';

<Image
  src="/images/hero-background.jpg"
  alt="St. Elizabeth High School campus"
  width={1920}
  height={1080}
  priority // For above-the-fold images
/>
```

### Manual Optimization

```bash
npm run optimize:images
```

### Automatic Optimization

Images are automatically optimized before build:

```bash
npm run build  # Runs optimize:images first via prebuild hook
```

## Quality Settings

Configured in `scripts/optimize-images.js`:

- AVIF: 70% quality
- WebP: 80% quality
- JPEG: 80% quality, progressive
- PNG: 80% quality, compression level 9

## Performance Impact

- **Before**: Unoptimized JPG ~2-5MB, LCP >4s
- **After**: Optimized AVIF ~200-500KB, LCP <2.5s

## Troubleshooting

### "sharp installation failed"

```bash
npm rebuild sharp
```

### "Out of memory" during optimization

Reduce BATCH_SIZE in `optimize-images.js` (default: 5)

### Images not loading in browser

Check that custom loader path is correct in `next.config.ts`:

```typescript
loaderFile: './src/lib/image-loader.ts'
```

## File Structure

```
public/images/
├── hero-background.jpg          # Source image
└── optimized/
    ├── hero-background-640w.avif
    ├── hero-background-640w.webp
    ├── hero-background-640w.jpg
    ├── hero-background-1920w.avif
    ├── hero-background-1920w.webp
    └── hero-background-1920w.jpg
```

## Next Steps

- Add image optimization to CI/CD pipeline
- Consider CDN for image delivery (Cloudflare, Vercel)
- Monitor Core Web Vitals (LCP, CLS) with web-vitals library
