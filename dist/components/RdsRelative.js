"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RdsRelative = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _ = require("..");

var _RdsRelativeInput = require("./RdsRelativeInput");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RdsRelative = function RdsRelative(_ref) {
  var value = _ref.value,
      onDateChange = _ref.onDateChange;

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      isErrored = _useState2[0],
      setErrored = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      start = _useState4[0],
      setStart = _useState4[1];

  var _useState5 = (0, _react.useState)(),
      _useState6 = _slicedToArray(_useState5, 2),
      end = _useState6[0],
      setEnd = _useState6[1];

  (0, _react.useEffect)(function () {
    var _ref2 = value ? value.split("|") : ["", ""],
        _ref3 = _slicedToArray(_ref2, 2),
        start = _ref3[0],
        end = _ref3[1];

    setStart(start);
    setEnd(end);
  }, [value]);

  var onApply = function onApply() {
    if (start && end) {
      var dtStart = _.DateUtil.parse(start);

      var dtEnd = _.DateUtil.parse(end);

      if ((0, _moment.default)(dtStart.toString()).isAfter((0, _moment.default)(dtEnd.toString()))) {
        setErrored(true);
      } else {
        onDateChange("".concat(start, "|").concat(end));
      }
    }
  };

  return _react.default.createElement("div", null, _react.default.createElement("div", {
    style: {
      padding: 16
    }
  }, _react.default.createElement("div", {
    className: "ards-label--section"
  }, "From"), _react.default.createElement(_antd.Input.Group, {
    compact: true
  }, _react.default.createElement(_RdsRelativeInput.RdsRelativeInput, {
    value: start,
    onDateChange: setStart
  })), _react.default.createElement("br", null), _react.default.createElement("div", {
    className: "ards-label--section"
  }, "To"), _react.default.createElement(_antd.Input.Group, {
    compact: true
  }, _react.default.createElement(_RdsRelativeInput.RdsRelativeInput, {
    value: end,
    onDateChange: setEnd
  })), isErrored && _react.default.createElement("div", {
    className: "ards-label--error"
  }, "Invalid date ranges")), _react.default.createElement("div", {
    className: "ards-toolbar"
  }, _react.default.createElement(_antd.Button, {
    type: "primary",
    onClick: onApply,
    size: "small"
  }, "Apply")));
};

exports.RdsRelative = RdsRelative;