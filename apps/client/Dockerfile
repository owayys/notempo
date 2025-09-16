## use bun to install with frozen bun.lock

FROM oven/bun:1.2.20-alpine AS installer

WORKDIR /usr/src/app

COPY . .

RUN bun install --frozen-lockfile --no-cache

## use node for build to circumvent bun build issue: https://github.com/oven-sh/bun/issues/21137

FROM node:22-alpine AS builder

WORKDIR /usr/src/app

ARG NEXT_PUBLIC_SERVER_URL

COPY --from=installer /usr/src/app .

RUN NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL} npm run --prefix ./apps/client build

## pick client out of monorepo build for lean image

FROM oven/bun:1.2.20-alpine

WORKDIR /usr/src/app

ENV HOST="0.0.0.0"
ENV PORT=80

RUN apk add --no-cache curl

COPY --from=builder /usr/src/app/apps/client/package.json ./package.json

COPY --from=builder /usr/src/app/apps/client/out .

EXPOSE ${PORT}

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl --fail http://localhost:${PORT}/health || exit 1


RUN addgroup -S appuser && adduser -S appuser -G appuser

RUN chown -R appuser:appuser /usr/src/app

USER appuser

CMD ["bun", "run", "standalone/apps/client/server.js"]