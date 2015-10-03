'use strict'
const {Dispatcher} = require('flux')
const ipc = require('ipc')
const isRenderer = require('is-electron-renderer')
let processAction = 'main:action'
let externalAction = 'renderer:action'
const ogDispatch = Dispatcher.prototype.dispatch

// this allows our dispatcher to talk through differnt processes
if (isRenderer) {
  processAction = 'renderer:action'
  externalAction = 'main:action'
}

class IPCDispatcher extends Dispatcher {
  constructor (options = {}) {
    super()
    this.prefix = options.prefix || ''
    this.senders = [ipc]
    ipc.on(`${this.prefix}${processAction}`, (event, action) => {
      if (!isRenderer) {
        this.sender = [event.sender]
      } else {
        action = event
      }
      this.dispatch(action)
    })
  }

  dispatch (...args) {
    const [action] = args
    ogDispatch.call(this, ...args) // send it to local functions first

    if (!action._isTransfered) {
      action._isTransfered = true
      this.senders.forEach((sender) => {
        sender.send(`${this.prefix}${externalAction}`, action)
      })
    }
  }
}

module.exports = IPCDispatcher
module.exports.IPCDispatcher = IPCDispatcher
