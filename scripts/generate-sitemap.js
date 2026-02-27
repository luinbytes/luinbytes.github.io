#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const siteUrl = 'https://luinbytes.github.io';
const projectRoot = path.join(__dirname, '..');
const outputPath = path.join(projectRoot, 'public/sitemap.xml');

// Static pages
const staticPages = [
  '',
  '/lumi',
  '/lumi/blog',
  '/lumi/blog/tags',
];

// Get blog posts
function getBlogPosts() {
  const postsDir = path.join(projectRoot, 'app/lumi/blog/posts');
  const slugs = [];
  
  try {
    const files = fs.readdirSync(postsDir);
    for (const file of files) {
      if (file.endsWith('.md')) {
        slugs.push(file.replace('.md', ''));
      }
    }
  } catch {
    // Directory doesn't exist yet
  }
  
  return slugs;
}

// Get tags from blog posts
function getTags() {
  const postsDir = path.join(projectRoot, 'app/lumi/blog/posts');
  const tagSet = new Set();
  
  try {
    const files = fs.readdirSync(postsDir);
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      
      const filePath = path.join(postsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (frontmatterMatch) {
        const tagsMatch = frontmatterMatch[1].match(/tags:\s*\[([^\]]+)\]/);
        if (tagsMatch) {
          const tags = tagsMatch[1].split(',').map(t => t.trim().replace(/^['"]|['"]$/g, ''));
          tags.forEach(tag => tagSet.add(tag));
        }
      }
    }
  } catch {
    // Directory doesn't exist or no posts
  }
  
  return Array.from(tagSet);
}

function generateSitemap() {
  const posts = getBlogPosts();
  const tags = getTags();
  
  const allUrls = [
    ...staticPages,
    ...posts.map(slug => `/lumi/blog/${slug}`),
    ...tags.map(tag => `/lumi/blog/tags/${encodeURIComponent(tag)}`),
  ];
  
  const today = new Date().toISOString().split('T')[0];
  
  const urlElements = allUrls.map(url => {
    // Blog posts get higher priority
    const isBlogPost = url.startsWith('/lumi/blog/') && !url.includes('/tags/');
    const priority = isBlogPost ? '0.8' : '0.6';
    
    return `  <url>
    <loc>${siteUrl}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

// Generate and write sitemap
const sitemap = generateSitemap();
fs.writeFileSync(outputPath, sitemap);

console.log(`Generated sitemap with ${sitemap.split('<url>').length - 1} URLs to ${outputPath}`);
