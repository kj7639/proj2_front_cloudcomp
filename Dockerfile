# ---------- 1. Build stage ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Install deps
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .

# Build-time env vars (IMPORTANT)
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

# Build Next.js app
RUN npm run build


# ---------- 2. Production stage ----------
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy built app from builder
COPY --from=builder /app ./

# Install only production deps
RUN npm ci --omit=dev

EXPOSE 3000

CMD ["npm", "run", "start"]