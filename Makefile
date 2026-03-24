NAME		= libcss
COMPOSE		= docker compose

all: build

build:
	$(COMPOSE) --profile build run --rm build

dev: studio-install
	cd studio && npm run dev

watch:
	$(COMPOSE) --profile dev up dev

lint:
	$(COMPOSE) --profile lint run --rm lint

docs:
	$(COMPOSE) --profile docs run --rm docs

clean:
	rm -rf dist/css

fclean: clean
	rm -rf dist docs/generated
	$(COMPOSE) --profile build --profile dev --profile lint --profile docs down --rmi local --volumes 2>/dev/null || true

re: fclean all

studio-install:
	cd studio && npm install

studio:
	cd studio && npm run dev

studio-build:
	cd studio && npm run build

.PHONY: all build dev watch lint docs clean fclean re studio-install studio studio-build
