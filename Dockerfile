# -------- Stage 1: Build the Next.js app --------
# Use a lightweight Node.js image (latest LTS: 22) based on Alpine Linux
FROM node:22-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy only package files first (to leverage Docker layer caching)
COPY package.json package-lock.json ./

# Install dependencies (production + dev, because we need dev deps to build Next.js)
RUN npm ci

# Copy the rest of your project files (src/, public/, configs, etc.)
COPY . .

# Build the Next.js app
# 👉 This step generates the `.next` build output
RUN npm run build



# -------- Stage 2: Run the app in production --------
FROM node:22-alpine AS runner

# Set working directory inside the container
WORKDIR /app

# Copy only the standalone build output and public assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# --- Additional Production Best Practices ---
# 1. Create a non-root user (better security)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# 2. Expose the Next.js port
EXPOSE 3000

# 3. Use `npm start` (runs Next.js in production mode)
CMD ["node", "server.js"]


# COMMANDS
# STEP 1: To build the Docker image, run this command (ONCE ONLY UNLESS DELETED, RECLONING, or ADD/REMOVE DEPENDENCIES) in the terminal from the directory containing the Dockerfile:
# docker build -t prompt-eat:prod .

# STEP 2: To run the Docker container, use this command (USE THIS ONLY EACH TIME YOU WANT TO START THE APP):
# docker run -p 3000:3000 prompt-eat:prod

# Then, open your browser and navigate to http://localhost:3000 to see your Next.js app running inside the Docker container.
# Note: Make sure your Next.js app is configured to run in production mode (e.g., using environment variables).