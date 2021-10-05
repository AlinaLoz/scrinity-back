FROM node:12.19.0-alpine3.9 AS base

WORKDIR /app

COPY yarn.lock package.json /app/

ENV NODE_ENV=production
ENV NODE_CONFIG_ENV=develop

RUN yarn install --frozen-lockfile --production
COPY . .
RUN yarn build:all

CMD yarn start:${SERVICE}:prod


