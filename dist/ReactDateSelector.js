"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactDateSelector = void 0;

var _react = _interopRequireWildcard(require("react"));

var _RdsDropdown = require("./components/RdsDropdown");

var _RdsInput = require("./components/RdsInput");

var _antd = require("antd");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ReactDateSelector = _react.default.forwardRef(function (_ref, ref) {
  var onDateChange = _ref.onDateChange,
      onVisibleChange = _ref.onVisibleChange,
      open = _ref.open,
      props = _objectWithoutProperties(_ref, ["onDateChange", "onVisibleChange", "open"]);

  var _useState = (0, _react.useState)(open),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setOpen = _useState2[1];

  (0, _react.useEffect)(function () {
    setOpen(open);
  }, [open]);

  var changeVisible = function changeVisible(v) {
    setOpen(!props.readOnly && v);

    if (!props.readOnly && onVisibleChange) {
      onVisibleChange(v);
    }
  };

  var updateValue = function updateValue(v) {
    if (onDateChange) {
      onDateChange(v);
    }

    changeVisible(false);
  };

  return _react.default.createElement(_antd.Popover, {
    trigger: "click",
    placement: "bottomLeft",
    visible: isOpen,
    onVisibleChange: changeVisible,
    overlayClassName: "ards-dropdown",
    content: _react.default.createElement(_RdsDropdown.RdsDropdown, _extends({}, props, {
      onDateChange: updateValue
    }))
  }, _react.default.createElement(_RdsInput.RdsInput, _extends({
    onClear: updateValue,
    forwardedRef: ref
  }, props)));
});

exports.ReactDateSelector = ReactDateSelector;