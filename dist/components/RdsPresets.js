"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RdsPresets = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _ = require("..");

var _RdsRelativeInput = require("./RdsRelativeInput");

var _DateParts = require("../utils/DateParts");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Presets = {
  dayThis: "$day",
  weekThis: "$week",
  monthThis: "$month",
  quarterThis: "$quarter",
  yearThis: "$year",
  dayLast: "$day-1",
  weekLast: "$week-1",
  monthLast: "$month-1",
  quarterLast: "$quarter-1",
  yearLast: "$year-1"
};

var RdsPresets = function RdsPresets(_ref) {
  var value = _ref.value,
      onDateChange = _ref.onDateChange;

  var selectPreset = function selectPreset(preset) {
    onDateChange("".concat(preset, "|").concat(preset));
  };

  var selectRelative = function selectRelative() {
    if (relDate) {
      onDateChange(relDate.includes("+") ? "".concat(_DateParts.DateParts.NOW, "|").concat(relDate) : "".concat(relDate, "|").concat(_DateParts.DateParts.NOW));
    }
  };

  var _useState = (0, _react.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      relDate = _useState2[0],
      setRelDate = _useState2[1];

  (0, _react.useEffect)(function () {
    var _ref2 = value ? value.split("|") : [undefined, undefined],
        _ref3 = _slicedToArray(_ref2, 2),
        start = _ref3[0],
        end = _ref3[1];

    setRelDate(end === _DateParts.DateParts.NOW ? start : start === _DateParts.DateParts.NOW ? end : undefined);
  }, [value]);
  return _react.default.createElement("div", {
    style: {
      padding: 16
    }
  }, _react.default.createElement("div", {
    className: "ards-label--section"
  }, "Quick Select"), _react.default.createElement(_antd.Input.Group, {
    compact: true
  }, _react.default.createElement(_RdsRelativeInput.RdsRelativeInput, {
    value: relDate,
    onDateChange: setRelDate
  }), _react.default.createElement(_antd.Button, {
    type: "primary",
    onClick: selectRelative,
    style: {
      width: 80,
      padding: 0
    }
  }, "Apply")), _react.default.createElement(_antd.Divider, {
    type: "horizontal"
  }), _react.default.createElement("div", {
    className: "ards-label--section"
  }, "Presets"), _react.default.createElement("div", null, Object.keys(Presets).map(function (key) {
    return _react.default.createElement("div", {
      className: "ards-quick--link",
      key: key
    }, _react.default.createElement("a", {
      onClick: function onClick() {
        return selectPreset(Presets[key]);
      }
    }, _.DateUtil.label(Presets[key])));
  })));
};

exports.RdsPresets = RdsPresets;