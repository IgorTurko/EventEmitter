/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_emitter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_emitter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_emitter__);
// Note: An example of using the Emitter module


// Subscribe to the event name "emitter.example"
__WEBPACK_IMPORTED_MODULE_0__src_emitter__["on"]('emitter.example', (...args) => {
    console.log('The event was triggered with the following argument::', args); // eslint-disable-line no-console
});

// Trigger the event name "emitter.example" with multiple arguments
__WEBPACK_IMPORTED_MODULE_0__src_emitter__["trigger"]('emitter.example', 'trigger.argument.A', 'trigger.argument.B', 'trigger.argument.C');

// Remove all subscriptions for the event name "emitter.example"
__WEBPACK_IMPORTED_MODULE_0__src_emitter__["off"]('emitter.example');

// The subscribed function is not triggered due to being removed
__WEBPACK_IMPORTED_MODULE_0__src_emitter__["trigger"]('emitter.example', 'trigger.argument.D');


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this.events = {};
    }

    _createClass(EventEmitter, [{
        key: '_addListener',
        value: function _addListener(type, listener, once) {
            if (typeof type !== 'string') {
                throw TypeError('event type must be a string');
            }
            if (typeof listener !== 'function') {
                throw TypeError('listener must be a function');
            }

            if (!this.events[type]) {
                this.events[type] = [];
            }

            this.events[type].push({
                once: once,
                fn: listener
            });

            return this.events[type].length;
        }
    }, {
        key: 'on',
        value: function on(type, listener) {
            return this._addListener(type, listener, false);
        }
    }, {
        key: 'once',
        value: function once(type, listener) {
            return this._addListener(type, listener, true);
        }
    }, {
        key: 'off',
        value: function off(type, listener) {
            if (this.events[type]) {
                var length = this.events[type].length;

                if (!listener) {
                    delete this.events[type];
                } else {
                    this.events[type] = this.events[type].filter(function (x) {
                        return x.fn !== listener;
                    });

                    if (!this.events[type].length) {
                        delete this.events[type];
                    }
                }

                return length - (this.events[type] ? this.events[type].length : 0);
            }

            return 0;
        }
    }, {
        key: 'trigger',
        value: function trigger(type) {
            var _this = this;

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            var listeners = this.events[type];

            if (listeners) {
                listeners = this.events[type].slice();

                listeners.forEach(function (listener) {
                    if (listener.once) {
                        _this.off(type, listener.fn);
                    }
                    listener.fn.apply(_this, args);
                });

                return true;
            }

            return false;
        }
    }]);

    return EventEmitter;
}();

exports.default = new EventEmitter();
// Note: The following methods should be exported for Karma tests only

// export function off() {
// }

// export function on() {
// }

// export function once() {
// }

// export function trigger() {
// }

/***/ })
/******/ ]);