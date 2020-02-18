"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RdsDropdown = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _RdsPresets = require("./RdsPresets");

var _RdsAbsolute = require("./RdsAbsolute");

var _Predicates = require("../utils/Predicates");

var _DateParts = require("../utils/DateParts");

var _RdsRelative = require("./RdsRelative");

var _RdsAbsoluteSingle = require("./RdsAbsoluteSingle");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RdsDropdown = function RdsDropdown(_ref) {
  var value = _ref.value,
      onDateChange = _ref.onDateChange,
      dir = _ref.dir,
      single = _ref.single,
      outerRef = _ref.outerRef;

  var _useState = (0, _react.useState)("quick"),
      _useState2 = _slicedToArray(_useState, 2),
      activeTab = _useState2[0],
      setActiveTab = _useState2[1];

  (0, _react.useEffect)(function () {
    var _ref2 = value ? value.split("|") : ["", ""],
        _ref3 = _slicedToArray(_ref2, 2),
        start = _ref3[0],
        end = _ref3[1];

    if ((0, _Predicates.isDateLike)(start)) {
      setActiveTab("absolute");
    } else if (!single && start !== _DateParts.DateParts.NOW && end !== _DateParts.DateParts.NOW && start !== end) {
      setActiveTab("relative");
    } else {
      setActiveTab("quick");
    }

    outerRef.current && outerRef.current.forceUpdate();
  }, [value]);

  var tabChanged = function tabChanged(t) {
    setActiveTab(t);
    outerRef.current && outerRef.current.forceUpdate();
  };

  return single ? _react.default.createElement(_RdsAbsoluteSingle.RdsAbsoluteSingle, {
    value: value,
    onDateChange: onDateChange,
    dir: dir
  }) : _react.default.createElement(_antd.Tabs, {
    className: ["ards-dropdown--overlay", dir].join(" "),
    activeKey: activeTab,
    onChange: tabChanged
  }, _react.default.createElement(_antd.Tabs.TabPane, {
    key: "quick",
    tab: "Quick Select"
  }, _react.default.createElement(_RdsPresets.RdsPresets, {
    value: value,
    onDateChange: onDateChange,
    dir: dir
  })), !single && _react.default.createElement(_antd.Tabs.TabPane, {
    key: "relative",
    tab: "Relative"
  }, _react.default.createElement(_RdsRelative.RdsRelative, {
    value: value,
    onDateChange: onDateChange,
    dir: dir
  })), _react.default.createElement(_antd.Tabs.TabPane, {
    key: "absolute",
    tab: "Absolute"
  }, _react.default.createElement(_RdsAbsolute.RdsAbsolute, {
    value: value,
    onDateChange: onDateChange,
    dir: dir
  })));
};

exports.RdsDropdown = RdsDropdown;