# ![logo](asset/logo/32.png) Quick Windows Service

[![dependencies](https://david-dm.org/tallesl/qckwinsvc.png)](https://david-dm.org/tallesl/qckwinsvc)
[![devDependencies](https://david-dm.org/tallesl/qckwinsvc/dev-status.png)](https://david-dm.org/tallesl/qckwinsvc#info=devDependencies)
[![npm module](https://badge.fury.io/js/qckwinsvc.png)](http://badge.fury.io/js/qckwinsvc)

[![npm](https://nodei.co/npm/qckwinsvc.png?mini=true)](https://nodei.co/npm/qckwinsvc/)

CLI utility that installs/uninstalls a windows service.

This is a wrapper around [node-windows](https://github.com/coreybutler/node-windows).

## Installing your service

### Interactively

	> qckwinsvc
	prompt: Service name: Hello
	prompt: Service description: Greets the world
	prompt: Node script path: C:\my\folder\hello.js
	prompt: Should the service get started immediately? (y/n): y
	Service installed.
	Service started.

### Non-interactively

	> qckwinsvc --name "Hello" --description "Greets the world" --script "C:\my\folder\hello.js" --startImmediately
	Service installed.
	Service started.

## Uninstalling your service

### Interactively

	> qckwinsvc --uninstall
	prompt: Service name: Hello
	prompt: Node script path: C:\my\folder\hello.js
	Service stopped.
	Service uninstalled.


### Non-interactively

	> qckwinsvc --uninstall --name "Hello" --script "C:\my\folder\hello.js"
	Service stopped.
	Service uninstalled.
