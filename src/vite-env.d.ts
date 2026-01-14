/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AMADEUS_API_KEY: string;
  readonly VITE_AMADEUS_API_SECRET: string;
  readonly VITE_AMADEUS_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_SEARCH_HISTORY: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_API_RETRY_ATTEMPTS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
