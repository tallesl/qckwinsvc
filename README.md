# ![logo](asset/logo/32.png) Quick Windows Service

[![dependencies](https://david-dm.org/tallesl/qckwinsvc.png)](https://david-dm.org/tallesl/qckwinsvc)
[![devDependencies](https://david-dm.org/tallesl/qckwinsvc/dev-status.png)](https://david-dm.org/tallesl/qckwinsvc#info=devDependencies)
[![npm module](https://badge.fury.io/js/qckwinsvc.png)](http://badge.fury.io/js/qckwinsvc)

[![npm](https://nodei.co/npm/qckwinsvc.png?mini=true)](https://nodei.co/npm/qckwinsvc/)

A wrapper around [node-windows](https://github.com/coreybutler/node-windows) to install/uninstall a windows service.  
For a complete usage, use *node-windows* directly.

## Installing

```
npm install -g qckwinsvc
```

## Installing your service

```
> qckwinsvc
prompt: Service name: [name for your service]
prompt: Service description: [description for it]
prompt: Node script path: [path of your node script]
prompt: Should the service get started immediately? (y/n): [yes or y to start the service]
Service installed
[Service started]
```

#### Faster way to install
```
> qckwinsvc --name "[name for your service]" --description "[description for it]" --script [path of your node script] --startImmediately
```

## Uninstalling your service

```
> qckwinsvc --uninstall
prompt: Service name: [name of your service]
prompt: Node script path: [path of your node script]
Service stopped
Service uninstalled
```

