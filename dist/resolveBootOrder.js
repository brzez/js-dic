"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveBootOrder;

var _ServiceRepository = require("./ServiceRepository/ServiceRepository");

var _Service = require("./ServiceRepository/Service");

var _Service2 = _interopRequireDefault(_Service);

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveBootChain(service, repository) {
  var chain = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var dependencies = service.definition.dependencies || [];

  var resolved = [];

  if (chain.includes(service)) {
    throw new Error("Circular dependency detected.\n" + JSON.stringify(service, null, 2));
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = dependencies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var dependency = _step.value;

      var _dependencies = repository.resolveDependency(dependency);
      (0, _util.toArray)(_dependencies).forEach(function (def) {
        resolved.push.apply(resolved, resolveBootChain(def, repository, [service]));
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  resolved.push(service);
  return resolved;
}

function removeDuplicates(definitions) {
  return definitions.filter(function (dep, index, definitions) {
    return definitions.indexOf(dep) === index;
  });
}

function resolveBootOrder(repository) {
  var resolved = [];

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = repository.all[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var service = _step2.value;

      resolved.push.apply(resolved, resolveBootChain(service, repository));
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return removeDuplicates(resolved);
}