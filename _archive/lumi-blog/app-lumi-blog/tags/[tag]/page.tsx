import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

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

async function getAllTags(): Promise<string[]> {
  const posts = await getBlogPosts();
  const tagSet = new Set<string>();

  for (const post of posts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }

  return Array.from(tagSet);
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = await getBlogPosts();

  const taggedPosts = posts.filter((post) => post.tags.includes(tag));

  if (taggedPosts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-16 pb-20">
      <div className="container px-4 mx-auto max-w-2xl">
        <div className="py-16 border-b border-nd-border">
          <Link
            href="/lumi/blog/tags"
            className="font-mono text-[11px] tracking-[0.06em] uppercase text-nd-interactive nd-transition mb-6 inline-block"
          >
            ← All tags
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-nd-text-display tracking-[-0.02em] mb-3">
            #{tag}
          </h1>
          <p className="text-nd-text-secondary text-base font-body">
            {taggedPosts.length} post
            {taggedPosts.length !== 1 ? "s" : ""} tagged with #{tag}
          </p>
        </div>

        <div className="border-t border-nd-border">
          {taggedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/lumi/blog/${post.slug}`}
              className="block p-4 md:p-6 border-b border-nd-border nd-transition hover:bg-nd-surface"
            >
              <div className="flex items-center gap-2 mb-2">
                {post.mood && <span className="text-sm">{post.mood}</span>}
                <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-nd-text-disabled">
                  {post.date &&
                    new Date(post.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                </span>
              </div>
              <h2 className="font-body text-lg font-bold text-nd-text-display">
                {post.title}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
