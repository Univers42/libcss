NAME		= libcss
COMPOSE		= docker compose
IMAGE		= ghcr.io/univers42/libcss
VERSION		?= latest

export UID := $(shell id -u)
export GID := $(shell id -g)

all: build

build:
	docker build --target builder -t libcss-internal .
	docker create --name temp-extractor libcss-internal
	docker cp temp-extractor:/libcss/dist ./dist
	docker rm temp-extractor
lint:
	$(COMPOSE) --profile lint run --rm lint

lint-scss:
	$(COMPOSE) --profile lint-scss run --rm lint-scss

lint-ts:
	$(COMPOSE) --profile lint-ts run --rm lint-ts

lint-fix:
	npm run lint:fix

typecheck:
	$(COMPOSE) --profile typecheck run --rm typecheck

format:
	npm run format

dev:
	$(COMPOSE) --profile dev up dev

watch:
	$(COMPOSE) --profile dev up dev

docs:
	$(COMPOSE) --profile docs run --rm docs

image:
	docker build --target dist -t $(IMAGE):$(VERSION) .

push: image
	docker push $(IMAGE):$(VERSION)
	@if [ "$(VERSION)" != "latest" ]; then 		docker tag $(IMAGE):$(VERSION) $(IMAGE):latest; 		docker push $(IMAGE):latest; 	fi

login:
	@echo "Logging in to GitHub Container Registry…"
	@echo "$$CR_PAT" | docker login ghcr.io -u Univers42 --password-stdin

clean:
	rm -rf dist/css

fclean: clean
	rm -rf dist docs/generated
	$(COMPOSE) --profile build --profile dev --profile lint --profile lint-scss --profile lint-ts --profile typecheck --profile docs down --rmi local --volumes 2>/dev/null || true

re: fclean all

audit:
	@echo "[1/4] typecheck…"
	$(COMPOSE) --profile typecheck run --rm typecheck
	@echo "[2/4] lint (SCSS + TS)…"
	$(COMPOSE) --profile lint run --rm lint
	@echo "[3/4] format check…"
	npm run format:check
	@echo "[4/4] build…"
	$(COMPOSE) --profile build run --rm --build build
	@echo "audit passed."

audit-image:
	@echo "[1/5] build dist image…" && \
	docker build --target dist -t $(IMAGE):$(VERSION) . && \
	echo "[2/5] extract artefacts from image…" && \
	TMPDIR=$$(mktemp -d) && \
	CID=$$(docker create $(IMAGE):$(VERSION) /noop) && \
	docker cp $$CID:/dist/css/. $$TMPDIR/css/ && \
	docker rm $$CID > /dev/null && \
	echo "[3/5] verify CSS files exist and are non-empty…" && \
	( test -s $$TMPDIR/css/libcss.css     && echo "  libcss.css          OK  ($$(wc -c < $$TMPDIR/css/libcss.css) bytes)"     || (echo "  libcss.css MISSING or empty"  && exit 1) ) && \
	( test -s $$TMPDIR/css/libcss.min.css && echo "  libcss.min.css      OK  ($$(wc -c < $$TMPDIR/css/libcss.min.css) bytes)" || (echo "  libcss.min.css MISSING or empty" && exit 1) ) && \
	echo "[4/5] validate CSS content…" && \
	( grep -q ":root"  $$TMPDIR/css/libcss.css && echo "  :root tokens        OK" || (echo "  :root block missing"    && exit 1) ) && \
	( grep -q "@media" $$TMPDIR/css/libcss.css && echo "  @media queries      OK" || (echo "  @media missing"         && exit 1) ) && \
	( grep -q "var(--" $$TMPDIR/css/libcss.css && echo "  CSS custom props    OK" || (echo "  No CSS variables found" && exit 1) ) && \
	rm -rf $$TMPDIR && \
	echo "[5/5] inspect image manifest…" && \
	docker image inspect $(IMAGE):$(VERSION) \
	  --format 'Image: {{index .RepoTags 0}}  |  Created: {{.Created}}  |  Size: {{.Size}} bytes' && \
	echo "audit-image passed."

studio-install:
	cd studio && npm install

studio: studio-install
	cd studio && npm run dev

studio-build:
	cd studio && npm run build

.PHONY: all build lint lint-scss lint-ts lint-fix typecheck format dev watch docs image push login clean fclean re audit audit-image studio-install studio studio-build
