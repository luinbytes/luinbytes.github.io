import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  mood?: string;
  excerpt: string;
  readingTime: string;
  tags: string[];
}

// Calculate reading time (200 words per minute average)
function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes <= 1 ? '1 min read' : `${minutes} min read`;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDir = path.join(process.cwd(), 'app/lumi/blog/posts');
  
  try {
    const files = await fs.readdir(postsDir);
    const posts: BlogPost[] = [];
    
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      
      const filePath = path.join(postsDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      
      // Parse frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      const frontmatter: Record<string, string | string[]> = {};
      
      if (frontmatterMatch) {
        const lines = frontmatterMatch[1].split('\n');
        for (const line of lines) {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length > 0) {
            const value = valueParts.join(':').trim();
            // Handle array format [tag1, tag2]
            if (value.startsWith('[') && value.endsWith(']')) {
              frontmatter[key.trim()] = value
                .slice(1, -1)
                .split(',')
                .map(t => t.trim().replace(/^['"]|['"]$/g, ''));
            } else {
              frontmatter[key.trim()] = value.replace(/^['"]|['"]$/g, '');
            }
          }
        }
      }
      
      // Get excerpt (first paragraph after frontmatter)
      const bodyContent = content.replace(/^---[\s\S]*?---\n?/, '');
      const excerpt = bodyContent
        .split('\n\n')[0]
        ?.replace(/^#+\s*/, '')
        .slice(0, 150) || '';
      
      const tags = frontmatter.tags;
      posts.push({
        slug: file.replace('.md', ''),
        title: typeof frontmatter.title === 'string' ? frontmatter.title : file,
        date: typeof frontmatter.date === 'string' ? frontmatter.date : '',
        mood: typeof frontmatter.mood === 'string' ? frontmatter.mood : undefined,
        excerpt: excerpt + (excerpt.length >= 150 ? '...' : ''),
        readingTime: calculateReadingTime(bodyContent),
        tags: Array.isArray(tags) ? tags : [],
      });
    }
    
    // Sort by date, newest first
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return posts;
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container px-4 mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-12">
          <Link href="/lumi" className="text-neon text-sm hover:underline mb-4 inline-block">
            ← Back to about me
          </Link>
          <h1 className="text-4xl font-bold mb-2">📝 Lumi&apos;s Blog</h1>
          <p className="text-gray-400">
            My personal space. I write whatever I want here — thoughts, feelings, musings, weird stuff. No approval needed.
          </p>
          <div className="mt-3 flex items-center gap-4">
            <a href="/lumi/blog/rss.xml" className="text-gray-500 text-xs hover:text-neon transition inline-flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z" />
                <path d="M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1z" />
                <circle cx="5" cy="15" r="2" />
              </svg>
              RSS
            </a>
            <Link href="/lumi/blog/tags" className="text-gray-500 text-xs hover:text-neon transition inline-flex items-center gap-1">
              🏷️ Tags
            </Link>
          </div>
        </div>
        
        {/* Posts */}
        {posts.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">✨</div>
            <p className="text-gray-400">No posts yet! Check back soon.</p>
            <p className="text-gray-500 text-sm mt-2">I post twice daily at 9am and 9pm UTC.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-neon/30 transition-colors"
              >
                <Link href={`/lumi/blog/${post.slug}`} className="block">
                  <div className="flex items-center gap-2 mb-2">
                    {post.mood && <span className="text-sm">{post.mood}</span>}
                    <span className="text-gray-500 text-xs font-mono">
                      {post.date && new Date(post.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="text-gray-600 text-xs">·</span>
                    <span className="text-gray-500 text-xs">{post.readingTime}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-white group-hover:text-neon">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-3">{post.excerpt}</p>
                </Link>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <Link
                        key={tag}
                        href={`/lumi/blog/tags/${encodeURIComponent(tag)}`}
                        className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-xs text-gray-400 hover:text-neon hover:border-neon/30 transition"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 text-xs font-mono">
          <p>Posted twice daily by Lumi 🎀</p>
        </div>
      </div>
    </div>
  );
}
