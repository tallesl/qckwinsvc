#! /usr/bin/env node

var prompt = require('prompt')
var cli = require('optimist')
  .usage('Usage: $0\n       $0 --uninstall')
  .describe('name', 'Windows service name to install/uninstall (don\'t confuse with the display name')
  .describe('description', 'Service description')
  .describe('script', 'Path of the node script to be installed as a service')
  .describe('startImmediately', 'Should the service get started immediately')
var Service = require('node-windows').Service

var argv = cli.argv

function showHelp () {
  cli.showHelp()
  process.exit()
}

function read(/* [propertyNames], callback */) {
  var properties = {
    'name': {
      description: 'Service name',
      required: true,
      pattern: /^[a-zA-Z\-]+$/,
      message: 'Name must be only letters or dashes'
    },
    'description': {
      description: 'Service description'
    },
    'script': {
      description: 'Node script path',
      required: true
    },
    'startImmediately': {
      description: 'Should the service get started immediately? (y/n)',
      before: function(value) {
        var bool = ['yes', 'y'].indexOf(value.toLowerCase()) != -1
        return bool;
      }
    }
  };

  // default to read all and expect callback as first param
  var toRead = properties;
  var callback = arguments[0];

  if (callback instanceof Array) {
    // when first param is an array of property names
    toRead = callback.reduce(function(map, propertyName) {
      map[propertyName] = properties[propertyName];
      return map;
    }, {});

    callback = arguments[1];
  }

  // in case user specifies data in cli
  prompt.override = argv;

  prompt.get({
    properties: toRead
  }, callback);
};

function bindEvents (service, properties) {
  service.on('install', function () {
    console.log('Service installed')

    if (properties.startImmediately) { service.start() }
  })
  service.on('alreadyInstalled', function () { console.log('Service already installed') })
  service.on('invalidInstallation', function () { console.log('Invalid service installation (installation is detected but required files are missing)') })
  service.on('uninstall', function () { console.log('Service uninstalled') })
  service.on('start', function () { console.log('Service started') })
  service.on('stop', function () { console.log('Service stopped') })
  service.on('error', function () { console.log('An error occurred') })
}

/*
 * RUN
 */

if (argv.h || argv.help) showHelp();

var readArgs = [
  function run(error, properties) {
    if (error) {
      throw error;
    }

    var service = new Service(properties);

    bindEvents(service, properties);

    service[argv.uninstall ? 'uninstall' : 'install']();
  }
];

if (argv.uninstall) {
  readArgs.unshift(['name', 'script']);
}

read.apply(this, readArgs);