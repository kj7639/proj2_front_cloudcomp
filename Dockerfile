# ---------- 1. Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Build with backend URL baked in
ARG NEXT_PUBLIC_BACKEND_URL
RUN echo "Building with NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL"
RUN NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL npm run build

# ---------- 2. Production stage ----------
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy built app from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
