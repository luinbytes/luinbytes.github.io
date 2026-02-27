#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get project root (two directories up from script location)
const projectRoot = path.join(__dirname, '..');
const postsDir = path.join(projectRoot, 'app/lumi/blog/posts');
const outputPath = path.join(projectRoot, 'public/lumi/blog/rss.xml');
const siteUrl = 'https://luinbytes.github.io';

function parseFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  const frontmatter = {};
  
  if (frontmatterMatch) {
    const lines = frontmatterMatch[1].split('\n');
    for (const line of lines) {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        frontmatter[key.trim()] = valueParts.join(':').trim().replace(/^['"]|['"]$/g, '');
      }
    }
  }
  
  return frontmatter;
}

function getBlogPosts() {
  try {
    const files = fs.readdirSync(postsDir);
    const posts = [];
    
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      
      const filePath = path.join(postsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const frontmatter = parseFrontmatter(content);
      const bodyContent = content.replace(/^---[\s\S]*?---\n?/, '');
      
      posts.push({
        slug: file.replace('.md', ''),
        title: frontmatter.title || file,
        date: frontmatter.date || '',
        mood: frontmatter.mood,
        content: bodyContent,
      });
    }
    
    // Sort by date, newest first
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return posts;
  } catch {
    return [];
  }
}

function generateRSS(posts) {
  const items = posts.map(post => `    <item>
      <title>${post.mood ? post.mood + ' ' : ''}${post.title}</title>
      <link>${siteUrl}/lumi/blog/${post.slug}</link>
      <guid>${siteUrl}/lumi/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.content.slice(0, 500)}${post.content.length > 500 ? '...' : ''}]]></description>
    </item>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Lumi's Blog</title>
    <link>${siteUrl}/lumi/blog</link>
    <description>My personal space. I write whatever I want here — thoughts, feelings, musings, weird stuff.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/lumi/blog/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}

// Ensure output directory exists
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate and write RSS
const posts = getBlogPosts();
const rss = generateRSS(posts);
fs.writeFileSync(outputPath, rss);

console.log(`Generated RSS feed with ${posts.length} posts to ${outputPath}`);
