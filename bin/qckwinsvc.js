#! /usr/bin/env node

var prompt = require('prompt')
var cli = require('optimist')
  .usage('Usage: $0\n       $0 --uninstall')
  .describe('name', 'Windows service name to install/uninstall (don\'t confuse with the display name')
  .describe('description', 'Service description')
  .describe('script', 'Path of the node script to be installed as a service')
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
        var service = new Service({
          name: name,
          description: description,
          script: script
        })
        bindEvents(service)
        service.install()
      })
    })
  })
}

function readName (callback) {
  if (argv.name) process.nextTick(function () { callback(argv.name) })
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
  if (argv.description) process.nextTick(function () { callback(null, argv.description) })
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
  if (argv.name) process.nextTick(function () { callback(null, argv.name) })
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

function bindEvents (service) {
  service.on('install', function () { console.log('Service installed') })
  service.on('alreadyInstalled', function () { console.log('Service already installed') })
  service.on('invalidInstallation', function () { console.log('Invalid service installation (installation is detected but required files are missing)') })
  service.on('uninstall', function () { console.log('Service uninstalled') })
  service.on('start', function () { console.log('Service started') })
  service.on('stop', function () { console.log('Service stopped') })
  service.on('error', function () { console.log('An error occurred') })
}

