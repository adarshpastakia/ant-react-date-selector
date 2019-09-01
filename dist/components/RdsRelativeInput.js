"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RdsRelativeInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _ = require("..");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RdsRelativeInput = function RdsRelativeInput(_ref) {
  var value = _ref.value,
      onDateChange = _ref.onDateChange;

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      prefix = _useState2[0],
      setPrefix = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      duration = _useState4[0],
      setDuration = _useState4[1];

  var _useState5 = (0, _react.useState)(),
      _useState6 = _slicedToArray(_useState5, 2),
      period = _useState6[0],
      setPeriod = _useState6[1];

  var refPrefix = _react.default.createRef();

  var refDuration = _react.default.createRef();

  var refPeriod = _react.default.createRef();

  (0, _react.useEffect)(function () {
    if (!(!period && !duration && !prefix)) {
      if (!duration) {
        setDuration(1);
      } else if (!period) {
        setPeriod("$hour");
      } else if (!prefix) {
        setPrefix("last");
      } else {
        onDateChange("".concat(period).concat(prefix === "last" ? "-" : "+").concat(duration));
      }
    }
  }, [period, duration, prefix]);
  (0, _react.useEffect)(function () {
    var parts = _.DateUtil.parts(value);

    if (parts && parts.diff) {
      var part = parts.part,
          diff = parts.diff;

      var _duration = parseInt(diff, 10);

      setPeriod(part);
      setPrefix(_duration < 0 ? "last" : "next");
      setDuration(Math.abs(_duration));
    }
  }, [value]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_antd.Select, {
    onChange: function onChange(e) {
      return setPrefix(e);
    },
    value: prefix,
    ref: refPrefix,
    style: {
      width: 120
    }
  }, _react.default.createElement(_antd.Select.Option, {
    value: "last"
  }, "Last"), _react.default.createElement(_antd.Select.Option, {
    value: "next"
  }, "Next")), _react.default.createElement(_antd.InputNumber, {
    min: 1,
    onChange: setDuration,
    value: duration,
    ref: refDuration,
    style: {
      width: 80
    }
  }), _react.default.createElement(_antd.Select, {
    onChange: function onChange(e) {
      return setPeriod(e);
    },
    value: period,
    ref: refPeriod,
    style: {
      width: 120
    }
  }, _react.default.createElement(_antd.Select.Option, {
    value: "$minute"
  }, "Minute"), _react.default.createElement(_antd.Select.Option, {
    value: "$hour"
  }, "Hour"), _react.default.createElement(_antd.Select.Option, {
    value: "$day"
  }, "Day"), _react.default.createElement(_antd.Select.Option, {
    value: "$week"
  }, "Week"), _react.default.createElement(_antd.Select.Option, {
    value: "$month"
  }, "Month"), _react.default.createElement(_antd.Select.Option, {
    value: "$quarter"
  }, "Quarter"), _react.default.createElement(_antd.Select.Option, {
    value: "$year"
  }, "Year")));
};

exports.RdsRelativeInput = RdsRelativeInput;