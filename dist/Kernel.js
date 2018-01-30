'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Service = require('./di/Service');

var _Service2 = _interopRequireDefault(_Service);

var _ServiceContainer = require('./di/ServiceContainer');

var _ServiceContainer2 = _interopRequireDefault(_ServiceContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Kernel = function () {
  function Kernel(services) {
    _classCallCheck(this, Kernel);

    this.booted = false;

    this.services = services;
  }

  _createClass(Kernel, [{
    key: 'createServiceFromObjectDef',
    value: function createServiceFromObjectDef(name, def) {
      var dependencies = def.dependencies || [];
      dependencies = dependencies.map(function (dep) {
        if (typeof dep === 'string') {
          return { name: dep, type: 'service' };
        }
        return dep;
      });
      return new _Service2.default(name, def.tags || [], def.factory, dependencies);
    }
  }, {
    key: 'normalizeService',
    value: function normalizeService(name, def) {
      if (typeof def === 'function') {
        return new _Service2.default(name, [], def, []);
      }

      return this.createServiceFromObjectDef(name, def);
    }
  }, {
    key: 'normalizeServices',
    value: function normalizeServices() {
      var _this = this;

      return Object.keys(this.services).map(function (name) {
        return _this.normalizeService(name, _this.services[name]);
      });
    }
  }, {
    key: 'boot',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var container, normalized;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.booted) {
                  _context.next = 2;
                  break;
                }

                throw new Error('Kernel already booted');

              case 2:
                container = new _ServiceContainer2.default();
                normalized = this.normalizeServices();
                _context.next = 6;
                return container.boot(normalized);

              case 6:
                this.booted = true;
                return _context.abrupt('return', container);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function boot() {
        return _ref.apply(this, arguments);
      }

      return boot;
    }()
  }]);

  return Kernel;
}();

exports.default = Kernel;