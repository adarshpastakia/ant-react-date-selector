"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateUtil = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _Predicates = require("./Predicates");

var _DateParts = require("./DateParts");

var _Logger = require("./Logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var parseDateValue = function parseDateValue() {
  var dt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  _Logger.Logger.info("parseDateValue", dt);

  if ((0, _Predicates.isNil)(dt)) {
    return undefined;
  }

  if (dt.includes("|")) {
    var _dt$split = dt.split("|"),
        _dt$split2 = _slicedToArray(_dt$split, 2),
        startDate = _dt$split2[0],
        endDate = _dt$split2[1];

    return [parseDatePart(startDate, true), parseDatePart(endDate, false)];
  } else {
    return parseDatePart(dt);
  }
};

var parseDateLabel = function parseDateLabel() {
  var dt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  _Logger.Logger.info("parseDateLabel", dt);

  if ((0, _Predicates.isNil)(dt)) {
    return undefined;
  }

  if (dt.includes("|")) {
    var _dt$split3 = dt.split("|"),
        _dt$split4 = _slicedToArray(_dt$split3, 2),
        startDate = _dt$split4[0],
        endDate = _dt$split4[1];

    if (startDate === endDate) {
      return getLabel(dt);
    }

    return [getLabel(startDate, true), getLabel(endDate, false)].join(" ~ ");
  } else {
    return getLabel(dt);
  }
};

var getDateParts = function getDateParts(dt) {
  if ((0, _Predicates.isNil)(dt)) {
    return undefined;
  }

  if (!(0, _Predicates.isDateLike)(dt)) {
    var parts = (0, _Predicates.isString)(dt) && dt.match(/(\$[\w]*)([\-\+][0-9]+)?/);

    if (Array.isArray(parts)) {
      var _parts = _slicedToArray(parts, 3),
          _ = _parts[0],
          part = _parts[1],
          diff = _parts[2];

      return {
        part: part,
        diff: diff
      };
    }
  }
};

var DateUtil = {
  parse: parseDateValue,
  label: parseDateLabel,
  parts: getDateParts
};
/**********************************************************************************************************************
 * PRIVATE FNs
 **********************************************************************************************************************/

exports.DateUtil = DateUtil;

var getDecade = function getDecade(dt) {
  var isStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var diff = dt.get("year") % 10;
  isStart ? dt.startOf("year") : dt.endOf("year");
  dt.add(diff * (isStart ? -1 : 1), "year");
};

var roundUpDate = function roundUpDate(dt, diff, grain) {
  dt.endOf(grain);
  diff && dt.add(grain, diff);
};

var roundDownDate = function roundDownDate(dt, diff, grain) {
  dt.startOf(grain);
  diff && dt.add(grain, diff);
};

var parseDatePart = function parseDatePart(dt) {
  var isStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  _Logger.Logger.info("parseDatePart", dt);

  if ((0, _Predicates.isNil)(dt)) {
    return undefined;
  } else if ((0, _Predicates.isDateLike)(dt)) {
    return (0, _moment.default)(dt).toISOString();
  } else {
    var parts = getDateParts(dt);

    _Logger.Logger.debug("parseDatePart:parts", parts);

    if (parts) {
      var part = parts.part,
          diff = parts.diff;
      var date = (0, _moment.default)().startOf("minute");
      var dateFn = isStart ? roundDownDate : roundUpDate;

      switch (part) {
        case _DateParts.DateParts.DECADE:
          getDecade(date, isStart);
          diff && date.add(parseInt(diff, 10) * 10, "year");
          break;

        case _DateParts.DateParts.YEAR:
          dateFn(date, diff, "year");
          break;

        case _DateParts.DateParts.QUARTER:
          dateFn(date, diff, "quarter");
          break;

        case _DateParts.DateParts.MONTH:
          dateFn(date, diff, "month");
          break;

        case _DateParts.DateParts.WEEK:
          dateFn(date, diff, "week");
          break;

        case _DateParts.DateParts.DAY:
          dateFn(date, diff, "day");
          break;

        case _DateParts.DateParts.HOUR:
          dateFn(date, diff, "hour");
          break;

        case _DateParts.DateParts.MINUTE:
          dateFn(date, diff, "minute");
          break;
      }

      _Logger.Logger.debug("parseDatePart:date", date.toISOString());

      return date.toISOString();
    }

    return undefined;
  }
};

var getLabel = function getLabel(dt) {
  var isStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  _Logger.Logger.debug("getLabel", dt);

  if ((0, _Predicates.isNil)(dt)) {
    return undefined;
  } else if ((0, _Predicates.isDateLike)(dt)) {
    return (0, _moment.default)(dt).format("L LTS");
  } else {
    var parts = getDateParts(dt);

    if (parts) {
      var part = parts.part,
          diff = parts.diff;

      _Logger.Logger.debug("getLabel:parts", parts);

      switch (part) {
        case _DateParts.DateParts.DECADE:
          return getPartLabel(diff, "decade");

        case _DateParts.DateParts.YEAR:
          return getPartLabel(diff, "year");

        case _DateParts.DateParts.QUARTER:
          return getPartLabel(diff, "quarter");

        case _DateParts.DateParts.MONTH:
          return getPartLabel(diff, "month");

        case _DateParts.DateParts.WEEK:
          return getPartLabel(diff, "week");

        case _DateParts.DateParts.DAY:
          return getPartLabel(diff, "day");

        case _DateParts.DateParts.HOUR:
          return getPartLabel(diff, "hour");

        case _DateParts.DateParts.MINUTE:
          return getPartLabel(diff, "minute");

        default:
          return "Now";
      }
    }
  }
};

var getPartLabel = function getPartLabel() {
  var diff = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "0";
  var label = arguments.length > 1 ? arguments[1] : undefined;
  var n = parseInt(diff, 10);
  var newLabel = ["", label, ""];

  if (n === 0) {
    if (label === "day") {
      return "Today";
    }

    newLabel[0] = "This";
  } else if (Math.abs(n) === 1) {
    if (label === "day") {
      return n < 0 ? "Yesterday" : "Tomorrow";
    }

    newLabel[0] = n < 0 ? "Last" : "Next";
  } else {
    newLabel[0] = Math.abs(n).toString();
    newLabel[1] = "".concat(label, "s");
    newLabel[2] = n < 0 ? "ago" : "later";
  }

  return newLabel.join(" ");
};