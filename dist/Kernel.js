"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Container = require("./Container");

var _Container2 = _interopRequireDefault(_Container);

var _DependencyInjector = require("./DependencyInjector");

var _DependencyInjector2 = _interopRequireDefault(_DependencyInjector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Kernel = function () {
  function Kernel(services) {
    var applyInternals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, Kernel);

    this.readyCallbacks = [];

    this.services = services;

    if (applyInternals) {
      this.applyInternals();
    }
  }

  _createClass(Kernel, [{
    key: "applyInternals",
    value: function applyInternals() {
      var _this = this;

      this.services.push({
        name: '$ready',
        factory: function factory() {
          return function (callback) {
            _this.readyCallbacks.push(callback);
          };
        }
      });
    }
  }, {
    key: "boot",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var di, repository, container;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                di = new _DependencyInjector2.default(this.services);
                _context.next = 3;
                return di.boot();

              case 3:
                repository = _context.sent;
                container = new _Container2.default(repository);


                this.readyCallbacks.forEach(function (callback) {
                  return callback(container);
                });

                return _context.abrupt("return", container);

              case 7:
              case "end":
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