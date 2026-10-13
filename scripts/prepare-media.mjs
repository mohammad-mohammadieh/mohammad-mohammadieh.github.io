// Makes web copies of a project's screenshots and videos.
//
//   node scripts/prepare-media.mjs <project> --images <folder> \
//        --video highlight=<file>@<poster second> --video walkthrough=<file>@<poster second>
//
// <project> is the folder name under src/content/projects/.
//
// What it writes (the source files are only read, never changed):
//   src/content/projects/<project>/<name>.webp         one per screenshot, full size
//   src/content/projects/<project>/poster-<video>.webp  one frame of each video
//   public/media/<project>/<video>.mp4                  the web copy of each video
//
// Screenshots: WebP, lossless when that is the smaller file, otherwise high
// quality lossy. Any metadata in the source file is left behind. The site
// build then makes the smaller sizes each screen width needs.
//
// Videos: a file of 10 MB or less is copied as it is (only repacked so it can
// start playing before it has fully downloaded, with its metadata removed).
// A larger file is re-encoded at its own resolution (1080p at most), H.264,
// at a lower bitrate that keeps on-screen text sharp.
//
// Needs ffmpeg on the PATH for the video part.

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [project, ...rest] = process.argv.slice(2);
const mb = (bytes) => `${(bytes / 1048576).toFixed(1)} MB`;
const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

function fail(message) {
  console.error(message);
  process.exit(1);
}

if (!project || project.startsWith("-")) {
  fail("Usage: node scripts/prepare-media.mjs <project> --images <folder> --video name=<file>@<second>");
}
const contentDir = join(root, "src", "content", "projects", project);
if (!existsSync(contentDir)) fail(`No project folder: src/content/projects/${project}`);

let imagesDir = null;
const videos = [];
for (let i = 0; i < rest.length; i += 2) {
  const value = rest[i + 1];
  if (rest[i] === "--images") imagesDir = resolve(value);
  else if (rest[i] === "--video") {
    const [name, spec] = value.split("=");
    const at = spec.lastIndexOf("@");
    videos.push({
      name,
      file: resolve(at === -1 ? spec : spec.slice(0, at)),
      posterAt: at === -1 ? 3 : Number(spec.slice(at + 1)),
    });
  } else fail(`Unknown option: ${rest[i]}`);
}

// ---------------------------------------------------------------- images

if (imagesDir) {
  const sources = readdirSync(imagesDir)
    .filter((name) => /\.(png|jpe?g|webp)$/i.test(name))
    .sort();
  let total = 0;
  for (const name of sources) {
    const source = join(imagesDir, name);
    const lossless = await sharp(source).webp({ lossless: true, effort: 6 }).toBuffer();
    const lossy = await sharp(source)
      .webp({ quality: 90, effort: 6, smartSubsample: true })
      .toBuffer();
    // Flat user-interface screens are smaller (and exact) as lossless WebP.
    const useLossless = lossless.length <= lossy.length * 1.25;
    const data = useLossless ? lossless : lossy;
    const outName = `${basename(name, extname(name)).toLowerCase()}.webp`;
    writeFileSync(join(contentDir, outName), data);
    total += data.length;
    console.log(
      `  ${outName}  ${kb(statSync(source).size)} -> ${kb(data.length)} (${useLossless ? "lossless" : "quality 90"})`,
    );
  }
  console.log(`Images: ${sources.length} files, ${mb(total)} in src/content/projects/${project}/`);
}

// ---------------------------------------------------------------- videos

function ffmpeg(args, options = {}) {
  const result = spawnSync("ffmpeg", ["-v", "error", "-y", ...args], {
    maxBuffer: 256 * 1024 * 1024,
    ...options,
  });
  if (result.error) fail("ffmpeg was not found. Install it, or leave out the --video options.");
  if (result.status !== 0) fail(`ffmpeg failed: ${result.stderr?.toString() ?? ""}`);
  return result;
}

if (videos.length > 0) {
  const mediaDir = join(root, "public", "media", project);
  mkdirSync(mediaDir, { recursive: true });

  for (const video of videos) {
    if (!existsSync(video.file)) fail(`No such video: ${video.file}`);
    const size = statSync(video.file).size;
    const out = join(mediaDir, `${video.name}.mp4`);
    const common = ["-map", "0:v:0", "-map", "0:a?", "-map_metadata", "-1", "-map_chapters", "-1"];

    if (size <= 10 * 1048576) {
      ffmpeg(["-i", video.file, ...common, "-c", "copy", "-movflags", "+faststart", out]);
    } else {
      ffmpeg([
        "-i", video.file, ...common,
        "-vf", "scale='min(1920,iw)':-2:flags=lanczos",
        "-c:v", "libx264", "-preset", "slower", "-crf", "28",
        "-profile:v", "high", "-level:v", "4.1", "-pix_fmt", "yuv420p", "-g", "240",
        "-c:a", "aac", "-b:a", "96k",
        "-movflags", "+faststart",
        out,
      ]);
    }

    // The poster is a real frame of the video.
    const frame = ffmpeg([
      "-ss", String(video.posterAt), "-i", video.file,
      "-frames:v", "1", "-f", "image2pipe", "-vcodec", "png", "-",
    ]);
    const poster = await sharp(frame.stdout)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 86, effort: 6, smartSubsample: true })
      .toBuffer();
    writeFileSync(join(contentDir, `poster-${video.name}.webp`), poster);

    console.log(
      `  ${video.name}.mp4  ${mb(size)} -> ${mb(statSync(out).size)} (${size <= 10 * 1048576 ? "copied" : "re-encoded"}), poster at ${video.posterAt}s ${kb(poster.length)}`,
    );
  }
  console.log(`Videos: ${videos.length} files in public/media/${project}/`);
}
