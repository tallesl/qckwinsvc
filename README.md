# Quick Windows Service

Easiest way to install a node.js script as a windows service.

## About

This is just a little wrapper around [node-windows](https://github.com/coreybutler/node-windows) to install/uninstall a windows service.

For more complete usage use *node-windows* directly.

## Installing

    npm install -g qckwinsvc

## Installing your service

    > qckwinsvc
    prompt: Service name: [name for your service]
    prompt: Service description: [description for it]
    prompt: Node script path: [path of your node script]

## Uninstalling your service

    > qckwinsvc --uninstall
    prompt: Service name: [name of your service]
    prompt: Node script path: [path of your node script]
