"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RdsAbsolute = void 0;

var _react = _interopRequireDefault(require("react"));

var _RangeCalendar = _interopRequireDefault(require("rc-calendar/lib/RangeCalendar"));

var _Panel = _interopRequireDefault(require("rc-time-picker/lib/Panel"));

var _moment = _interopRequireDefault(require("moment"));

var _antd = require("antd");

var _ = require("..");

var _Predicates = require("../utils/Predicates");

var _configProvider = require("antd/lib/config-provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RdsAbsolute =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(RdsAbsolute, _React$PureComponent);

  function RdsAbsolute() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RdsAbsolute);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RdsAbsolute)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      value: [(0, _moment.default)(), (0, _moment.default)()],
      valid: false
    });

    _defineProperty(_assertThisInitialized(_this), "onApply", function () {
      _this.props.onDateChange(_this.state.value.join("|"));
    });

    _defineProperty(_assertThisInitialized(_this), "dateChanged", function (value) {
      _this.setState({
        value: [value[0] && value[0].toISOString(), value[1] && value[1].toISOString()],
        valid: value.length === 2
      });
    });

    return _this;
  }

  _createClass(RdsAbsolute, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var value = this.props.value;
      this.updateFromProps(value);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var value = nextProps.value;
      this.updateFromProps(value);
    }
  }, {
    key: "updateFromProps",
    value: function updateFromProps(value) {
      var dtValue = _.DateUtil.parse(value);

      if (Array.isArray(dtValue) && dtValue.length === 2) {
        if ((0, _Predicates.isDateLike)(dtValue[0]) && (0, _Predicates.isDateLike)(dtValue[1])) {
          this.setState({
            value: dtValue,
            valid: true
          });
        }
      } else {
        this.setState({
          value: [],
          valid: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _self = this;

      return _react.default.createElement("div", {
        className: "ards-date-range"
      }, _react.default.createElement(_configProvider.ConfigConsumer, null, function (_ref) {
        var getPrefixCls = _ref.getPrefixCls;
        var prefixCls = getPrefixCls("calendar");
        return _react.default.createElement(_RangeCalendar.default, {
          prefixCls: prefixCls,
          className: "".concat(prefixCls, "-time"),
          showDateInput: true,
          showOk: false,
          showToday: false,
          selectedValue: [(0, _moment.default)(_this2.state.value[0]), (0, _moment.default)(_this2.state.value[1])],
          renderFooter: function renderFooter() {
            return _react.default.createElement(_antd.Button, {
              size: "small",
              onClick: _self.onApply,
              disabled: !_this2.state.valid,
              type: "primary"
            }, "Apply");
          },
          timePicker: _react.default.createElement(_Panel.default, {
            prefixCls: "".concat(prefixCls, "-time-picker"),
            className: "".concat(prefixCls, "-time-picker-column-3")
          }),
          onChange: _self.dateChanged,
          seperator: ""
        });
      }));
    }
  }]);

  return RdsAbsolute;
}(_react.default.PureComponent);

exports.RdsAbsolute = RdsAbsolute;