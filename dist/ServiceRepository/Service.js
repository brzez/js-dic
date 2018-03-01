"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Service = function () {
  function Service(definition) {
    _classCallCheck(this, Service);

    this.booted = false;

    this.definition = definition;
  }

  _createClass(Service, [{
    key: "boot",
    value: function boot(value) {
      this.booted = true;
      this.value = value;
    }
  }, {
    key: "name",
    get: function get() {
      return this.definition.name;
    }
  }, {
    key: "tags",
    get: function get() {
      var tags = this.definition.tags;


      if (!tags) {
        return [];
      }

      return Array.isArray(tags) ? tags : [tags];
    }
  }]);

  return Service;
}();

exports.default = Service;