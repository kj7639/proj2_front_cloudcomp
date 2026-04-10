# ---------- 1. Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

ARG NEXT_PUBLIC_BACKEND_URL
ARG BETTER_AUTH_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG GITHUB_CLIENT_ID
ARG GITHUB_CLIENT_SECRET
ARG DATABASE_URL

ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID
ENV GITHUB_CLIENT_SECRET=$GITHUB_CLIENT_SECRET
ENV DATABASE_URL=$DATABASE_URL

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build with backend URL baked in
RUN echo "Building with NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL"
RUN NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL npm run build

# ---------- 2. Production stage ----------
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy built app from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]