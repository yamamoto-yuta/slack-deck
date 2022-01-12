.PHONY: i
i:
	docker-compose run --rm slackdeck sh -c "cd slackdeck/ && npm i"

.PHONY: dev
dev:
	docker-compose run --rm slackdeck sh -c "cd slackdeck/ && npm run dev"

.PHONY: build
build:
	docker-compose run --rm slackdeck sh -c "cd slackdeck/ && npm run build"

.PHONY: all
all:
	docker-compose run --rm slackdeck sh -c "cd slackdeck/ && npm i && npm run dev && npm run build"