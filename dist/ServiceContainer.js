'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Container2 = require('./Container');

var _Container3 = _interopRequireDefault(_Container2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ServiceContainer = function (_Container) {
  _inherits(ServiceContainer, _Container);

  function ServiceContainer() {
    _classCallCheck(this, ServiceContainer);

    return _possibleConstructorReturn(this, (ServiceContainer.__proto__ || Object.getPrototypeOf(ServiceContainer)).call(this));
  }

  _createClass(ServiceContainer, [{
    key: 'boot',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(services) {
        var _this2 = this;

        var dependencyStack, bootService, alias;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                dependencyStack = {};

                bootService = function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(alias) {
                    var bootable, dependencies, notBooted, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, dependency, instance;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            dependencyStack[alias] = true;

                            bootable = services[alias];
                            dependencies = services[alias].dependencies;
                            // 1. get unregistered deps

                            notBooted = dependencies.filter(function (dep) {
                              return !_this2.exists(dep);
                            });
                            // 2. boot them

                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 7;
                            _iterator = notBooted[Symbol.iterator]();

                          case 9:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                              _context.next = 19;
                              break;
                            }

                            dependency = _step.value;

                            if (!(dependency in dependencyStack)) {
                              _context.next = 13;
                              break;
                            }

                            throw new Error('Circular dependency detected (resolving ' + dependency + ' from ' + alias + ')');

                          case 13:
                            _context.next = 15;
                            return bootService(dependency);

                          case 15:

                            delete dependencyStack[dependency];

                          case 16:
                            _iteratorNormalCompletion = true;
                            _context.next = 9;
                            break;

                          case 19:
                            _context.next = 25;
                            break;

                          case 21:
                            _context.prev = 21;
                            _context.t0 = _context['catch'](7);
                            _didIteratorError = true;
                            _iteratorError = _context.t0;

                          case 25:
                            _context.prev = 25;
                            _context.prev = 26;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                              _iterator.return();
                            }

                          case 28:
                            _context.prev = 28;

                            if (!_didIteratorError) {
                              _context.next = 31;
                              break;
                            }

                            throw _iteratorError;

                          case 31:
                            return _context.finish(28);

                          case 32:
                            return _context.finish(25);

                          case 33:
                            if (!_this2.exists(alias)) {
                              _context.next = 35;
                              break;
                            }

                            return _context.abrupt('return');

                          case 35:
                            _context.next = 37;
                            return _this2.inject(bootable);

                          case 37:
                            instance = _context.sent;

                            // 4. register it
                            _this2.items[alias] = instance;

                          case 39:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this2, [[7, 21, 25, 33], [26,, 28, 32]]);
                  }));

                  return function bootService(_x2) {
                    return _ref2.apply(this, arguments);
                  };
                }();

                _context2.t0 = regeneratorRuntime.keys(services);

              case 3:
                if ((_context2.t1 = _context2.t0()).done) {
                  _context2.next = 9;
                  break;
                }

                alias = _context2.t1.value;
                _context2.next = 7;
                return bootService(alias);

              case 7:
                _context2.next = 3;
                break;

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function boot(_x) {
        return _ref.apply(this, arguments);
      }

      return boot;
    }()
  }, {
    key: 'inject',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref4) {
        var _this3 = this;

        var factory = _ref4.factory,
            dependencies = _ref4.dependencies;
        var resolvedServices;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // resolve dependencies
                resolvedServices = (dependencies || []).map(function (alias) {
                  if (_this3.exists(alias)) {
                    return _this3.get(alias);
                  }
                  throw new Error('Service [' + alias + '] is not registered');
                });
                _context3.next = 3;
                return factory.apply(undefined, resolvedServices);

              case 3:
                return _context3.abrupt('return', _context3.sent);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function inject(_x3) {
        return _ref3.apply(this, arguments);
      }

      return inject;
    }()
  }]);

  return ServiceContainer;
}(_Container3.default);

exports.default = ServiceContainer;