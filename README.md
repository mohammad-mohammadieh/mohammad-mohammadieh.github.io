# Portfolio website: Mohammad Mohammadieh

The source of my portfolio site, published with GitHub Pages at
<https://mohammadmohammadieh.com>.

It is a static site built with [Astro](https://astro.build) and hand-written CSS. The browser receives plain HTML and CSS. The only JavaScript is about 1 KB, on project pages, for the full-size image view.

## What is shown, and what is not

The projects were built for my employer or its clients. Client names and real data are confidential, so every screen and video on the site comes from a demo copy with synthetic data: invented organizations, invented people, generated numbers. Each project page says so once, near the top.

## Run it

Needs Node 22.12 or newer (`.nvmrc` pins 24).

```
npm install        once, to fetch Astro
npm run dev        live preview while editing, at http://127.0.0.1:4321
npm run build      checks the content, builds into dist/, checks the result
npm run preview    serves the built dist/ folder at http://127.0.0.1:4321
```

`npm run check` is the same as `npm run build`. Use `npm run preview -- --port 5000` to pick another port.

Other commands:

```
npm run scan       checks every file a push would publish, without building
npm run images     regenerates the favicon PNGs and the link preview images
npm run media      makes web copies of a project's screenshots and videos
```

## Publishing

`.github/workflows/deploy.yml` builds the site and deploys it to GitHub Pages on every push to `main`. The build is `npm run build`, so a failed check stops the deployment.

The repository must be named `mohammad-mohammadieh.github.io`, with Pages set to deploy from GitHub Actions (Settings, Pages, Source).

`site.config.mjs` holds the three settings that are not content: the GitHub username, the site address and the base path. Change the address there if the site moves to its own domain.

## Add a project

1. Copy `src/content/projects/_template/` to a new folder. The folder name is the page address, for example `my-new-project` becomes `/projects/my-new-project/`.
2. Fill in the front matter and write the four sections: The problem, What I built, How it works, What it shows. Set `draft: false` when it is ready.
3. Add the media when it exists (see below).
4. Run `npm run build`. The home page card, the numbering (2.1, 2.2), the project page, the previous and next links and the sitemap are all generated.

No other file changes. Run `npm run images` as well to give the project its own link preview image.

## Add screenshots and videos

Until a project has media, its page shows a "Media coming soon" area with empty frames.

```
npm run media -- my-new-project --images path/to/screenshots \
    --video highlight=path/to/highlight.mp4@4 \
    --video walkthrough=path/to/walkthrough.mp4@1
```

This reads the source files and never changes them. It writes:

- one full-size WebP per screenshot into the project folder (the build makes the smaller sizes),
- a web copy of each video into `public/media/<project>/`. A file of 10 MB or less is copied as it is. A larger one is re-encoded at the same resolution and a lower bitrate that keeps on-screen text sharp,
- one poster frame per video, taken at the second given after `@`.

Then, in the project's `index.md`:

1. Add `cover` (the hero image, also the picture on the home page card), `gallery` and `videos`. The template shows the fields. Every image needs `alt` text that says what the screen shows.
2. Put the short highlight video first and the full walkthrough second.
3. The fixed note already says the media is synthetic, so do not repeat it. Use `mediaNote` only for something a viewer needs to know about the recording, and `roleDetail` to say which parts were yours.
4. Change `status` from `writeup` to `media`, then run `npm run build`.

| `status` | Label on the site | Needs |
|---|---|---|
| `writeup` | Media coming soon | `planned` |
| `media` | (no label) | `cover` and at least two `gallery` images |
| `live` | Live demo | the same, plus `demo` |

`demo`, `downloads` and `repoUrl` are optional. While they are empty nothing is shown for them.

Videos live in the repository, so keep them small. If the repository grows past what is comfortable, host the long walkthroughs on a video site and use `provider: "youtube"` with the video id. That player loads only after a click.

## What the build checks

`npm run build` stops with a message naming the file when:

- a project file breaks the schema or the status rules above, or is missing one of the four written headings,
- an image has no alt text, or a video lacks controls, a poster or `preload="none"`,
- the employer is named anywhere except the Work section of the home page,
- a term from the private list appears anywhere (see below),
- a file to be published contains a local file path, a cloud tenant address, an identifier shaped like a GUID, an internal network address, a phone number, or an email address other than the site's own,
- the built site contains an em dash or en dash, a broken internal link or an empty link,
- the fixed confidentiality note is missing from a project page,
- a file is over 25 MB,
- text colors fall under 4.5:1 contrast.

Messages give the file, the line and the kind of problem. They never repeat the value that was found.

### The private term list

Client names and similar words are searched for by name only when a private list exists. Keep one term per line in a file outside this repository and point the `CONFIDENTIAL_TERMS_FILE` environment variable at it, or keep it here as `.confidential-terms.txt`, which git ignores. Without a list the build passes with a warning.

The checks read text. They cannot read what is inside an image or a video, so look at every screenshot and watch every video before adding it.

## Rules for content

- Never name a client. The employer is named in the home page work history only.
- Every project page shows the fixed note once, above the highlight video: the work was built for the employer or its clients, and everything shown is synthetic. Do not repeat it in body text or captions. `noteExtra` adds to it when accuracy needs it. It cannot replace it.
- Keep text short: one sentence over a paragraph, and nothing said twice. Long definitions go inside a closed `<details class="more">` block.
- Only screenshots and video made with synthetic data. No real data, no real logos.
- For team work, say so, and name only the parts that were mine.
- First person, plain words, American spelling, no em dashes or en dashes.
- If a fact is not in the resume, leave it out.

## Where things are

```
site.config.mjs                 GitHub username, site address, base path
src/data/site.ts                name, links, work, skills, education, intro, fixed note
public/Mohammad-Mohammadieh-Resume.pdf   the file behind "Download resume"; replace it to update
src/content/projects/<name>/    one folder per project: index.md, screenshots, video posters
src/content.config.ts           the fields a project may have, and the status rules
public/media/<name>/            the videos
src/pages/                      home page, project page template, 404, robots.txt
src/components/                 page parts (section, figures, media area, pager ...)
src/styles/                     tokens.css (colors, spacing), base.css, components.css
scripts/                        checks, image and media helpers
.github/workflows/deploy.yml    build and deploy to GitHub Pages
```

## Credits

IBM Plex Sans and IBM Plex Mono, SIL Open Font License 1.1 (`public/fonts/LICENSE.txt`). Icons from Phosphor Icons, MIT license.
