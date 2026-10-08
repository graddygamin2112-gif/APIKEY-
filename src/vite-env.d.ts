/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Base path the app is served from. Subpath hosts (e.g. a GitHub Pages
   * project site at /APIKEY-/) set this to the subpath; root-served hosts
   * (Netlify, Cloudflare Pages, Vercel) leave it undefined, yielding "/".
   */
  readonly VITE_BASE_PATH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}