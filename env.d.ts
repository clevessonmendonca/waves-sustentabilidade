declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_API_KEY: string;
    SENDGRID_API_KEY: string;
    NEXT_PUBLIC_BASE_URL: string;
    GEOCODE_API_KEY: string;
  }
}
