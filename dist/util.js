"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toArray = toArray;
function toArray(e) {
  return Array.isArray(e) ? e : [e];
}