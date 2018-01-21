'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ServiceContainer = require('./ServiceContainer');

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
    key: 'normalizeInjectable',
    value: function normalizeInjectable(service) {
      if (typeof service === 'function') {
        return { factory: service, dependencies: [] };
      }
      return service;
    }
  }, {
    key: 'createServiceContainer',
    value: function createServiceContainer() {
      return new _ServiceContainer2.default();
    }
  }, {
    key: 'boot',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var normalized, container;
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

                this.booted = true;

                normalized = {};


                Object.keys(this.services).forEach(function (alias) {
                  normalized[alias] = _this.normalizeInjectable(_this.services[alias]);
                });

                container = this.createServiceContainer();
                _context.next = 8;
                return container.boot(normalized);

              case 8:
                return _context.abrupt('return', container);

              case 9:
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