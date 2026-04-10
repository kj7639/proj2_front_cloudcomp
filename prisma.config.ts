// prisma.config.ts (ROOT)
import "dotenv/config"
import { defineConfig } from "prisma/config"

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: "postgresql://neondb_owner:npg_XfEy7amtC1bA@ep-divine-violet-akf9yy7h-pooler.c-3.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
  }
})