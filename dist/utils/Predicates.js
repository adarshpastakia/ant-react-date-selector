"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isString = exports.isDateLike = exports.isDate = exports.isMoment = exports.isNil = exports.isNull = exports.isUndefined = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isUndefined = function isUndefined(value) {
  return value === undefined;
};

exports.isUndefined = isUndefined;

var isNull = function isNull(value) {
  return value === null;
};

exports.isNull = isNull;

var isNil = function isNil(value) {
  return isUndefined(value) || isNull(value);
};

exports.isNil = isNil;

var isMoment = function isMoment(value) {
  return (0, _moment.default)(value).isValid();
};

exports.isMoment = isMoment;

var isDate = function isDate(value) {
  return _moment.default.isDate(value);
};

exports.isDate = isDate;

var isDateLike = function isDateLike(value) {
  if (isString(value) && !!value.match(/^\$(now|minute|hour|day|week|month|quarter|year|decade)/)) return false;
  return isMoment(value) || isDate(value);
};

exports.isDateLike = isDateLike;

var isString = function isString(value) {
  return typeof value === "string";
};

exports.isString = isString;