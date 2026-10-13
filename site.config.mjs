// Site-wide settings that are not resume facts.
// Everything else on the site reads them from here.

// 1. GitHub username (personal account). The site links to the profile only:
//    https://github.com/<username>
//    Set it to "" to hide every GitHub link.
export const GITHUB_PLACEHOLDER = "YOUR_GITHUB_USERNAME";
export const GITHUB_USERNAME = "mohammad-mohammadieh";

// 2. The public address of the site, without a trailing slash.
//    Used for canonical links, social preview tags, the sitemap and robots.txt.
//    This is the GitHub Pages user site, served from the repository named
//    <username>.github.io. Change it here if the site moves to its own domain.
export const SITE_URL_PLACEHOLDER = "https://example.com";
export const SITE_URL = "https://mohammadmohammadieh.com";

// 3. The path the site is served under. "/" for a user site or a custom domain.
//    A project site (username.github.io/repository) would need "/repository",
//    and the site's internal links would then have to be prefixed with it too.
export const BASE_PATH = "/";

export const hasGithub =
  typeof GITHUB_USERNAME === "string" &&
  GITHUB_USERNAME.trim() !== "" &&
  GITHUB_USERNAME !== GITHUB_PLACEHOLDER;

export const hasSiteUrl = SITE_URL !== SITE_URL_PLACEHOLDER;
