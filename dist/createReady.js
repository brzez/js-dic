"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createReady;

var _Kernel = require("./Kernel");

var _Kernel2 = _interopRequireDefault(_Kernel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createReady(kernel) {
  return function () {
    return function (callback) {
      kernel.readyListeners.push(callback);
    };
  };
}