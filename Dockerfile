# libcss — Multi-stage Dockerfile
# Compiles SCSS → CSS with Dart Sass, PostCSS, and Sassdoc

FROM node:20-alpine AS base
WORKDIR /libcss
COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts --legacy-peer-deps
COPY . .

FROM base AS builder

# 1. Compile expanded CSS
RUN npx sass src/scss/libcss.scss dist/css/libcss.css \
      --load-path=src/scss --style=expanded --no-source-map

# 2. Compile minified CSS
RUN npx sass src/scss/libcss.scss dist/css/libcss.min.css \
      --load-path=src/scss --style=compressed --no-source-map

# 3. Autoprefixer via PostCSS
RUN npx postcss dist/css/libcss.css     -o dist/css/libcss.css     --no-map
RUN npx postcss dist/css/libcss.min.css -o dist/css/libcss.min.css --no-map

# 4. Generate documentation
RUN npx sassdoc src/scss --config .sassdocrc.yaml || true

FROM base AS build
CMD npx sass src/scss/libcss.scss dist/css/libcss.css --load-path=src/scss --style=expanded --no-source-map && npx sass src/scss/libcss.scss dist/css/libcss.min.css --load-path=src/scss --style=compressed --no-source-map && npx postcss dist/css/libcss.css -o dist/css/libcss.css --no-map && npx postcss dist/css/libcss.min.css -o dist/css/libcss.min.css --no-map && (npx sassdoc src/scss --config .sassdocrc.yaml || true)

FROM scratch AS dist
COPY --from=builder /libcss/dist /dist
COPY --from=builder /libcss/src /src

FROM base AS dev
EXPOSE 3000
CMD ["npx", "sass", "--watch", "src/scss/libcss.scss:dist/css/libcss.css", "--load-path=src/scss", "--style=expanded"]

FROM base AS lint-scss
CMD ["npx", "stylelint", "src/scss/**/*.scss", "src/**/*.css"]

FROM base AS lint-ts
CMD ["npx", "eslint", "src/**/*.{ts,tsx}"]

FROM base AS lint
CMD ["sh", "-c", "npx stylelint 'src/scss/**/*.scss' 'src/**/*.css' && npx eslint 'src/**/*.{ts,tsx}'"]

FROM base AS typecheck
CMD ["npx", "tsc", "--noEmit"]

FROM base AS docs
CMD ["npx", "sassdoc", "src/scss", "--config", ".sassdocrc.yaml"]
