'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeDependency = normalizeDependency;
exports.default = normalizeDependencies;
function normalizeDependency(dependency) {
  if (typeof dependency === 'string') {
    return { name: dependency, type: 'service' };
  }
  return dependency;
}
function normalizeDependencies(dependencies) {
  dependencies = dependencies || [];

  return dependencies.map(normalizeDependency);
}