FROM node:16-alpine as base

WORKDIR /app

COPY yarn.lock package.json /app/

ENV NODE_ENV=production
ENV NODE_CONFIG_ENV=develop

RUN yarn install --frozen-lockfile --production
RUN apk add chromium
COPY . .
RUN yarn build:all

CMD yarn start:${SERVICE}:prod


