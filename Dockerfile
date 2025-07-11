# CHURCHOS™ Frontend Docker Configuration
# Production-ready sacred operating system frontend

# Build stage
FROM node:18-alpine AS builder

# Set work directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the sacred application
RUN npm run build

# =============================================================================
# PRODUCTION STAGE
# =============================================================================
FROM nginx:alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create sacred user
RUN addgroup -g 1001 -S churchos && \
    adduser -S churchos -u 1001

# Change ownership
RUN chown -R churchos:churchos /usr/share/nginx/html && \
    chown -R churchos:churchos /var/cache/nginx && \
    chown -R churchos:churchos /var/log/nginx && \
    chown -R churchos:churchos /etc/nginx/conf.d

# Switch to sacred user
USER churchos

# Expose sacred port
EXPOSE 3000

# Health check for sacred monitoring
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/ || exit 1

# Sacred startup command
CMD ["nginx", "-g", "daemon off;"] 