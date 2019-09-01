"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = void 0;
var TypeColors = {
  info: "color: #2B95D6;font-weight:bold;",
  debug: "color: #5C7080;font-weight:bold;",
  error: "color: #F55656;font-weight:bold;",
  warning: "color: #F29D49;font-weight:bold;"
};
var TagColors = {
  info: "color: #106BA3;",
  debug: "color: #394B59;",
  error: "color: #C23030;",
  warning: "color: #BF7326;"
};
var Logger = {
  debug: function debug(msg) {
    var _console;

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    (_console = console).debug.apply(_console, ["%cDEBUG::%c".concat(msg, "\n"), TypeColors.debug, TagColors.debug].concat(rest));
  },
  info: function info(msg) {
    var _console2;

    for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      rest[_key2 - 1] = arguments[_key2];
    }

    (_console2 = console).info.apply(_console2, ["%cINFO::%c".concat(msg, "\n"), TypeColors.info, TagColors.info].concat(rest));
  },
  error: function error(msg) {
    var _console3;

    for (var _len3 = arguments.length, rest = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      rest[_key3 - 1] = arguments[_key3];
    }

    (_console3 = console).error.apply(_console3, ["%cERROR::%c".concat(msg, "\n"), TypeColors.error, TagColors.error].concat(rest));
  },
  warning: function warning(msg) {
    var _console4;

    for (var _len4 = arguments.length, rest = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      rest[_key4 - 1] = arguments[_key4];
    }

    (_console4 = console).warn.apply(_console4, ["%cWARNING::%c".concat(msg, "\n"), TypeColors.warning, TagColors.warning].concat(rest));
  }
};
exports.Logger = Logger;