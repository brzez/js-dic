'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizeDependencies;
function normalizeDependencies(dependencies) {
  dependencies = dependencies || [];

  return dependencies.map(function (dep) {
    if (typeof dep === 'string') {
      return { name: dep, type: 'service' };
    }
    return dep;
  });
}