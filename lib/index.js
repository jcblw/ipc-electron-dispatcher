'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('flux');

var Dispatcher = _require.Dispatcher;

var ipc = require('ipc');
var isRenderer = require('is-electron-renderer');
var processAction = 'main:action';
var externalAction = 'renderer:action';
var ogDispatch = Dispatcher.prototype.dispatch;

// this allows our dispatcher to talk through differnt processes
if (isRenderer) {
  processAction = 'renderer:action';
  externalAction = 'main:action';
}

var IPCDispatcher = (function (_Dispatcher) {
  _inherits(IPCDispatcher, _Dispatcher);

  function IPCDispatcher() {
    var _this = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, IPCDispatcher);

    _get(Object.getPrototypeOf(IPCDispatcher.prototype), 'constructor', this).call(this);
    this.prefix = options.prefix || '';
    this.senders = [ipc];
    ipc.on('' + this.prefix + processAction, function (event, action) {
      if (!isRenderer) {
        _this.sender = [event.sender];
      } else {
        action = event;
      }
      _this.dispatch(action);
    });
  }

  _createClass(IPCDispatcher, [{
    key: 'dispatch',
    value: function dispatch() {
      var _this2 = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var action = args[0];

      ogDispatch.call.apply(ogDispatch, [this].concat(args)); // send it to local functions first

      if (!action._isTransfered) {
        action._isTransfered = true;
        this.senders.forEach(function (sender) {
          sender.send('' + _this2.prefix + externalAction, action);
        });
      }
    }
  }]);

  return IPCDispatcher;
})(Dispatcher);

module.exports = IPCDispatcher;
module.exports.IPCDispatcher = IPCDispatcher;