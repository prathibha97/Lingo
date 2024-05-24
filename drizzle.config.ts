import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './database/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL!,
  },
} satisfies Config;
