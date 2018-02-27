'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serviceReference = serviceReference;
exports.tagReference = tagReference;
function serviceReference(name) {
  return { name: name, type: 'service' };
}

function tagReference(name) {
  return { name: name, type: 'tag' };
}