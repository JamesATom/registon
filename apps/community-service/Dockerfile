FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY apps/community-service/package.json apps/community-service/yarn.lock ./

RUN yarn global add @nestjs/cli
RUN yarn install --frozen-lockfile
RUN yarn install

COPY . .

RUN yarn --cwd apps/community-service build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/apps/community-service/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8001
CMD ["node", "dist/main.js"]
