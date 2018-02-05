'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createInject;

var _Kernel = require('./Kernel');

var _Kernel2 = _interopRequireDefault(_Kernel);

var _normalizeDependencies = require('./normalizeDependencies');

var _normalizeDependencies2 = _interopRequireDefault(_normalizeDependencies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createInject(kernel) {
  return function () {
    return function (method, dependencies, thisArg) {
      if (!kernel.booted) {
        throw new Error('Kernel not booted');
      }

      var container = kernel.container;

      var normalized = (0, _normalizeDependencies2.default)(dependencies);

      return method.apply(thisArg, normalized.map(function (dep) {
        return container.resolveDependency(dep);
      }));
    };
  };
}