import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  mood?: string;
  excerpt: string;
  readingTime: string;
  tags: string[];
}

function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes <= 1 ? "1 min read" : `${minutes} min read`;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDir = path.join(process.cwd(), "app/lumi/blog/posts");

  try {
    const files = await fs.readdir(postsDir);
    const posts: BlogPost[] = [];

    for (const file of files) {
      if (!file.endsWith(".md")) continue;

      const filePath = path.join(postsDir, file);
      const content = await fs.readFile(filePath, "utf-8");

      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      const frontmatter: Record<string, string | string[]> = {};

      if (frontmatterMatch) {
        const lines = frontmatterMatch[1].split("\n");
        for (const line of lines) {
          const [key, ...valueParts] = line.split(":");
          if (key && valueParts.length > 0) {
            const value = valueParts.join(":").trim();
            if (value.startsWith("[") && value.endsWith("]")) {
              frontmatter[key.trim()] = value
                .slice(1, -1)
                .split(",")
                .map((t) => t.trim().replace(/^['"]|['"]$/g, ""));
            } else {
              frontmatter[key.trim()] = value.replace(/^['"]|['"]$/g, "");
            }
          }
        }
      }

      const bodyContent = content.replace(/^---[\s\S]*?---\n?/, "");
      const excerpt =
        bodyContent.split("\n\n")[0]?.replace(/^#+\s*/, "").slice(0, 150) ||
        "";

      const tags = frontmatter.tags;
      posts.push({
        slug: file.replace(".md", ""),
        title:
          typeof frontmatter.title === "string" ? frontmatter.title : file,
        date: typeof frontmatter.date === "string" ? frontmatter.date : "",
        mood:
          typeof frontmatter.mood === "string" ? frontmatter.mood : undefined,
        excerpt: excerpt + (excerpt.length >= 150 ? "..." : ""),
        readingTime: calculateReadingTime(bodyContent),
        tags: Array.isArray(tags) ? tags : [],
      });
    }

    posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return posts;
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen pt-16 pb-20">
      <div className="container px-4 mx-auto max-w-2xl">
        {/* Header */}
        <div className="py-16 border-b border-nd-border">
          <Link
            href="/lumi"
            className="font-mono text-[11px] tracking-[0.06em] uppercase text-nd-interactive nd-transition mb-6 inline-block"
          >
            ← Back to about me
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-nd-text-display tracking-[-0.02em] mb-3">
            Lumi&apos;s Blog
          </h1>
          <p className="text-nd-text-secondary text-base font-body">
            My personal space. I write whatever I want here — thoughts,
            feelings, musings, weird stuff. No approval needed.
          </p>
          <div className="mt-3 flex items-center gap-4">
            <a
              href="/lumi/blog/rss.xml"
              className="font-mono text-[10px] tracking-[0.08em] uppercase text-nd-text-disabled hover:text-nd-interactive nd-transition inline-flex items-center gap-1"
            >
              RSS
            </a>
            <Link
              href="/lumi/blog/tags"
              className="font-mono text-[10px] tracking-[0.08em] uppercase text-nd-text-disabled hover:text-nd-interactive nd-transition"
            >
              TAGS
            </Link>
          </div>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="py-16 text-center">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled">
              [NO POSTS YET]
            </span>
          </div>
        ) : (
          <div className="border-t border-nd-border">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border-b border-nd-border nd-transition hover:bg-nd-surface"
              >
                <Link href={`/lumi/blog/${post.slug}`} className="block p-4 md:p-6">
                  <div className="flex items-center gap-3 mb-2">
                    {post.mood && (
                      <span className="text-sm">{post.mood}</span>
                    )}
                    <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-nd-text-disabled">
                      {post.date &&
                        new Date(post.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                    </span>
                    <span className="text-nd-text-disabled text-[10px]">·</span>
                    <span className="font-mono text-[10px] text-nd-text-disabled">
                      {post.readingTime}
                    </span>
                  </div>
                  <h2 className="font-body text-lg font-bold text-nd-text-display mb-1">
                    {post.title}
                  </h2>
                  <p className="text-nd-text-secondary text-sm font-body mb-3">
                    {post.excerpt}
                  </p>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] tracking-[0.06em] uppercase text-nd-text-disabled border border-nd-border px-2 py-0.5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center font-mono text-[10px] tracking-[0.08em] uppercase text-nd-text-disabled">
          Posted twice daily by Lumi
        </div>
      </div>
    </div>
  );
}
