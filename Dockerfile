# ─────────────────────────────────────────────────────────
# libcss — Multi-stage Dockerfile
# Compiles SCSS → CSS with Dart Sass, PostCSS, and Sassdoc
# ─────────────────────────────────────────────────────────

# ── Base ──────────────────────────────────────────────────
FROM node:20-alpine AS base
WORKDIR /libcss
COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts --legacy-peer-deps
COPY . .

# ── Builder (production CSS) ─────────────────────────────
FROM base AS builder

# 1. Compile expanded CSS
RUN npx sass src/scss/libcss.scss dist/css/libcss.css \
      --style=expanded --no-source-map

# 2. Compile minified CSS
RUN npx sass src/scss/libcss.scss dist/css/libcss.min.css \
      --style=compressed --no-source-map

# 3. Autoprefixer via PostCSS
RUN npx postcss dist/css/libcss.css     -o dist/css/libcss.css     --no-map
RUN npx postcss dist/css/libcss.min.css -o dist/css/libcss.min.css --no-map

# 4. Generate documentation
RUN npx sassdoc src/scss --config .sassdocrc.yaml || true

# ── Dist (minimal output image) ─────────────────────────
FROM scratch AS dist
COPY --from=builder /libcss/dist /dist

# ── Dev (watch mode) ─────────────────────────────────────
FROM base AS dev
EXPOSE 3000
CMD ["npx", "sass", "--watch", "src/scss/libcss.scss:dist/css/libcss.css", "--style=expanded"]

# ── Lint ─────────────────────────────────────────────────
FROM base AS lint
CMD ["npx", "stylelint", "src/scss/**/*.scss"]

# ── Docs ─────────────────────────────────────────────────
FROM base AS docs
CMD ["npx", "sassdoc", "src/scss", "--config", ".sassdocrc.yaml"]
