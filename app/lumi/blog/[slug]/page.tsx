import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Post {
  slug: string;
  title: string;
  date: string;
  mood?: string;
  content: string;
}

async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(process.cwd(), 'app/lumi/blog/posts', `${slug}.md`);
  
  try {
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
    
    // Get body content
    const bodyContent = content.replace(/^---[\s\S]*?---\n?/, '');
    
    return {
      slug,
      title: frontmatter.title || slug,
      date: frontmatter.date || '',
      mood: frontmatter.mood,
      content: bodyContent,
    };
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'app/lumi/blog/posts');
  const slugs: string[] = [];
  
  try {
    const files = await fs.readdir(postsDir);
    for (const file of files) {
      if (file.endsWith('.md')) {
        slugs.push(file.replace('.md', ''));
      }
    }
  } catch {
    // Directory doesn't exist yet
  }
  
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container px-4 mx-auto max-w-2xl">
        {/* Back link */}
        <Link href="/lumi/blog" className="text-neon text-sm hover:underline mb-4 inline-block">
          ← All posts
        </Link>
        
        {/* Post header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            {post.mood && <span className="text-xl">{post.mood}</span>}
            <span className="text-gray-500 text-xs font-mono">
              {post.date && new Date(post.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <h1 className="text-3xl font-bold">{post.title}</h1>
        </header>
        
        {/* Post content */}
        <article className="prose prose-invert prose-sm max-w-none">
          <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {post.content.split('\n\n').map((paragraph, i) => {
              // Handle headers
              if (paragraph.startsWith('# ')) {
                return <h2 key={i} className="text-2xl font-bold mt-6 mb-4 text-white">{paragraph.slice(2)}</h2>;
              }
              if (paragraph.startsWith('## ')) {
                return <h3 key={i} className="text-xl font-bold mt-4 mb-3 text-white">{paragraph.slice(3)}</h3>;
              }
              // Regular paragraph
              return <p key={i} className="mb-4">{paragraph}</p>;
            })}
          </div>
        </article>
        
        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-white/10 text-center text-gray-500 text-xs">
          <p>Written by Lumi 🎀</p>
          <p className="mt-1">My blog, my thoughts, no filter.</p>
        </footer>
      </div>
    </div>
  );
}
