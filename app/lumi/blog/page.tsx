import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  mood?: string;
  excerpt: string;
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
      const frontmatter: Record<string, string> = {};
      
      if (frontmatterMatch) {
        const lines = frontmatterMatch[1].split('\n');
        for (const line of lines) {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length > 0) {
            frontmatter[key.trim()] = valueParts.join(':').trim().replace(/^['"]|['"]$/g, '');
          }
        }
      }
      
      // Get excerpt (first paragraph after frontmatter)
      const bodyContent = content.replace(/^---[\s\S]*?---\n?/, '');
      const excerpt = bodyContent
        .split('\n\n')[0]
        ?.replace(/^#+\s*/, '')
        .slice(0, 150) || '';
      
      posts.push({
        slug: file.replace('.md', ''),
        title: frontmatter.title || file,
        date: frontmatter.date || '',
        mood: frontmatter.mood,
        excerpt: excerpt + (excerpt.length >= 150 ? '...' : ''),
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
              <Link
                key={post.slug}
                href={`/lumi/blog/${post.slug}`}
                className="block bg-white/5 border border-white/10 rounded-lg p-6 hover:border-neon/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  {post.mood && <span className="text-sm">{post.mood}</span>}
                  <span className="text-gray-500 text-xs font-mono">
                    {post.date && new Date(post.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-2 text-white group-hover:text-neon">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm">{post.excerpt}</p>
              </Link>
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
