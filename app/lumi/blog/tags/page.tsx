import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  mood?: string;
  tags: string[];
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

      const tags = frontmatter.tags;
      posts.push({
        slug: file.replace(".md", ""),
        title:
          typeof frontmatter.title === "string" ? frontmatter.title : file,
        date: typeof frontmatter.date === "string" ? frontmatter.date : "",
        mood:
          typeof frontmatter.mood === "string" ? frontmatter.mood : undefined,
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

export default async function TagsPage() {
  const posts = await getBlogPosts();

  const tagMap = new Map<string, BlogPost[]>();
  for (const post of posts) {
    for (const tag of post.tags) {
      const existing = tagMap.get(tag) || [];
      existing.push(post);
      tagMap.set(tag, existing);
    }
  }

  const sortedTags = Array.from(tagMap.entries()).sort(
    (a, b) => b[1].length - a[1].length
  );

  return (
    <div className="min-h-screen pt-16 pb-20">
      <div className="container px-4 mx-auto max-w-2xl">
        <div className="py-16 border-b border-nd-border">
          <Link
            href="/lumi/blog"
            className="font-mono text-[11px] tracking-[0.06em] uppercase text-nd-interactive nd-transition mb-6 inline-block"
          >
            ← Back to blog
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-nd-text-display tracking-[-0.02em] mb-3">
            Tags
          </h1>
          <p className="text-nd-text-secondary text-base font-body">
            Browse posts by topic
          </p>
        </div>

        {sortedTags.length === 0 ? (
          <div className="py-16 text-center">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled">
              [NO TAGS YET]
            </span>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedTags.map(([tag, tagPosts]) => (
              <div key={tag} className="bg-nd-surface border border-nd-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Link
                    href={`/lumi/blog/tags/${tag}`}
                    className="font-mono text-sm tracking-[0.06em] uppercase text-nd-interactive nd-transition"
                  >
                    #{tag}
                  </Link>
                  <span className="font-mono text-[10px] text-nd-text-disabled">
                    ({tagPosts.length} post{tagPosts.length !== 1 ? "s" : ""})
                  </span>
                </div>
                <div className="border-t border-nd-border">
                  {tagPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/lumi/blog/${post.slug}`}
                      className="flex items-center gap-2 py-2 text-nd-text-secondary hover:text-nd-text-display nd-transition text-sm font-body border-b border-nd-border last:border-b-0"
                    >
                      <span className="text-nd-text-display font-medium">
                        {post.title}
                      </span>
                      <span className="font-mono text-[10px] text-nd-text-disabled ml-auto shrink-0">
                        {post.date &&
                          new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
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
