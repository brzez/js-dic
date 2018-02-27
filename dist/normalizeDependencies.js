'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeDependency = normalizeDependency;
exports.default = normalizeDependencies;

var _Dependency = require('./di/Dependency');

function normalizeDependency(dependency) {
  if (typeof dependency === 'string') {
    return (0, _Dependency.serviceReference)(dependency);
  }
  return dependency;
}

function normalizeDependencies(dependencies) {
  dependencies = dependencies || [];

  return dependencies.map(normalizeDependency);
}