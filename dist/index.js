'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Kernel = require('./Kernel');

var _Kernel2 = _interopRequireDefault(_Kernel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(services) {
    var kernel;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            kernel = new _Kernel2.default(services);
            _context.next = 3;
            return kernel.boot();

          case 3:
            return _context.abrupt('return', _context.sent);

          case 4:
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
}();