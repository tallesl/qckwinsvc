#! /usr/bin/env node

var cli     = require('optimist')
  , prompt  = require('prompt')
  , Service = require('node-windows').Service

setupCli()

if (cli.argv.h || cli.argv.help) help()
else if (cli.argv.uninstall) uninstall()
else install()

function setupCli () {
  cli.usage('Usage: $0\n       $0 --uninstall')
     .describe('name',             'Windows service name to install/uninstall (don\'t confuse with the display name.')
     .describe('description',      'Service description.')
     .describe('script',           'Path of the node script to be installed as a service.')
     .describe('startImmediately', 'Should the service get started immediately.')
}

function help () {
  cli.showHelp()
}

function install () {
  readArgs(promptOptions(), run)
}

function uninstall () {
  var options = promptOptions()
  delete options.properties.description
  delete options.properties.startImmediately
  readArgs(options, run)
}

function promptOptions () {
  return {
    properties: {
      name: {
        description: 'Service name',
        required:    true,
        pattern:     /^[a-zA-Z\-]+$/,
        message:     'Name must be only letters or dashes'
      },
      description: {
        description: 'Service description'
      },
      script: {
        description: 'Node script path',
        required:    true
      },
      startImmediately: {
        description: 'Should the service get started immediately? (y/n)',
        before: function (value) {
          value = value.toLowerCase()
          return value === 'yes' || value === 'y'
        }
      }
    }
  }
}

function readArgs (options, callback) {
  prompt.override = cli.argv
  prompt.get(options, callback)
}

function run (err, options) {
  if (err) throw err

  var service = new Service(options)
  bindEvents(service, options)
  service[cli.argv.uninstall ? 'uninstall' : 'install']()
}

function bindEvents (service, options) {
  service.on('alreadyInstalled',    function () { console.log('Service already installed.') })
  service.on('invalidInstallation', function () { console.log('Invalid service installation (installation is detected but required files are missing).') })
  service.on('uninstall',           function () { console.log('Service uninstalled.') })
  service.on('start',               function () { console.log('Service started.') })
  service.on('stop',                function () { console.log('Service stopped.') })
  service.on('error',               function () { console.log('An error occurred.') })
  service.on('install',             function () {
                                      console.log('Service installed.')
                                      if (options.startImmediately) service.start()
                                    })
}

