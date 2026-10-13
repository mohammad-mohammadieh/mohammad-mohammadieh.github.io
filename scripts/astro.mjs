// Runs the Astro command line with its anonymous usage reporting switched off.
// Used by the npm scripts, for example: node scripts/astro.mjs build
process.env.ASTRO_TELEMETRY_DISABLED = "1";
await import("../node_modules/astro/bin/astro.mjs");
