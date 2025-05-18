FROM node:20-alpine AS builder

WORKDIR /app/apps/community-service

COPY apps/community-service/package.json apps/community-service/yarn.lock ./

ENV NODE_ENV=production

RUN corepack enable && \
    yarn install --frozen-lockfile --production=false

COPY apps/community-service .

RUN yarn build

FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/apps/community-service/dist ./dist
COPY apps/community-service/package.json apps/community-service/yarn.lock ./
RUN corepack enable && \
    yarn install --frozen-lockfile --production=true

USER node

EXPOSE 8001
CMD ["node", "dist/main.js"]