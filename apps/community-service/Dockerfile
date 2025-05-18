FROM node:20-alpine AS builder

WORKDIR /app/apps/community-service

RUN corepack enable

# Copy only the necessary files for dependency installation
COPY apps/community-service/package.json .
COPY apps/community-service/yarn.lock .

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the code
COPY apps/community-service .

# Build the app
RUN yarn build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/apps/community-service/dist ./dist
COPY --from=builder /app/apps/community-service/node_modules ./node_modules

EXPOSE 8001
CMD ["node", "dist/main.js"]
