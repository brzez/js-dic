'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Service = require('./Service');

var _Service2 = _interopRequireDefault(_Service);

var _ServiceRepository = require('./ServiceRepository');

var _ServiceRepository2 = _interopRequireDefault(_ServiceRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DependencyInjector = function () {
  function DependencyInjector(services) {
    _classCallCheck(this, DependencyInjector);

    this.services = new _ServiceRepository2.default(services);
  }

  _createClass(DependencyInjector, [{
    key: 'boot',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Promise.all(this.services.all().map(function (service) {
                  return _this.inject(service);
                }));

              case 2:
                return _context.abrupt('return', this.services.all());

              case 3:
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
  }, {
    key: 'resolveDependency',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dependency, chain) {
        var _this2 = this;

        var services, values;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                services = this.services.findDependency(dependency);
                // ensure deps are booted

                _context2.next = 3;
                return Promise.all(services.map(function (s) {
                  return _this2.inject(s, chain.slice());
                }));

              case 3:
                // get value for each service
                values = services.map(function (s) {
                  return s.value;
                });

                // ensure proper type - i.e. array for tags

                return _context2.abrupt('return', dependency.type === 'service' ? values[0] : values);

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function resolveDependency(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return resolveDependency;
    }()
  }, {
    key: 'resolveDependencies',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dependencies, chain) {
        var resolved, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, dependency;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                resolved = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context3.prev = 4;
                _iterator = dependencies[Symbol.iterator]();

              case 6:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context3.next = 16;
                  break;
                }

                dependency = _step.value;
                _context3.t0 = resolved;
                _context3.next = 11;
                return this.resolveDependency(dependency, chain);

              case 11:
                _context3.t1 = _context3.sent;

                _context3.t0.push.call(_context3.t0, _context3.t1);

              case 13:
                _iteratorNormalCompletion = true;
                _context3.next = 6;
                break;

              case 16:
                _context3.next = 22;
                break;

              case 18:
                _context3.prev = 18;
                _context3.t2 = _context3['catch'](4);
                _didIteratorError = true;
                _iteratorError = _context3.t2;

              case 22:
                _context3.prev = 22;
                _context3.prev = 23;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 25:
                _context3.prev = 25;

                if (!_didIteratorError) {
                  _context3.next = 28;
                  break;
                }

                throw _iteratorError;

              case 28:
                return _context3.finish(25);

              case 29:
                return _context3.finish(22);

              case 30:
                return _context3.abrupt('return', resolved);

              case 31:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 18, 22, 30], [23,, 25, 29]]);
      }));

      function resolveDependencies(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return resolveDependencies;
    }()
  }, {
    key: 'inject',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(service) {
        var chain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var name, dependencies, value;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!service.isReady()) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return');

              case 2:
                name = service.name;

                if (!chain.includes(name)) {
                  _context4.next = 5;
                  break;
                }

                throw new Error('Circular dependency detected. Dependency chain: [' + chain.join(',') + ']');

              case 5:

                chain.push(name);

                _context4.next = 8;
                return this.resolveDependencies(service.dependencies, chain);

              case 8:
                dependencies = _context4.sent;
                _context4.next = 11;
                return service.factory.apply(null, dependencies);

              case 11:
                value = _context4.sent;


                service.boot(value);

              case 13:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function inject(_x5) {
        return _ref4.apply(this, arguments);
      }

      return inject;
    }()
  }]);

  return DependencyInjector;
}();

exports.default = DependencyInjector;