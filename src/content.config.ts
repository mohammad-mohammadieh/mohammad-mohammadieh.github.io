import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// One folder per project: src/content/projects/<slug>/index.md
// The folder name is the page address. Folders starting with "_" are ignored.
const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: ["*/index.md", "!_*/**"],
  }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        // Position on the home page. Drives the numbering (2.1, 2.2) and the pager.
        order: z.number().int().positive(),
        // true keeps the project out of the build entirely.
        draft: z.boolean().default(false),
        // writeup: text only, media still to come.
        // media:   hero image, screenshots and (optionally) videos are in place.
        // live:    media plus a public demo link.
        status: z.enum(["writeup", "media", "live"]),
        summary: z.string().min(1).max(160),
        stack: z.array(z.string().min(1)).min(1),
        role: z.enum(["built", "contributed"]),
        figures: z
          .array(
            z.object({
              value: z.string().min(1),
              label: z.string().min(1),
              // original: a fact about the real project, from the resume.
              // shown:    a fact about the demo copy in the screens and video.
              scope: z.enum(["original", "shown"]).default("original"),
            }),
          )
          .default([]),
        // Completes "Planned for this page: ..." while there is no media.
        planned: z.string().min(1).optional(),
        // Optional sentences after the fixed confidentiality note: what the screens really show.
        noteExtra: z.string().min(1).optional(),
        // Optional line above the videos and screenshots. Replaces the default one.
        mediaNote: z.string().min(1).optional(),
        // The hero image. Also the picture on the home page card.
        cover: z
          .object({
            src: image(),
            alt: z.string().min(1),
            title: z.string().min(1).optional(),
            caption: z.string().min(1).optional(),
          })
          .optional(),
        gallery: z
          .array(
            z.object({
              src: image(),
              alt: z.string().min(1),
              title: z.string().min(1).optional(),
              caption: z.string().min(1),
              kind: z.enum(["screen", "detail", "diagram"]).default("screen"),
            }),
          )
          .default([]),
        // Shown in this order: put the short highlight first, the full walkthrough second.
        videos: z
          .array(
            z.object({
              provider: z.enum(["file", "youtube"]).default("file"),
              // file: a path under public/, for example /media/my-project/highlight.mp4
              src: z.string().min(1).optional(),
              // youtube: the video id.
              id: z.string().min(1).optional(),
              label: z.string().min(1).optional(),
              title: z.string().min(1),
              // One line saying what the video shows.
              description: z.string().min(1),
              duration: z.string().min(1).optional(),
              poster: image(),
              // file: optional WebVTT captions under public/, for a video with speech.
              captions: z.string().min(1).optional(),
            }),
          )
          .default([]),
        // Optional links. Each stays hidden on the page until it is filled in.
        demo: z
          .object({
            kind: z.enum(["web", "powerbi"]),
            url: z.url(),
            label: z.string().min(1).default("Open the demo"),
            note: z.string().min(1).optional(),
          })
          .optional(),
        repoUrl: z.url().optional(),
        downloads: z
          .array(
            z.object({
              label: z.string().min(1),
              url: z.url(),
              size: z.string().min(1).optional(),
              note: z.string().min(1).optional(),
            }),
          )
          .default([]),
        seo: z
          .object({
            title: z.string().min(1).max(60).optional(),
            description: z.string().min(1).max(155).optional(),
          })
          .optional(),
        updated: z.coerce.date(),
      })
      .superRefine((data, ctx) => {
        const fail = (path: (string | number)[], message: string) =>
          ctx.addIssue({ code: "custom", path, message });

        if (data.status === "writeup" && !data.planned) {
          fail(["planned"], 'status "writeup" needs a "planned" line.');
        }
        if (data.status !== "writeup") {
          if (!data.cover) {
            fail(["cover"], `status "${data.status}" needs a cover image.`);
          }
          if (data.gallery.length < 2) {
            fail(
              ["gallery"],
              `status "${data.status}" needs at least two gallery images besides the cover.`,
            );
          }
        }
        if (data.status === "live" && !data.demo) {
          fail(["demo"], 'status "live" needs a demo link.');
        }
        data.videos.forEach((video, i) => {
          if (video.provider === "youtube" && !video.id) {
            fail(["videos", i, "id"], "A YouTube video needs its id.");
          }
          if (video.provider === "file" && !video.src?.startsWith("/")) {
            fail(["videos", i, "src"], 'A video file needs a "src" path that starts with "/".');
          }
        });
        data.gallery.forEach((item, i) => {
          if (item.alt.trim() === item.caption.trim()) {
            fail(
              ["gallery", i, "alt"],
              "Alt text must describe the image. It cannot repeat the caption.",
            );
          }
        });
      }),
});

export const collections = { projects };
