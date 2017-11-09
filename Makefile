all: init.web

init.web:
	@echo "Initializing, just a moment..."
	@git flow init -d
	@npm install && node_modules/.bin/r.js -o rbuild.js
	@npm run dev
