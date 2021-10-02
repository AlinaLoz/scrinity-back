FROM node:12.19.0-alpine3.9 AS base

WORKDIR /app

COPY yarn.lock package.json /app/

RUN yarn install --frozen-lockfile --production=true
ENV NODE_ENV=production

FROM base as builder

COPY . .
RUN yarn install --frozen-lockfile --production=false
RUN yarn global add @nestjs/cli@8.1.2

RUN yarn build:all

FROM base

COPY --from=builder /app/dist /app/dist
COPY yarn.lock package.json /   app/
COPY config /app/config

EXPOSE 3001
CMD yarn start:api:prod
