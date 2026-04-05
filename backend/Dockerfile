FROM oven/bun:1 AS base

WORKDIR /app

COPY app/package.json app/bun.lockb* ./
RUN bun install --frozen-lockfile 2>/dev/null

COPY app/ .

EXPOSE 3000

CMD ["bun", "run", "src/index.ts"]
