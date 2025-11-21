#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..', '..', '..');

console.log('📄 Syncing offline.blade.php to sw.ts...');

try {
    // Read offline.blade.php template
    const offlineHtmlPath = join(rootDir, 'resources/views/offline.blade.php');
    const offlineHtml = readFileSync(offlineHtmlPath, 'utf-8');

    // Read sw.ts
    const swPath = join(rootDir, 'resources/js/plugins/sw.ts');
    let swContent = readFileSync(swPath, 'utf-8');

    // Find the HTML section in sw.ts and replace it
    const htmlStartPattern = /\/\/ Offline HTML page \(auto-generated from offline\.blade\.php\)\s*return new Response\(\s*`/;

    if (!htmlStartPattern.test(swContent)) {
        console.error('❌ Could not find HTML section in sw.ts');
        process.exit(1);
    }

    // Extract the offline HTML without the <?php tags
    const cleanHtml = offlineHtml.replace(/<\?php\s*|\s*\?>/g, '').trim();

    // Replace the HTML section - more flexible regex pattern
    const htmlSectionRegex =
        /\/\/ Offline HTML page \(auto-generated from offline\.blade\.php\)\s*return new Response\(\s*`[\s\S]*?`,\s*\{\s*headers:\s*\{\s*'Content-Type':\s*'text\/html;\s*charset=utf-8'\s*\},\s*status:\s*503,\s*statusText:\s*'Service Unavailable',\s*\},?\s*\);/;

    swContent = swContent.replace(
        htmlSectionRegex,
        `// Offline HTML page (auto-generated from offline.blade.php)
                    return new Response(
                        \`${cleanHtml}\`,
                        {
                            headers: { 'Content-Type': 'text/html; charset=utf-8' },
                            status: 503,
                            statusText: 'Service Unavailable',
                        },
                    );`,
    );

    // Write back to sw.ts
    writeFileSync(swPath, swContent, 'utf-8');

    console.log('✅ Successfully synced offline page to service worker');
} catch (error) {
    console.error('❌ Error syncing offline page:', error.message);
    process.exit(1);
}
