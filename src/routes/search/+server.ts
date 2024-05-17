import { json } from "@sveltejs/kit";
import { compile } from "mdsvex";
import matter from "gray-matter";

const patterns: Record<string, RegExp> = {
  frontmatter: /---.*?---/gs,
  code: /```.*?\n|```/gs,
  inline: /`([^`]*)`/g,
  heading: /^#{1,6}\s.*$/gm,
  link: /\[([^\]]+)\]\(([^)]+)\)/g,
  image: /\!\[.*?\]\(.*?\)/g,
  blockquote: /> /gm,
  bold: /\*\*/g,
  italic: /\b_([^_]+)_(?!\w)/g,
  special: /{%.*?%}/g,
  tags: /[<>]/g,
  script: /<script>\s*<\/script>/g, // new pattern for <script> with whitespace
};

const htmlEntities: Record<string, string> = {
  "<": "&lt;",
  ">": "&gt;",
};

function stripMarkdown(markdown: string) {
  for (const pattern in patterns) {
    switch (pattern) {
      case "inline":
        markdown = markdown.replace(patterns[pattern], "$1");
        break;
      case "tags":
        markdown = markdown.replace(
          patterns[pattern],
          (match) => htmlEntities[match]
        );
        break;
      case "link":
        markdown = markdown.replace(patterns[pattern], "$2");
        break;
      case "italic":
        markdown = markdown.replace(patterns[pattern], "$1");
        break;
      default:
        markdown = markdown.replace(patterns[pattern], "");
    }
  }

  return markdown;
}

export async function GET() {
  const paths = import.meta.glob("../components/**/*.svx", {
    query: "?raw",
    import: "default",
    eager: true,
  });

  const posts = await Promise.all(
    Object.entries(paths).map(async ([path, content]) => {
      try {
        // Process the .svx content
        const {
          data,
          content: extractedContent,
          title,
        } = await processSvx(content as string);

        if (data.draft) {
          return null;
        }

        return {
          title: title,
          slug: data.slug,
          content: stripMarkdown(extractedContent),
        };
      } catch (error) {
        console.error(`Error processing file ${path}:`, error);
        return null;
      }
    })
  );

  const filteredPosts = posts.filter(Boolean);
  return json(filteredPosts);
}

async function processSvx(svxContent: string) {
  try {
    const { data, content: rawContent } = matter(svxContent);

    const result: any = await compile(rawContent, {
      filename: "post.svx",
    });

    const h3Match = result.code.match(/<h3[^>]*>(.*?)<\/h3>/);
    const title = h3Match ? h3Match[1] : "";

    return { data, content: result.code, title };
  } catch (error) {
    console.error("Error compiling SVX content:", error);
    throw error;
  }
}
