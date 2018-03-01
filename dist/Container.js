"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ServiceRepository = require("./ServiceRepository/ServiceRepository");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Container = function () {
  function Container(repository) {
    _classCallCheck(this, Container);

    this.repository = repository;
  }

  _createClass(Container, [{
    key: "get",
    value: function get(dependency) {
      var service = this.repository.resolveDependency(dependency);

      return Array.isArray(service) ? service.map(function (s) {
        return s.value;
      }) : service.value;
    }
  }, {
    key: "inject",
    value: function inject(injectable) {
      var _this = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var factory = injectable.factory,
          dependencies = injectable.dependencies;


      var resolved = (dependencies || []).map(function (dep) {
        return _this.get(dep);
      });

      return factory.apply(thisArg, resolved);
    }
  }]);

  return Container;
}();

exports.default = Container;