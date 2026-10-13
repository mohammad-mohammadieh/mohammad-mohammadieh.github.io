// Content and confidentiality checks.
//
//   node scripts/check.mjs --source   the project files and the color tokens
//   node scripts/check.mjs --repo     every file that would be published by a push
//   node scripts/check.mjs --dist     the built site in dist/
//   node scripts/check.mjs            all three (dist/ must already exist)
//
// "npm run build" runs --source and --repo, builds, then runs --dist.
// Any error stops the build with a non-zero exit code. Warnings do not.
//
// Messages name the file, the line and the kind of problem. They never repeat
// the value that was found, so the output is safe to paste anywhere.

import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { userInfo } from "node:os";
import { dirname, extname, join, posix, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import {
  GITHUB_PLACEHOLDER,
  SITE_URL,
  hasGithub,
  hasSiteUrl,
} from "../site.config.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));
const all = args.size === 0;
const runSource = all || args.has("--source");
const runRepo = all || args.has("--repo");
const runDist = all || args.has("--dist");

const errors = [];
const warnings = [];
const notes = [];
const fail = (check, message) => errors.push(`[${check}] ${message}`);
const warn = (check, message) => warnings.push(`[${check}] ${message}`);

const rel = (path) => relative(root, path).split(sep).join("/");
const read = (path) => readFileSync(path, "utf8");
const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const lineOf = (text, index) => text.slice(0, index).split("\n").length;
const mb = (bytes) => `${(bytes / 1048576).toFixed(1)} MB`;

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const siteData = read(join(root, "src/data/site.ts"));
const EMAIL = siteData.match(/email:\s*"([^"]+)"/)?.[1] ?? "";
const EMPLOYER = siteData.match(/employer:\s*"([^"]+)"/)?.[1] ?? "";
const NOTE = siteData.match(/confidentialityNote:\s*"([^"]+)"/)?.[1] ?? "";

// The current employer is named once, in the work history. Its short form and
// the rest of its name are both searched for everywhere else.
const [employerShort, ...employerRest] = EMPLOYER.split(" ");
const employerPattern = EMPLOYER
  ? new RegExp(
      [`\\b${escapeRegExp(employerShort)}\\b`, employerRest.length ? escapeRegExp(employerRest.join(" ")) : null]
        .filter(Boolean)
        .join("|"),
    )
  : null;

// ------------------------------------------------------- confidential terms
//
// Words that must never appear: client names, product names, colleague names,
// internal domains. One term per line, "#" starts a comment. The list is
// private. It is read from the file named by the CONFIDENTIAL_TERMS_FILE
// environment variable (a file kept outside the repository), or from
// .confidential-terms.txt in this folder, which git ignores.

function loadTerms() {
  const candidates = [process.env.CONFIDENTIAL_TERMS_FILE, join(root, ".confidential-terms.txt")];
  const file = candidates.find((path) => path && existsSync(path));
  if (!file) return null;
  return read(file)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}
const confidentialTerms = loadTerms();

// Things about this computer that must not travel with the site. They are
// read at run time and never written down: the local account name, and the
// domain of the git identity configured for the whole machine when it is not
// the address the site publishes.
function localIdentity() {
  const found = [];
  const generic = new Set(["runner", "root", "user", "admin", "administrator", "ubuntu", "node"]);
  try {
    const name = userInfo().username;
    if (name && name.length >= 5 && !generic.has(name.toLowerCase())) {
      found.push({ label: "the local account name", value: name });
    }
  } catch {}
  try {
    const email = execSync("git config --global user.email", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim()
      .toLowerCase();
    const domain = email.split("@")[1];
    const personal = /^(gmail|googlemail|outlook|hotmail|live|yahoo|icloud|proton|protonmail)\.|users\.noreply\.github\.com$/;
    if (domain && email !== EMAIL.toLowerCase() && !personal.test(domain)) {
      found.push({ label: "the domain of this computer's git email", value: domain });
    }
  } catch {}
  return found;
}
const identity = localIdentity();

// Patterns that have no place in a public repository or on the site.
const LEAK_RULES = [
  {
    label: "a local file path",
    re: /[A-Za-z]:\\{1,2}Users\\{1,2}[^\\\s"']+|\/(?:Users|home)\/[A-Za-z0-9._-]+\/|%USERPROFILE%/,
  },
  {
    label: "a cloud tenant or environment address",
    re: /[a-z0-9-]+\.onmicrosoft\.com|[a-z0-9-]+\.sharepoint\.com|[a-z0-9-]+\.crm\d*\.dynamics\.com|[a-z0-9-]+\.azurewebsites\.net|[a-z0-9-]+\.(?:blob|dfs|database)\.core\.windows\.net|powerappsportals\.com|\/environments\/[0-9a-f-]{8,}/i,
  },
  {
    label: "an identifier shaped like a GUID",
    re: /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i,
  },
  {
    label: "an internal network address",
    re: /https?:\/\/(?:10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(?:1[6-9]|2\d|3[01])\.\d+\.\d+)|https?:\/\/[a-z0-9.-]+\.(?:local|internal|corp|lan|intranet)\b/i,
  },
  {
    label: "a phone number",
    re: /\+\d{1,3}[ -]?\(?\d{1,4}\)?(?:[ -]?\d{2,4}){2,4}\b|\btel:/,
  },
];
const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+/g;
const emailAllowed = (address) => {
  const value = address.toLowerCase();
  // The reserved example domains can never belong to a real person.
  return value === EMAIL.toLowerCase() || /(?:^|[@.])example(?:\.(?:com|org|net))?$/.test(value);
};
// The platform project must say nothing about commercial terms.
const PRICING_RE = /\b(?:pricing|price[sd]?|quot(?:e|es|ed|ation|ations)|margins?)\b/i;

/** Applies every leak rule to one piece of text. `where` is the file shown in messages. */
function scanText(text, where, { patterns = true, emails = true, pricing = false } = {}) {
  if (patterns) {
    for (const rule of LEAK_RULES) {
      const hit = text.search(rule.re);
      if (hit !== -1) fail("leak", `${where}: line ${lineOf(text, hit)} contains ${rule.label}.`);
    }
  }
  if (emails) {
    for (const match of text.matchAll(EMAIL_RE)) {
      if (!emailAllowed(match[0])) {
        fail("leak", `${where}: line ${lineOf(text, match.index)} contains an email address that is not the site's own.`);
        break;
      }
    }
  }
  if (pricing) {
    const hit = text.search(PRICING_RE);
    if (hit !== -1) fail("wording", `${where}: line ${lineOf(text, hit)} uses pricing, quote or margin wording.`);
  }
  const lower = text.toLowerCase();
  for (const item of identity) {
    const hit = lower.indexOf(item.value.toLowerCase());
    if (hit !== -1) fail("leak", `${where}: line ${lineOf(text, hit)} contains ${item.label}.`);
  }
  for (const term of confidentialTerms ?? []) {
    const hit = lower.indexOf(term.toLowerCase());
    if (hit !== -1) fail("confidential", `${where}: line ${lineOf(text, hit)} contains a term from the private list.`);
  }
}

// ---------------------------------------------------------------- projects

const projectsDir = join(root, "src/content/projects");
const HEADINGS = {
  built: ["The problem", "What I built", "How it works", "What it shows"],
  contributed: ["The problem", "What I worked on", "How it works", "What it shows"],
};

function readProjects() {
  return readdirSync(projectsDir)
    .filter((name) => !name.startsWith("_") && statSync(join(projectsDir, name)).isDirectory())
    .map((slug) => {
      const file = join(projectsDir, slug, "index.md");
      if (!existsSync(file)) return { slug, file, missing: true };
      const text = read(file).replace(/\r\n/g, "\n");
      const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
      const front = match?.[1] ?? "";
      const body = match?.[2] ?? "";
      return {
        slug,
        file,
        front,
        body,
        hasFront: Boolean(match),
        draft: /^draft:\s*true\b/m.test(front),
        role: front.match(/^role:\s*"?(\w+)"?/m)?.[1],
      };
    });
}

function checkSource() {
  // Project files: structure and the four written headings.
  for (const project of readProjects()) {
    const name = rel(project.file);
    if (project.missing) {
      fail("project", `${name} is missing. Every project folder needs an index.md.`);
      continue;
    }
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(project.slug)) {
      fail("project", `Folder "${project.slug}" must be lowercase letters, digits and hyphens.`);
    }
    if (!project.hasFront) {
      fail("project", `${name} has no front matter block between two "---" lines.`);
      continue;
    }
    if (project.draft) {
      notes.push(`Draft, not built: ${name}`);
      continue;
    }

    const withoutCode = project.body.replace(/```[\s\S]*?```/g, "");
    const headings = [...withoutCode.matchAll(/^##\s+(.+?)\s*$/gm)].map((m) => m[1]);
    const expected = HEADINGS[project.role] ?? HEADINGS.built;
    if (headings.join("|") !== expected.join("|")) {
      fail(
        "headings",
        `${name} must have exactly these "##" headings in this order: ${expected.join(", ")}. Found: ${headings.join(", ") || "none"}.`,
      );
    }
    if (/!\[[^\]]*\]\(|<img\b/i.test(withoutCode)) {
      fail(
        "alt-text",
        `${name} has an image in its text. Add images through "cover" or "gallery" in the front matter, where alt text is required.`,
      );
    }

    // File names travel to the public site, so they follow the same rules as text.
    for (const path of walk(join(projectsDir, project.slug))) {
      const base = path.split(sep).pop();
      if (!/^[a-z0-9][a-z0-9.-]*$/.test(base)) {
        fail("file-name", `${rel(path)}: use lowercase letters, digits, hyphens and dots only.`);
      }
    }

    // A video named in the front matter must exist under public/.
    for (const match of project.front.matchAll(/^\s+src:\s*"(\/[^"]+\.(?:mp4|webm))"/gm)) {
      if (!existsSync(join(root, "public", ...match[1].split("/").filter(Boolean)))) {
        fail("media", `${name}: video ${match[1]} is not in public/.`);
      }
    }
  }

  checkContrast();
}

// ---------------------------------------------------------------- contrast

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function checkContrast() {
  const css = read(join(root, "src/styles/tokens.css"));
  // The site has one theme, so the whole file is one block.
  const themes = { dark: css };
  for (const [theme, block] of Object.entries(themes)) {
    const token = (name) => block.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`))?.[1];
    const colors = Object.fromEntries(
      ["bg", "surface", "ink", "muted", "accent"].map((name) => [name, token(name)]),
    );
    if (Object.values(colors).some((value) => !value)) {
      fail("contrast", `Could not read every color token for the ${theme} theme in tokens.css.`);
      continue;
    }
    const pairs = [
      ["ink", "bg"],
      ["ink", "surface"],
      ["muted", "bg"],
      ["muted", "surface"],
      ["accent", "bg"],
      ["accent", "surface"],
      // Primary button: page background color as text on ink, and on accent when hovered.
      ["bg", "ink"],
      ["bg", "accent"],
    ];
    for (const [fg, bg] of pairs) {
      const ratio = contrast(colors[fg], colors[bg]);
      if (ratio < 4.5) {
        fail(
          "contrast",
          `${theme} theme: --${fg} on --${bg} is ${ratio.toFixed(2)}:1. It must be at least 4.5:1.`,
        );
      }
    }
  }
}

// -------------------------------------------------------------------- repo
//
// Everything a "git push" would make public: tracked files plus new files
// that .gitignore does not exclude.

const TEXT_TYPES = new Set([
  ".html", ".xml", ".txt", ".css", ".js", ".mjs", ".cjs", ".ts", ".astro", ".json", ".svg",
  ".md", ".yml", ".yaml", ".toml", "",
]);
const NEVER_PUBLISH = /(^|\/)(WEBSITE_PLAN\.md|\.confidential-terms\.txt|\.env(\..*)?)$|\.(pbix|pbit|pbip|xlsx?|docx?|pptx?|csv|sqlite|db|bak|log|pfx|pem|key)$/i;

function publishableFiles() {
  try {
    const out = execSync("git ls-files --cached --others --exclude-standard -z", {
      cwd: root,
      stdio: ["ignore", "pipe", "ignore"],
      maxBuffer: 64 * 1024 * 1024,
    }).toString();
    const names = out.split("\0").filter(Boolean);
    if (names.length > 0) return names.filter((name) => existsSync(join(root, name)));
  } catch {}
  // Not a git repository yet: fall back to the same exclusions .gitignore lists.
  const skip = /^(node_modules|dist|\.astro|\.git|\.impeccable|\.tmp-images)\//;
  return walk(root)
    .map(rel)
    .filter((name) => !skip.test(name) && !NEVER_PUBLISH.test(name));
}

function checkRepo() {
  const names = publishableFiles();
  let total = 0;
  let largest = { name: "", size: 0 };

  for (const name of names) {
    const path = join(root, name);
    const size = statSync(path).size;
    total += size;
    if (size > largest.size) largest = { name, size };

    if (NEVER_PUBLISH.test(name)) {
      fail("repo", `${name}: this kind of file must not be published. Add it to .gitignore.`);
      continue;
    }
    if (size > 25 * 1048576) fail("repo", `${name}: ${mb(size)}. No file may be over 25 MB.`);

    // File names are public too.
    if (employerPattern?.test(name)) fail("employer", `${name}: the employer name must not appear in a file name.`);
    scanText(name, `${name} (file name)`, { patterns: false, emails: false });

    const ext = extname(name).toLowerCase();
    if (TEXT_TYPES.has(ext)) {
      const text = read(path);
      const self = name === "scripts/check.mjs";
      const lock = name === "package-lock.json";
      // Words about commercial terms are searched for in what a visitor reads, not in code comments.
      const content = /^(src\/(content|data)\/|README\.md$)/.test(name);
      // This script holds the patterns themselves, and the lockfile holds
      // checksums that can look like anything, so both skip the pattern rules.
      scanText(text, name, { patterns: !self && !lock, emails: !lock, pricing: content });
      // The employer is named in the site data, where the work history lives, and nowhere else.
      if (employerPattern && name !== "src/data/site.ts") {
        const hit = text.search(employerPattern);
        if (hit !== -1) fail("employer", `${name}: line ${lineOf(text, hit)} names the employer.`);
      }
    } else {
      // Images, fonts and videos: look for readable text left inside the file.
      const text = readFileSync(path, "latin1");
      scanText(text, name, { patterns: false, emails: false });
      const hit = text.search(LEAK_RULES[0].re);
      if (hit !== -1) fail("leak", `${name}: contains a local file path in its metadata.`);
    }
  }

  notes.push(
    `Repository: ${names.length} files, ${mb(total)} in total. Largest: ${largest.name} (${mb(largest.size)}).`,
  );
  if (total > 100 * 1048576) warn("repo", `The repository is ${mb(total)}. Consider hosting the long videos elsewhere.`);
  if (confidentialTerms === null) {
    warn(
      "confidential",
      "No private term list was found, so client names were not searched for by name. Point CONFIDENTIAL_TERMS_FILE at your list, or create .confidential-terms.txt here (git ignores it), before publishing.",
    );
  }
}

// -------------------------------------------------------------------- dist

// Hashed asset names are random, so they are left out of text searches.
const stripAssetUrls = (text) => text.replace(/\/_astro\/[^"'\s)>,]+/g, "");
const decode = (text) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const visibleText = (html) =>
  decode(
    html
      .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " "),
  );

function checkDist() {
  const dist = join(root, "dist");
  if (!existsSync(join(dist, "index.html"))) {
    fail("build", 'dist/index.html does not exist. Run "npm run build" first.');
    return;
  }

  const files = walk(dist);
  const pages = files.filter((file) => file.endsWith(".html"));
  const html = new Map(pages.map((file) => [file, read(file)]));
  const homeFile = join(dist, "index.html");
  const idsOf = (file) => new Set([...(html.get(file) ?? "").matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

  // Every published project has its page.
  const published = readProjects().filter((p) => !p.missing && !p.draft);
  for (const project of published) {
    if (!existsSync(join(dist, "projects", project.slug, "index.html"))) {
      fail("build", `No page was built for src/content/projects/${project.slug}.`);
    }
  }

  // Images without alt text. A YouTube poster sits inside a link that has its
  // own text, so it is the one image that may be decorative.
  const videoLink = /<a\b[^>]*class="[^"]*\bvideo\b[^"]*"[\s\S]*?<\/a>/g;
  for (const [file, text] of html) {
    for (const tag of text.replace(videoLink, "").match(/<img\b[^>]*>/gi) ?? []) {
      const alt = tag.match(/\salt="([^"]*)"/i)?.[1];
      if (alt === undefined || alt.trim() === "") {
        fail("alt-text", `${rel(file)}: an image has no alt text.`);
      }
    }
  }

  // The employer name appears in the home page work section and nowhere else.
  const workSection = /<section[^>]*\bid="work"[\s\S]*?<\/section>/;
  if (EMPLOYER && !workSection.exec(html.get(homeFile))?.[0].includes(EMPLOYER)) {
    fail("employer", "The home page work section does not show the current employer.");
  }

  // Every text file in the build: leaks, private terms, the employer name.
  const builtText = new Set([".html", ".xml", ".txt", ".css", ".js", ".mjs", ".json", ".svg"]);
  for (const file of files) {
    const name = rel(file);
    if (!name.includes("/_astro/")) {
      scanText(name, `${name} (file name)`, { patterns: false, emails: false });
      if (employerPattern?.test(name)) fail("employer", `${name}: the employer name must not appear in a file name.`);
    }
    if (!builtText.has(extname(file).toLowerCase())) continue;
    let text = stripAssetUrls(read(file));
    const isPage = file.endsWith(".html");
    // On a page, everything except style blocks is searched: text, alt text, meta tags.
    scanText(isPage ? decode(text.replace(/<style\b[\s\S]*?<\/style>/gi, " ")) : text, name, {
      pricing: isPage,
    });
    if (file === homeFile) text = text.replace(workSection, "");
    const hit = employerPattern ? text.search(employerPattern) : -1;
    if (hit !== -1) {
      fail("employer", `${name}: the employer is named outside the home page work section.`);
    }
  }

  // Em dashes and en dashes.
  const dash = new RegExp("[\\u2013\\u2014]|&(mdash|ndash|#8211|#8212|#x2013|#x2014);", "i");
  for (const file of files.filter((f) => [".html", ".xml", ".txt"].includes(extname(f)))) {
    const text = read(file);
    const hit = text.search(dash);
    if (hit !== -1) {
      const near = visibleText(text.slice(Math.max(0, hit - 60), hit + 60));
      fail("dashes", `${rel(file)}: em dash or en dash found near "${near.trim()}"`);
    }
  }

  // Links: nothing empty, nothing broken inside the site.
  const external = new Set();
  const resolveTarget = (fromFile, path) => {
    const base = "/" + rel(dirname(fromFile)).replace(/^dist\/?/, "");
    const absolute = path.startsWith("/") ? path : posix.join(base, path);
    const local = join(dist, ...absolute.split("/").filter(Boolean));
    if (absolute.endsWith("/") || (existsSync(local) && statSync(local).isDirectory())) {
      return join(local, "index.html");
    }
    return local;
  };

  for (const [file, text] of html) {
    const refs = [
      ...[...text.matchAll(/\s(?:href|src|poster)="([^"]*)"/g)].map((m) => m[1]),
      ...[...text.matchAll(/\ssrcset="([^"]*)"/g)].flatMap((m) =>
        m[1].split(",").map((part) => part.trim().split(/\s+/)[0]),
      ),
    ].map(decode);

    for (const ref of refs) {
      if (ref.trim() === "" || ref === "#") {
        fail("links", `${rel(file)}: empty link.`);
        continue;
      }
      if (ref.includes(GITHUB_PLACEHOLDER)) {
        fail("links", `${rel(file)}: a link still contains the GitHub placeholder.`);
        continue;
      }
      if (ref.startsWith("mailto:")) {
        if (ref !== `mailto:${EMAIL}`) fail("links", `${rel(file)}: an email link does not use the site's address.`);
        continue;
      }
      if (ref.startsWith("tel:")) {
        fail("links", `${rel(file)}: phone links are not allowed on the site.`);
        continue;
      }
      if (ref.startsWith("data:")) continue;

      let target = ref;
      if (/^https?:\/\//i.test(ref)) {
        if (!ref.startsWith(SITE_URL + "/") && ref !== SITE_URL) {
          external.add(ref);
          continue;
        }
        target = ref.slice(SITE_URL.length) || "/";
      } else if (/^[a-z][a-z0-9+.-]*:/i.test(ref)) {
        fail("links", `${rel(file)}: unexpected link type: ${ref.split(":")[0]}:`);
        continue;
      }

      const [path, fragment] = target.split("#");
      const targetFile = path === "" ? file : resolveTarget(file, path.split("?")[0]);
      if (!existsSync(targetFile)) {
        fail("links", `${rel(file)}: broken link to ${ref}`);
        continue;
      }
      if (fragment && targetFile.endsWith(".html") && !idsOf(targetFile).has(fragment)) {
        fail("links", `${rel(file)}: link to ${ref}, but that page has no "${fragment}" section.`);
      }
    }
  }
  if (external.size > 0) {
    notes.push(`External links (not opened by this check): ${[...external].sort().join(", ")}`);
  }

  // Wording that must not appear anywhere on the site.
  const banned = [
    [/independent rebuild/i, 'the phrase "independent rebuild"'],
    [/lorem ipsum/i, "placeholder text"],
    [/\bTODO\b/, 'a "TODO" marker'],
    [new RegExp(GITHUB_PLACEHOLDER), "the GitHub placeholder"],
  ];
  for (const [file, text] of html) {
    const clean = stripAssetUrls(text);
    for (const [pattern, label] of banned) {
      if (pattern.test(clean)) fail("wording", `${rel(file)}: contains ${label}.`);
    }
  }

  // Each project page shows the fixed note, above its first image or video.
  for (const project of published) {
    const file = join(dist, "projects", project.slug, "index.html");
    const text = html.get(file);
    if (!text) continue;
    const noteAt = decode(text).indexOf(NOTE);
    const imageAt = text.search(/<img\b|<picture\b|<video\b/i);
    if (noteAt === -1) {
      fail("note", `${rel(file)}: the confidentiality note is missing or was changed.`);
    } else if (imageAt !== -1 && imageAt < noteAt) {
      fail("note", `${rel(file)}: an image appears above the confidentiality note.`);
    }
    // Videos never start by themselves and never download before the visitor asks.
    for (const tag of text.match(/<video\b[^>]*>/gi) ?? []) {
      if (!/\spreload="none"/.test(tag) || !/\scontrols\b/.test(tag) || !/\sposter="/.test(tag) || /\sautoplay\b/.test(tag)) {
        fail("media", `${rel(file)}: every video needs controls, a poster and preload="none", and no autoplay.`);
      }
    }
  }

  // Titles, descriptions and social tags.
  const seen = { title: new Map(), description: new Map() };
  for (const [file, text] of html) {
    const title = decode(text.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
    const description = decode(
      text.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "",
    );
    if (!title) fail("seo", `${rel(file)}: no <title>.`);
    if (!description) fail("seo", `${rel(file)}: no meta description.`);
    if (title.length > 60) warn("seo", `${rel(file)}: title is ${title.length} characters (60 or fewer is best).`);
    if (description.length > 155) {
      warn("seo", `${rel(file)}: description is ${description.length} characters (155 or fewer is best).`);
    }
    for (const [kind, value] of [["title", title], ["description", description]]) {
      if (seen[kind].has(value)) {
        fail("seo", `${rel(file)}: same ${kind} as ${rel(seen[kind].get(value))}.`);
      }
      seen[kind].set(value, file);
    }
    if (file.endsWith("404.html")) continue;
    const canonical = text.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (!canonical) fail("seo", `${rel(file)}: no canonical link.`);
    else if (!canonical.startsWith(SITE_URL + "/")) fail("seo", `${rel(file)}: the canonical link does not use the site address.`);
    const image = text.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
    if (!image) {
      fail("seo", `${rel(file)}: no social preview image tag.`);
    } else if (!image.startsWith(SITE_URL + "/")) {
      fail("seo", `${rel(file)}: the social preview image does not use the site address.`);
    } else if (!existsSync(join(dist, ...image.replace(SITE_URL, "").split("/").filter(Boolean)))) {
      fail("seo", `${rel(file)}: its social preview image is not in the build.`);
    }
  }
  const sitemap = join(dist, "sitemap-0.xml");
  if (!existsSync(sitemap)) fail("seo", "The sitemap was not built.");
  else if (/<loc>(?!https?:\/\/)/.test(read(sitemap)) || !read(sitemap).includes(`<loc>${SITE_URL}/`)) {
    fail("seo", "The sitemap does not use the site address.");
  }

  // Sizes: the plan's budgets, and the size of the whole built site.
  const sizeOf = (ext) =>
    files.filter((f) => extname(f) === ext).reduce((sum, f) => sum + statSync(f).size, 0);
  let inlineScript = 0;
  for (const text of html.values()) {
    const scripts = [...text.matchAll(/<script\b(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)];
    inlineScript = Math.max(inlineScript, scripts.reduce((sum, m) => sum + m[1].length, 0));
  }
  const js = sizeOf(".js") + sizeOf(".mjs") + inlineScript;
  const css = sizeOf(".css");
  const totalBuilt = files.reduce((sum, f) => sum + statSync(f).size, 0);
  notes.push(
    `Built site: ${pages.length} pages, ${files.length} files, ${mb(totalBuilt)}. JavaScript ${(js / 1024).toFixed(1)} KB, CSS ${(css / 1024).toFixed(1)} KB.`,
  );
  if (js > 10 * 1024) warn("budget", `JavaScript is ${(js / 1024).toFixed(1)} KB. The budget is 10 KB.`);
  if (css > 20 * 1024) warn("budget", `CSS is ${(css / 1024).toFixed(1)} KB. The budget is 20 KB.`);
  for (const file of files) {
    if (statSync(file).size > 25 * 1048576) fail("budget", `${rel(file)}: over 25 MB.`);
  }

  if (!hasSiteUrl) {
    warn(
      "config",
      "SITE_URL in site.config.mjs is still the placeholder. Set the real address before publishing, or canonical links, the sitemap and link previews will point to the wrong place.",
    );
  }
  if (!hasGithub) {
    warn("config", "GITHUB_USERNAME in site.config.mjs is empty, so no GitHub link is shown.");
  }
}

// --------------------------------------------------------------------- run

if (runSource) checkSource();
if (runRepo) checkRepo();
if (runDist) checkDist();

const scope = [runSource && "source", runRepo && "repository", runDist && "built site"]
  .filter(Boolean)
  .join(", ");
for (const line of notes) console.log(`  note  ${line}`);
for (const line of warnings) console.warn(`  warn  ${line}`);
for (const line of errors) console.error(`  FAIL  ${line}`);

if (errors.length > 0) {
  console.error(`\nCheck failed (${scope}): ${errors.length} problem(s) to fix.`);
  process.exit(1);
}
console.log(`Check passed (${scope})${warnings.length ? `, with ${warnings.length} warning(s)` : ""}.`);
