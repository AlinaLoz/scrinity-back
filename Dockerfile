FROM node:12.19.0-alpine3.9 AS base

WORKDIR /app

COPY yarn.lock package.json /app/

ENV NODE_ENV=production
ENV NODE_CONFIG_ENV=develop

RUN yarn install --frozen-lockfile --production
COPY . .
RUN yarn build:all


FROM node:12.19.0-alpine3.9 AS application
RUN yarn install --frozen-lockfile --production
COPY --from=base /app/dist /app/dist

EXPOSE 3001
CMD yarn start:api:prod


