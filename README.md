# ![logo/60.pnglogo](logo/32.png) Quick Windows Service

[![dependencies](https://david-dm.org/tallesl/qckwinsvc.png)](https://david-dm.org/tallesl/qckwinsvc)
[![devDependencies](https://david-dm.org/tallesl/qckwinsvc/dev-status.png)](https://david-dm.org/tallesl/qckwinsvc#info=devDependencies)
[![npm module](https://badge.fury.io/js/qckwinsvc.png)](http://badge.fury.io/js/qckwinsvc)

[![npm](https://nodei.co/npm/qckwinsvc.png?mini=true)](https://nodei.co/npm/qckwinsvc/)

Easiest way to install a node.js script as a windows service.

## About

This is just a little wrapper around [node-windows](https://github.com/coreybutler/node-windows) to install/uninstall a windows service.

For a more complete usage, use *node-windows* directly.

## Installing

    npm install -g qckwinsvc

## Installing your service

    > qckwinsvc
    prompt: Service name: [name for your service]
    prompt: Service description: [description for it]
    prompt: Node script path: [path of your node script]
    Service installed

## Uninstalling your service

    > qckwinsvc --uninstall
    prompt: Service name: [name of your service]
    prompt: Node script path: [path of your node script]
    Service stopped
    Service uninstalled
