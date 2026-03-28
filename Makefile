NAME		= libcss
COMPOSE		= docker compose
IMAGE		= ghcr.io/univers42/libcss
VERSION		?= latest

all: build

build:
	$(COMPOSE) --profile build run --rm --build build

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

studio-install:
	cd studio && npm install

studio: studio-install
	cd studio && npm run dev

studio-build:
	cd studio && npm run build

.PHONY: all build lint lint-scss lint-ts lint-fix typecheck format dev watch docs image push login clean fclean re audit studio-install studio studio-build
