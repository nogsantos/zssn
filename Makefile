all: init.web

init.web:
	@echo "Initializing, just a moment..."
#	@git clone ...
	@npm install && node_modules/.bin/r.js -o rbuild.js
