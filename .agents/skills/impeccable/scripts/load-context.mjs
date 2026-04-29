/**
 * Shared context loader for repo-local impeccable commands.
 * Mirrors the installed impeccable loader so the expected project entrypoint exists.
 */

import fs from 'node:fs';
import path from 'node:path';

const PRODUCT_NAMES = ['PRODUCT.md', 'Product.md', 'product.md'];
const DESIGN_NAMES = ['DESIGN.md', 'Design.md', 'design.md'];
const LEGACY_NAMES = ['.impeccable.md'];

export function loadContext(cwd = process.cwd()) {
  let migrated = false;

  let productPath = firstExisting(cwd, PRODUCT_NAMES);

  if (!productPath) {
    const legacyPath = firstExisting(cwd, LEGACY_NAMES);
    if (legacyPath) {
      const newPath = path.join(cwd, 'PRODUCT.md');
      try {
        fs.renameSync(legacyPath, newPath);
        productPath = newPath;
        migrated = true;
      } catch {
        productPath = legacyPath;
      }
    }
  }

  const designPath = firstExisting(cwd, DESIGN_NAMES);

  const product = productPath ? safeRead(productPath) : null;
  const design = designPath ? safeRead(designPath) : null;

  return {
    hasProduct: !!product,
    product,
    productPath: productPath ? path.relative(cwd, productPath) : null,
    hasDesign: !!design,
    design,
    designPath: designPath ? path.relative(cwd, designPath) : null,
    migrated,
  };
}

function firstExisting(cwd, names) {
  for (const name of names) {
    const abs = path.join(cwd, name);
    if (fs.existsSync(abs)) {
      return abs;
    }
  }

  return null;
}

function safeRead(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}

function cli() {
  const result = loadContext(process.cwd());
  console.log(JSON.stringify(result, null, 2));
}

const running = process.argv[1];
if (running?.endsWith('load-context.mjs') || running?.endsWith('load-context.mjs/')) {
  cli();
}
