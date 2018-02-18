'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createGet;

var _Kernel = require('./Kernel');

var _Kernel2 = _interopRequireDefault(_Kernel);

var _normalizeDependencies = require('./normalizeDependencies');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createGet(kernel) {
  return function () {
    return function (dependency) {
      if (!kernel.booted) {
        throw new Error('Kernel not booted');
      }

      var container = kernel.container;

      var dep = (0, _normalizeDependencies.normalizeDependency)(dependency);

      return container.resolveDependency(dep);
    };
  };
}