DATE=$(shell date +%I:%M%p)
CHECK=\033[32m✔\033[39m
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#

update:
	@echo "\n${HR}"
	@echo "Building chat-game..."
	@echo "${HR}\n"

	@cp -r ./assets/chat-game-ui/lib/ ./public/js/chat-game-ui

	@echo "Copying javascripts...       ${CHECK} Done"
	@echo "\n${HR}"
	@echo "Chat-game successfully built at ${DATE}."
	@echo "${HR}\n"
	@echo "Thanks for using chat-game,"
	@echo "<3 @swallentin\n"