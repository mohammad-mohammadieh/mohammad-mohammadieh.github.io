---
# Copy this folder, rename it to the page address you want (lowercase, hyphens),
# then fill in the fields. Folders starting with "_" are never built.
title: "Project title"
order: 6                      # position on the home page; drives the number (2.6)
draft: true                   # set to false when the page is ready to be seen
status: "writeup"             # writeup | media | live
summary: "One sentence, 160 characters or fewer."
stack: ["Tool one", "Tool two"]
role: "built"                 # built | contributed
figures:                      # optional, up to four are shown
  - { value: "0", label: "what the number counts" }
  # scope "shown" marks a fact about the demo copy, not the real project:
  # - { value: "0", label: "what the number counts", scope: "shown" }
planned: "screenshots and a short video"   # needed while status is "writeup"
updated: 2026-01-01

# Add these when the media exists, then change status to "media".
# "npm run media" writes the web copies into this folder and into public/media/.
# Every image needs alt text that says what it shows.
#
# noteExtra: "What the screens really show: demo copy, synthetic data, invented names."
# mediaNote: "One or two sentences above the videos and screenshots."
# cover:
#   src: "./01-name.webp"
#   title: "Short title"
#   caption: "One sentence under the hero image."
#   alt: "What the screen shows."
# gallery:                    # at least two, besides the cover
#   - src: "./02-name.webp"
#     title: "Short title"
#     caption: "One sentence."
#     alt: "What the screen shows."
#     kind: "screen"          # screen (default) | detail (half width) | diagram
# videos:                     # highlight first, full walkthrough second
#   - src: "/media/project-folder-name/highlight.mp4"
#     label: "Highlight"
#     title: "Project name, highlight"
#     duration: "40 s"
#     poster: "./poster-highlight.webp"
#     description: "One line saying what the video shows."

# Optional links. Each one stays hidden until it is filled in.
# demo: { kind: "web", url: "https://...", label: "Open the demo" }   # needed for status "live"
# repoUrl: "https://github.com/..."
# downloads:
#   - { label: "Power BI file (.pbix)", url: "https://...", size: "12 MB" }
# seo: { title: "60 characters or fewer", description: "155 characters or fewer" }
---

## The problem

Who needed what, in generic terms. 40 to 90 words. No client names or client detail.

## What I built

What exists and at what scale. 60 to 140 words, first person. Use "What I worked on" as the heading when role is "contributed". Say plainly what the screens and video show if it is a demo copy.

## How it works

- **Tool or part.** What it does here.

## What it shows

- **Page or screen.** The question it answers, or what the user does there.
