'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ServiceContainer = require('./ServiceContainer');

var _ServiceContainer2 = _interopRequireDefault(_ServiceContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Service = function () {
  function Service(name, tags, factory, dependencies) {
    _classCallCheck(this, Service);

    this.ready = false;

    this.name = name;
    this.tags = tags;
    this.factory = factory;
    this.dependencies = dependencies;
  }

  _createClass(Service, [{
    key: 'isReady',
    value: function isReady() {
      return this.ready;
    }
  }, {
    key: 'boot',
    value: function boot(value) {
      this.ready = true;
      this.value = value;
    }
  }]);

  return Service;
}();

exports.default = Service;