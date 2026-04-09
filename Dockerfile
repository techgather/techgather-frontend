# =========================
# 1. Base
# =========================
FROM node:20-alpine AS base
WORKDIR /app

# =========================
# 2. Dependencies (캐시 핵심)
# =========================
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# =========================
# 3. Builder
# =========================
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# =========================
# 4. Runner (최종 이미지)
# =========================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# 👉 node_modules 재사용 (중복 제거 핵심🔥)
COPY --from=deps /app/node_modules ./node_modules

# 👉 빌드 결과만 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY package.json ./

EXPOSE 3000
CMD ["npm", "run", "start"]

# CI/CD 테스트
# CI/CD 테스트