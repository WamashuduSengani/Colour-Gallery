LSOF = $(shell lsof -t -i :5000)

kill:
	kill -9 $(LSOF)
