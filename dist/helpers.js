'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.service = service;
exports.tag = tag;
function service(name) {
  return { type: 'service', name: name };
}

function tag(name) {
  return { type: 'tag', name: name };
}