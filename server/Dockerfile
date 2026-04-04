FROM node:20-alpine

RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

COPY server/package*.json ./
RUN npm ci

COPY server/ ./
COPY src/data/catalogData.js ./seed/catalogData.js

RUN npx prisma generate

RUN npm test

EXPOSE 4000

# Одна строка без внешнего .sh — не ломается из‑за CRLF на Windows при сборке образа.
ENTRYPOINT ["sh", "-c", "npx prisma migrate deploy && node prisma/seed.js && exec node src/index.js"]
