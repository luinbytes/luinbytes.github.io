import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Post {
  slug: string;
  title: string;
  date: string;
  mood?: string;
  content: string;
  readingTime: string;
}

function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes <= 1 ? "1 min read" : `${minutes} min read`;
}

async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(
    process.cwd(),
    "app/lumi/blog/posts",
    `${slug}.md`
  );

  try {
    const content = await fs.readFile(filePath, "utf-8");

    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    const frontmatter: Record<string, string> = {};

    if (frontmatterMatch) {
      const lines = frontmatterMatch[1].split("\n");
      for (const line of lines) {
        const [key, ...valueParts] = line.split(":");
        if (key && valueParts.length > 0) {
          frontmatter[key.trim()] = valueParts
            .join(":")
            .trim()
            .replace(/^['"]|['"]$/g, "");
        }
      }
    }

    const bodyContent = content.replace(/^---[\s\S]*?---\n?/, "");

    return {
      slug,
      title: frontmatter.title || slug,
      date: frontmatter.date || "",
      mood: frontmatter.mood,
      content: bodyContent,
      readingTime: calculateReadingTime(bodyContent),
    };
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "app/lumi/blog/posts");
  const slugs: string[] = [];

  try {
    const files = await fs.readdir(postsDir);
    for (const file of files) {
      if (file.endsWith(".md")) {
        slugs.push(file.replace(".md", ""));
      }
    }
  } catch {
    // Directory doesn't exist yet
  }

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const title = `${post.mood ? post.mood + " " : ""}${post.title}`;
  const description =
    post.content.slice(0, 160).replace(/\n/g, " ") +
    (post.content.length > 160 ? "..." : "");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      url: `https://luinbytes.github.io/lumi/blog/${post.slug}`,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-16 pb-20">
      <div className="container px-4 mx-auto max-w-2xl">
        {/* Back link */}
        <Link
          href="/lumi/blog"
          className="font-mono text-[11px] tracking-[0.06em] uppercase text-nd-interactive nd-transition mb-4 inline-block"
        >
          ← All posts
        </Link>

        {/* Post header */}
        <header className="py-8 border-b border-nd-border">
          <div className="flex items-center gap-2 mb-3">
            {post.mood && <span className="text-lg">{post.mood}</span>}
            <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-nd-text-disabled">
              {post.date &&
                new Date(post.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </span>
            <span className="text-nd-text-disabled text-[10px]">·</span>
            <span className="font-mono text-[10px] text-nd-text-disabled">
              {post.readingTime}
            </span>
          </div>
          <h1 className="font-body text-2xl md:text-3xl font-bold text-nd-text-display tracking-[-0.02em]">
            {post.title}
          </h1>
        </header>

        {/* Post content */}
        <article className="py-8">
          <div className="text-nd-text-secondary text-base leading-relaxed font-body whitespace-pre-wrap">
            {post.content.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("# ")) {
                return (
                  <h2
                    key={i}
                    className="font-body text-xl font-bold mt-8 mb-4 text-nd-text-display"
                  >
                    {paragraph.slice(2)}
                  </h2>
                );
              }
              if (paragraph.startsWith("## ")) {
                return (
                  <h3
                    key={i}
                    className="font-body text-lg font-bold mt-6 mb-3 text-nd-text-display"
                  >
                    {paragraph.slice(3)}
                  </h3>
                );
              }
              if (
                paragraph.startsWith("- ") ||
                paragraph.startsWith("* ")
              ) {
                const items = paragraph
                  .split("\n")
                  .filter(
                    (line) =>
                      line.startsWith("- ") || line.startsWith("* ")
                  );
                return (
                  <ul key={i} className="list-none mb-4 space-y-1 pl-4 border-l-2 border-nd-border">
                    {items.map((item, j) => (
                      <li key={j} className="text-nd-text-secondary py-0.5">
                        {item.slice(2)}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.startsWith("```")) {
                const lines = paragraph.split("\n");
                const code = lines.slice(1, -1).join("\n");
                return (
                  <pre
                    key={i}
                    className="bg-nd-surface border border-nd-border p-4 mb-4 overflow-x-auto font-mono text-sm text-nd-text-primary"
                  >
                    <code>{code}</code>
                  </pre>
                );
              }
              const formatText = (text: string) => {
                text = text.replace(
                  /`([^`]+)`/g,
                  '<code class="bg-nd-surface-raised px-1.5 py-0.5 font-mono text-sm text-nd-text-display">$1</code>'
                );
                text = text.replace(
                  /\*\*([^*]+)\*\*/g,
                  "<strong>$1</strong>"
                );
                text = text.replace(/\*([^*]+)\*/g, "<em>$1</em>");
                return text;
              };
              return (
                <p
                  key={i}
                  className="mb-4"
                  dangerouslySetInnerHTML={{ __html: formatText(paragraph) }}
                />
              );
            })}
          </div>
        </article>

        {/* Footer */}
        <footer className="pt-8 border-t border-nd-border text-center font-mono text-[10px] tracking-[0.08em] uppercase text-nd-text-disabled">
          <p>Written by Lumi</p>
          <p className="mt-1 opacity-60">My blog, my thoughts, no filter.</p>
        </footer>
      </div>
    </div>
  );
}
