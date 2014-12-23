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

if (argv.h || argv.help) showHelp()
if (argv.uninstall) {
  readName(function (name) {
    readScript(function (script) {
      var service = new Service({
        name: name,
        script: script
      })
      bindEvents(service)
      service.uninstall()
    })
  })
} else {
  readName(function (name) {
    readDescription(function (description) {
      readScript(function (script) {
        readStartImmediately(function(startImmediately) {
          var service = new Service({
            name: name,
            description: description,
            script: script
          })
          bindEvents(service, startImmediately)
          service.install()
        })
      })
    })
  })
}

function readName (callback) {
  if (argv.name) return process.nextTick(function () { callback(argv.name) })
  prompt.get(
    {
      name: 'name',
      description: 'Service name',
      required: true,
      pattern: /^[a-zA-Z\-]+$/
    },
    function (err, result) {
      if (err) throw err
      else callback(result.name)
    }
  )
}

function readDescription (callback) {
  if (argv.description) return process.nextTick(function () { callback(argv.description) })
  prompt.get(
    {
      name: 'description',
      description: 'Service description'
    },
    function (err, result) {
      if (err) throw err
      else callback(result.description)
    }
  )
}

function readScript (callback) {
  if (argv.script) return process.nextTick(function () { callback(argv.script) })
  prompt.get(
    {
      name: 'script',
      description: 'Node script path',
      required: true
    },
    function (err, result) {
      if (err) throw err
      else callback(result.script)
    }
  )
}

function readStartImmediately (callback) {
  if (argv.startImmediately) return process.nextTick(function () { callback(argv.startImmediately) })
  prompt.get(
    {
      name: 'startImmediately',
      description: 'Should the service get started immediately? (y/n)'
    },
    function (err, result) {
      if (err) throw err
      else {
        var startImmediately = ['yes', 'y'].indexOf(result.startImmediately.toLowerCase()) != -1

        callback(startImmediately)
      }
    }
  )
}

function bindEvents (service, startImmediately) {
  service.on('install', function () {
    console.log('Service installed')

    if (startImmediately) { service.start() }
  })
  service.on('alreadyInstalled', function () { console.log('Service already installed') })
  service.on('invalidInstallation', function () { console.log('Invalid service installation (installation is detected but required files are missing)') })
  service.on('uninstall', function () { console.log('Service uninstalled') })
  service.on('start', function () { console.log('Service started') })
  service.on('stop', function () { console.log('Service stopped') })
  service.on('error', function () { console.log('An error occurred') })
}

