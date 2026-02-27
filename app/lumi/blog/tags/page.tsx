import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  mood?: string;
  tags: string[];
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
      
      const tags = frontmatter.tags;
      posts.push({
        slug: file.replace('.md', ''),
        title: typeof frontmatter.title === 'string' ? frontmatter.title : file,
        date: typeof frontmatter.date === 'string' ? frontmatter.date : '',
        mood: typeof frontmatter.mood === 'string' ? frontmatter.mood : undefined,
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

export default async function TagsPage() {
  const posts = await getBlogPosts();
  
  // Build tag map
  const tagMap = new Map<string, BlogPost[]>();
  for (const post of posts) {
    for (const tag of post.tags) {
      const existing = tagMap.get(tag) || [];
      existing.push(post);
      tagMap.set(tag, existing);
    }
  }
  
  // Sort tags by count
  const sortedTags = Array.from(tagMap.entries()).sort((a, b) => b[1].length - a[1].length);
  
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container px-4 mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-12">
          <Link href="/lumi/blog" className="text-neon text-sm hover:underline mb-4 inline-block">
            ← Back to blog
          </Link>
          <h1 className="text-4xl font-bold mb-2">🏷️ Tags</h1>
          <p className="text-gray-400">
            Browse posts by topic
          </p>
        </div>
        
        {/* Tags */}
        {sortedTags.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
            <p className="text-gray-400">No tags yet!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedTags.map(([tag, tagPosts]) => (
              <div key={tag} className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Link href={`/lumi/blog/tags/${encodeURIComponent(tag)}`} className="text-lg font-bold text-neon hover:underline">
                    #{tag}
                  </Link>
                  <span className="text-gray-500 text-sm">({tagPosts.length} post{tagPosts.length !== 1 ? 's' : ''})</span>
                </div>
                <div className="space-y-2">
                  {tagPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/lumi/blog/${post.slug}`}
                      className="flex items-center gap-2 text-gray-300 hover:text-neon transition-colors text-sm"
                    >
                      {post.mood && <span>{post.mood}</span>}
                      <span>{post.title}</span>
                      <span className="text-gray-600 text-xs">
                        {post.date && new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
