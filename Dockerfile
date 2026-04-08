# ---------- 1. Build stage ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Build-time environment variable
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

# Debug: log the URL in build logs
RUN echo "Building with NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL"

# Build Next.js app
RUN npm run build

# ---------- 2. Production stage ----------
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy built app and package.json from builder
COPY --from=builder /app ./

# Install only production dependencies
RUN npm ci --omit=dev

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npx", "next", "start", "-p", "3000", "-H", "0.0.0.0"]