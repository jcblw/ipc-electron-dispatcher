# IPC Electron Dispatcher

This is just the [flux](https://facebook.github.io/flux/docs/dispatcher.html) wrapped with a small amount of code to allow it to speak to both the renderer process as well as the main process.

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
