# STDWebSocket


## What does it do? 

It allows you to redirect a process's standard output and error stream to a websocket. See Usages section for more clarifications.

## Installation

The tool can be installed using node packaga manager aka npm. 


	npm install -g stdwebsocket
	
## Usages

	stdwebsocket <command> 
	
Then navigate to `http://localhost:1337` to browse the output. 

Here's a sample Python script that prints up to 99. Save it as `test.py` and then run: 

	stdwebsocket python test.py


__test.py__ 

```
i = 0
while i < 100:
    print i
    i += 1
```

When you browse `http://localhost:1337`, the code will be executed and you will see the output inside your webbrowser. 

View the source of the webpage at `http://localhost:1337` for more details on how it works. 