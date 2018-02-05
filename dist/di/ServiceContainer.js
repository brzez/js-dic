'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Service = require('./Service');

var _Service2 = _interopRequireDefault(_Service);

var _DependencyInjector = require('./DependencyInjector');

var _DependencyInjector2 = _interopRequireDefault(_DependencyInjector);

var _ServiceRepository = require('./ServiceRepository');

var _ServiceRepository2 = _interopRequireDefault(_ServiceRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServiceContainer = function () {
  function ServiceContainer() {
    _classCallCheck(this, ServiceContainer);
  }

  _createClass(ServiceContainer, [{
    key: 'boot',

    // todo: move services to ctor
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(services) {
        var di;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.services = new _ServiceRepository2.default(services);
                di = new _DependencyInjector2.default(services);
                _context.next = 4;
                return di.boot();

              case 4:
                return _context.abrupt('return', _context.sent);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function boot(_x) {
        return _ref.apply(this, arguments);
      }

      return boot;
    }()
  }, {
    key: 'service',
    value: function service(name) {
      return this.services.findAlias(name)[0].value;
    }
  }, {
    key: 'tags',
    value: function tags(name) {
      return this.services.findTags(name).map(function (s) {
        return s.value;
      });
    }
  }, {
    key: 'resolveDependency',
    value: function resolveDependency(dep) {
      return this.services.findDependency(dep).map(function (s) {
        return s.value;
      });
    }
  }]);

  return ServiceContainer;
}();

exports.default = ServiceContainer;