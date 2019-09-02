"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RdsInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ = require("..");

var _antd = require("antd");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var RdsInput = function RdsInput(_ref) {
  var value = _ref.value,
      disabled = _ref.disabled,
      readOnly = _ref.readOnly,
      allowClear = _ref.allowClear,
      onClear = _ref.onClear,
      forwardedRef = _ref.forwardedRef,
      props = _objectWithoutProperties(_ref, ["value", "disabled", "readOnly", "allowClear", "onClear", "forwardedRef"]);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOver = _useState2[0],
      setIsOver = _useState2[1];

  var displayLabel = (0, _react.useMemo)(function () {
    return _.DateUtil.label(value);
  }, [value]);
  var canClear = allowClear && !!value;
  return _react.default.createElement(_antd.Input, _extends({
    ref: forwardedRef,
    readOnly: true,
    disabled: disabled,
    value: displayLabel || ""
  }, props, {
    onMouseOver: function onMouseOver() {
      return setIsOver(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setIsOver(false);
    },
    suffix: _react.default.createElement("div", {
      onMouseOver: function onMouseOver() {
        return setIsOver(true);
      }
    }, _react.default.createElement(_antd.Icon, {
      style: {
        color: "rgba(0,0,0,.4)",
        pointerEvents: isOver && canClear ? "all" : "none"
      },
      onClick: function onClick() {
        return onClear();
      },
      type: isOver && canClear ? "close-circle" : "calendar",
      theme: isOver && canClear ? "filled" : "outlined"
    })),
    onChange: function onChange(v) {
      return console.log(v);
    }
  }));
};

exports.RdsInput = RdsInput;