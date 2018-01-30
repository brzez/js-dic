'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Service = require('./Service');

var _Service2 = _interopRequireDefault(_Service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServiceRepository = function () {
  function ServiceRepository(services) {
    _classCallCheck(this, ServiceRepository);

    this.services = services;
  }

  _createClass(ServiceRepository, [{
    key: 'all',
    value: function all() {
      return this.services;
    }
  }, {
    key: 'findTags',
    value: function findTags(name) {
      return this.services.filter(function (service) {
        return service.tags.includes(name);
      });
    }

    // todo: rename service -> alias in Dependency

  }, {
    key: 'findAlias',
    value: function findAlias(alias) {
      var match = this.services.filter(function (service) {
        return service.name === alias;
      });
      if (match.length === 0) {
        throw new Error('Service ' + alias + ' not found');
      }
      return match;
    }
  }, {
    key: 'findDependency',
    value: function findDependency(_ref) {
      var type = _ref.type,
          name = _ref.name;

      return type === 'service' ? this.findAlias(name) : this.findTags(name);
    }
  }]);

  return ServiceRepository;
}();

exports.default = ServiceRepository;