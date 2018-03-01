"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ServiceRepository = require("./ServiceRepository/ServiceRepository");

var _resolveBootOrder = require("./resolveBootOrder");

var _resolveBootOrder2 = _interopRequireDefault(_resolveBootOrder);

var _Service = require("./ServiceRepository/Service");

var _Service2 = _interopRequireDefault(_Service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DependencyInjector = function () {
  function DependencyInjector(services) {
    _classCallCheck(this, DependencyInjector);

    this.repository = new _ServiceRepository.ServiceRepository(services);
    this.bootOrder = (0, _resolveBootOrder2.default)(this.repository);
  }

  _createClass(DependencyInjector, [{
    key: "boot",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, service, definition, dependencies, resolved;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // todo: refactor
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 3;
                _iterator = this.bootOrder[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 18;
                  break;
                }

                service = _step.value;
                definition = service.definition;
                dependencies = definition.dependencies || [];
                resolved = dependencies.map(function (dep) {
                  var resolved = _this.repository.resolveDependency(dep);
                  return Array.isArray(resolved) ? resolved.map(function (s) {
                    return s.value;
                  }) : resolved.value;
                });
                _context.t0 = service;
                _context.next = 13;
                return definition.factory.apply(definition.factory, resolved);

              case 13:
                _context.t1 = _context.sent;

                _context.t0.boot.call(_context.t0, _context.t1);

              case 15:
                _iteratorNormalCompletion = true;
                _context.next = 5;
                break;

              case 18:
                _context.next = 24;
                break;

              case 20:
                _context.prev = 20;
                _context.t2 = _context["catch"](3);
                _didIteratorError = true;
                _iteratorError = _context.t2;

              case 24:
                _context.prev = 24;
                _context.prev = 25;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 27:
                _context.prev = 27;

                if (!_didIteratorError) {
                  _context.next = 30;
                  break;
                }

                throw _iteratorError;

              case 30:
                return _context.finish(27);

              case 31:
                return _context.finish(24);

              case 32:
                return _context.abrupt("return", this.repository);

              case 33:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 20, 24, 32], [25,, 27, 31]]);
      }));

      function boot() {
        return _ref.apply(this, arguments);
      }

      return boot;
    }()
  }]);

  return DependencyInjector;
}();

exports.default = DependencyInjector;