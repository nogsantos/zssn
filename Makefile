all: init.web

init.web:
	@echo "Initializing, just a moment..."
	@git clone git@github.com:nogsantos/zssn.git
	@git flow init
	@npm install && node_modules/.bin/r.js -o rbuild.js
	@npm run dev
