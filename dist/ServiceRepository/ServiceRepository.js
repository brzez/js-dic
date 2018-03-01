"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceRepository = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Dependency = require("../types/Dependency");

var _Service = require("./Service");

var _Service2 = _interopRequireDefault(_Service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServiceRepository = exports.ServiceRepository = function () {
  function ServiceRepository(definitions) {
    _classCallCheck(this, ServiceRepository);

    this.all = definitions.map(function (def) {
      return new _Service2.default(def);
    });
  }

  _createClass(ServiceRepository, [{
    key: "resolveDependency",
    value: function resolveDependency(dependency) {
      var type = dependency.type,
          name = dependency.name;


      switch (type) {
        case _Dependency.TYPE_SERVICE:
          return this.resolveService(name);
        case _Dependency.TYPE_TAG:
          return this.resolveTag(name);
      }

      throw new Error("Invalid type " + type + " for dependency [" + name + "]");
    }
  }, {
    key: "resolveService",
    value: function resolveService(name) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.all[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var service = _step.value;

          if (service.definition.name === name) {
            return service;
          }
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

      throw new Error("Service named " + name + " not found");
    }
  }, {
    key: "resolveTag",
    value: function resolveTag(name) {
      return this.all.filter(function (service) {
        return service.tags.includes(name);
      });
    }
  }]);

  return ServiceRepository;
}();