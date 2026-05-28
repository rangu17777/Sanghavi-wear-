// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Detect cloud deployment environment variables
const isNetlify =
  !!process.env.NETLIFY || process.env.NITRO_PRESET === "netlify";
const isVercel =
  !!process.env.VERCEL ||
  process.env.NITRO_PRESET === "vercel" ||
  process.env.NITRO_PRESET === "vercel-server";

// Determine the target Nitro preset for server side compiling
const preset =
  process.env.NITRO_PRESET ||
  (isNetlify ? "netlify" : isVercel ? "vercel" : undefined);

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Ensure Nitro is forced ON and compiled specifically with the target platform's preset
  // when deploying self-hosted on Netlify, Vercel, or compiling custom SSR builds.
  nitro: preset
    ? {
        preset,
      }
    : undefined,
});
