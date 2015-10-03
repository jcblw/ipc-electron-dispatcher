# IPC Electron Dispatcher

This is just the [flux](https://facebook.github.io/flux/docs/dispatcher.html) dispatcher wrapped with a small amount of code to allow it to speak to both the renderer process as well as the main process.

[![Build Status](https://travis-ci.org/jcblw/ipc-electron-dispatcher.svg?branch=master)](https://travis-ci.org/jcblw/ipc-electron-dispatcher)

## Install

  npm i ipc-electron-dispatcher -S

## Usage

You still need to make your own instance of the dispatcher

```javascript
// dispatcher.js
const IPCDispatcher = require('ipc-electron-dispatcher')
const dispatcher = new IPCDispatcher()

module.exports = dispatcher
```

Now you may require/register/dispatch from either the main process or the renderer process and the action should propagate to both processes

> Currently this only supports on window applications and will only speak to window after they have attempted to speak to the dispatcher first

> Since the dispatchers are in different processes they will have different data sets for registered callbacks

Patches welcome ^^ :smile:

## Contributing

Right now the only two things are `src` files are the main source file and get compiled into the `lib` dir using `npm run build`. And we use [standardjs](http://standardjs.com/), so by running `npm test` you can test if you code is compliant.
