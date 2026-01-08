import { injectManifest } from 'workbox-build';

const OUT_DIR = 'out';
const SW_SRC = 'public/sw.js';
const SW_DEST = 'out/sw.js';

async function main() {
  console.log('🔧 Generating service worker with Workbox...\n');

  try {
    const { count, size, warnings } = await injectManifest({
      swSrc: SW_SRC,
      swDest: SW_DEST,
      globDirectory: OUT_DIR,
      globPatterns: ['**/*.html', '**/*.js', '**/*.css', '**/*.json', '**/*.svg', '**/*.png'],
      globIgnores: ['**/sw.js', '**/*.txt', '**/ws.js'],
      // Maximum file size to precache (20MB)
      maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
    });

    if (warnings.length > 0) {
      console.warn('⚠️  Warnings:');
      warnings.forEach((warning) => console.warn(`   ${warning}`));
      console.log('');
    }

    console.log(`✅ Service worker generated!`);
    console.log(`📦 Precached ${count} files (${(size / 1024).toFixed(1)} KB)\n`);
  } catch (error) {
    console.error('❌ Error generating service worker:', error);
    process.exit(1);
  }
}

main();
