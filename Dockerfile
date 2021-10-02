FROM oraclelinux:7-slim as base

WORKDIR /app

COPY yarn.lock package.json /app/

RUN yarn install --frozen-lockfile --production
ENV NODE_ENV=production

FROM base as builder

RUN yarn install --frozen-lockfile --production=false

COPY . .

RUN yarn build:all

FROM base

COPY --from=builder /app/dist /app/dist
COPY yarn.lock package.json /app/
COPY config /app/config

CMD yarn start:$SERVICE:prod
