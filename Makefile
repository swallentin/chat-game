CHATGAMEUI_JS = ./git_modules/chat-game-ui/lib/chat-game-ui.js
DATE=$(shell date +%I:%M%p)
CHECK=\033[32m✔\033[39m
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#

update:
	@echo "\n${HR}"
	@echo "Building chat-game..."
	@echo "${HR}\n"

	@cp ./git_modules/chat-game-ui/lib/chat-game-ui.js public/js/chat-game-ui.js
	@cp ./git_modules/chat-game-ui/lib/chat-game-ui.min.js public/js/chat-game-ui.min.js

	@echo "Copying javascripts...       ${CHECK} Done"
	@echo "\n${HR}"
	@echo "Chat-game successfully built at ${DATE}."
	@echo "${HR}\n"
	@echo "Thanks for using chat-game,"
	@echo "<3 @swallentin\n"