import { twoFactor } from "better-auth/plugins"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { nextCookies } from "better-auth/next-js"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

// Create singleton Prisma client to prevent re-instantiation loops
let prismaInstance = null

const getPrismaClient = () => {
  if (prismaInstance) {
    return prismaInstance
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  })

  prismaInstance = new PrismaClient({
    adapter: new PrismaPg(pool)
  })

  return prismaInstance
}

let authInstance = null

const getAuthInstance = () => {
  if (authInstance) {
    return authInstance
  }

  const prisma = getPrismaClient()

  authInstance = betterAuth({
    baseURL: {
      allowedHosts: [
        "http://localhost:3000",
        "http://localhost:3004",
        "https://cpsy300.me",
        "https://cpsy300-backend-alb-355541218.us-east-2.elb.amazonaws.com"
      ],
      fallback: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://cpsy300.me"
    },
    database: prismaAdapter(prisma, {
    provider: "postgresql",
    serialize: true
  }),

  emailAndPassword: {
    enabled: true
  },
// fixed it amended
  socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
      }
    },

    plugins: [
      twoFactor({
        skipVerificationOnEnable: true
      }),
      nextCookies()
    ],

    secret: process.env.BETTER_AUTH_SECRET || (process.env.NODE_ENV === "development" ? "dev-secret" : undefined),

    trustedOrigins: ["http://localhost:3000", "http://localhost:3004", "https://cpsy300.me"],

    // Trust host for development and dynamic base URL handling
    trustHost: true
  })

  return authInstance
}

export const auth = getAuthInstance()


