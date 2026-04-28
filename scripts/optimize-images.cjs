const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const INPUT_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized');
const SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]; // Responsive sizes

// Quality settings
const QUALITY = {
  webp: 80,
  avif: 70,
  jpeg: 80,
  png: 80,
};

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Get all image files from directory recursively
 */
function getImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip optimized directory
      if (file !== 'optimized') {
        getImageFiles(filePath, fileList);
      }
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Optimize single image to multiple formats and sizes
 */
async function optimizeImage(inputPath) {
  const relativePath = path.relative(INPUT_DIR, inputPath);
  const parsedPath = path.parse(relativePath);
  const outputBase = path.join(OUTPUT_DIR, parsedPath.dir, parsedPath.name);

  // Ensure output subdirectory exists
  const outputSubdir = path.join(OUTPUT_DIR, parsedPath.dir);
  if (!fs.existsSync(outputSubdir)) {
    fs.mkdirSync(outputSubdir, { recursive: true });
  }

  console.log(`Optimizing: ${relativePath}`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Generate responsive sizes
    for (const size of SIZES) {
      // Skip if size is larger than original
      if (size > metadata.width) continue;

      // Generate WebP
      await image
        .clone()
        .resize(size, null, { withoutEnlargement: true })
        .webp({ quality: QUALITY.webp })
        .toFile(`${outputBase}-${size}w.webp`);

      // Generate AVIF (better compression, slower encoding)
      await image
        .clone()
        .resize(size, null, { withoutEnlargement: true })
        .avif({ quality: QUALITY.avif })
        .toFile(`${outputBase}-${size}w.avif`);

      // Generate JPEG fallback
      if (metadata.format !== 'png') {
        await image
          .clone()
          .resize(size, null, { withoutEnlargement: true })
          .jpeg({ quality: QUALITY.jpeg, progressive: true })
          .toFile(`${outputBase}-${size}w.jpg`);
      }
    }

    // Generate original size optimized version
    if (metadata.format === 'png') {
      await image
        .clone()
        .png({ quality: QUALITY.png, compressionLevel: 9 })
        .toFile(`${outputBase}-original.png`);
    } else {
      await image
        .clone()
        .jpeg({ quality: QUALITY.jpeg, progressive: true })
        .toFile(`${outputBase}-original.jpg`);
    }

    console.log(`✓ Optimized: ${relativePath}`);
  } catch (error) {
    console.error(`✗ Failed to optimize ${relativePath}:`, error.message);
  }
}

/**
 * Main optimization function
 */
async function optimizeAllImages() {
  console.log('Starting image optimization...\n');

  const imageFiles = getImageFiles(INPUT_DIR);
  console.log(`Found ${imageFiles.length} images to optimize\n`);

  // Process images in batches to avoid memory issues
  const BATCH_SIZE = 5;
  for (let i = 0; i < imageFiles.length; i += BATCH_SIZE) {
    const batch = imageFiles.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(optimizeImage));
  }

  console.log('\n✓ Image optimization complete!');
  console.log(`Optimized images saved to: ${OUTPUT_DIR}`);
}

// Run optimization
optimizeAllImages().catch((error) => {
  console.error('Image optimization failed:', error);
  process.exit(1);
});
