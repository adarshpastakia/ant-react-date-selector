"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateParts = void 0;

/**
 * Date Math utility
 * Dart part enum
 **/
var DateParts;
exports.DateParts = DateParts;

(function (DateParts) {
  DateParts["NOW"] = "$now";
  DateParts["MINUTE"] = "$minute";
  DateParts["HOUR"] = "$hour";
  DateParts["DAY"] = "$day";
  DateParts["WEEK"] = "$week";
  DateParts["MONTH"] = "$month";
  DateParts["QUARTER"] = "$quarter";
  DateParts["YEAR"] = "$year";
  DateParts["DECADE"] = "$decade";
})(DateParts || (exports.DateParts = DateParts = {}));