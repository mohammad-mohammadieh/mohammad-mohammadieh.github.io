import { getCollection, type CollectionEntry } from "astro:content";

export type Project = CollectionEntry<"projects">;

export const STATUS_LABEL = {
  writeup: "Media coming soon",
  media: "Screens and video",
  live: "Live demo",
} as const;

export const ROLE_LABEL = {
  built: "Built by me",
  contributed: "Contributed as part of a team",
} as const;

/** Published projects in home page order. Drafts never reach the build. */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection("projects", ({ data }) => !data.draft);
  return all.sort(
    (a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id),
  );
}

/** Projects are section 2 of the home page, so they are numbered 2.1, 2.2 and so on. */
export const projectNumber = (index: number) => `2.${index + 1}`;

export const projectHref = (project: Project) => `/projects/${project.id}/`;

export interface BodySection {
  id: string;
  title: string;
  html: string;
}

const stripTags = (html: string) => html.replace(/<[^>]+>/g, "").trim();

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Splits the rendered Markdown body at its "##" headings, so each written
 * section can sit in the same numbered layout as the generated ones.
 * Notes left in the Markdown as HTML comments are dropped.
 */
export function splitBody(html: string): BodySection[] {
  const clean = html.replace(/<!--[\s\S]*?-->/g, "");
  const heading = /<h2[^>]*>([\s\S]*?)<\/h2>/g;
  const found: { title: string; start: number; end: number }[] = [];
  let match: RegExpExecArray | null;
  while ((match = heading.exec(clean))) {
    found.push({
      title: stripTags(match[1]),
      start: match.index,
      end: heading.lastIndex,
    });
  }
  return found.map((item, i) => ({
    id: slugify(item.title),
    title: item.title,
    html: clean.slice(item.end, found[i + 1]?.start ?? clean.length).trim(),
  }));
}

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
