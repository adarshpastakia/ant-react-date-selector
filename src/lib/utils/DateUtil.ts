/**
 *  Date Math utility
 **/

import moment, { Moment, unitOfTime } from "moment";
import { isDateLike, isNil, isString } from "./Predicates";
import { DateParts } from "./DateParts";
import { Logger } from "./Logger";

const parseDateValue = (dt: string = ""): [DateValue, DateValue] | DateValue => {
  Logger.info("parseDateValue", dt);
  if (isNil(dt)) {
    return undefined;
  }
  if (dt.includes("|")) {
    const [startDate, endDate] = dt.split("|");
    return [parseDatePart(startDate, true), parseDatePart(endDate, false)];
  } else {
    return parseDatePart(dt);
  }
};

const parseDateLabel = (dt: string = ""): string | undefined => {
  Logger.info("parseDateLabel", dt);
  if (isNil(dt)) {
    return undefined;
  }
  if (dt.includes("|")) {
    const [startDate, endDate] = dt.split("|");
    if (startDate === endDate) {
      return getLabel(dt);
    }
    return [getLabel(startDate, true), getLabel(endDate, false)].join(" ~ ");
  } else {
    return getLabel(dt);
  }
};

const getDateParts = (dt: DateValue) => {
  if (isNil(dt)) {
    return undefined;
  }
  if (!isDateLike(dt)) {
    const parts = isString(dt) && dt.match(/(\$[\w]*)([\-\+][0-9]+)?/);

    if (Array.isArray(parts)) {
      const [_, part, diff] = parts;
      return { part, diff };
    }
  }
};

export const DateUtil = {
  parse: parseDateValue,
  label: parseDateLabel,
  parts: getDateParts
};

/**********************************************************************************************************************
 * PRIVATE FNs
 **********************************************************************************************************************/
export type DateValue = string | undefined;

const getDecade = (dt: Moment, isStart: boolean = true) => {
  const diff = dt.get("year") % 10;
  isStart ? dt.startOf("year") : dt.endOf("year");
  dt.add(diff * (isStart ? -1 : 1), "year");
};

const roundUpDate = (dt: Moment, diff: string, grain: unitOfTime.DurationConstructor) => {
  dt.endOf(grain);
  diff && dt.add(parseInt(diff, 10), grain);
};

const roundDownDate = (dt: Moment, diff: string, grain: unitOfTime.DurationConstructor) => {
  dt.startOf(grain);
  diff && dt.add(parseInt(diff, 10), grain);
};

const parseDatePart = (dt: string, isStart: boolean = true): DateValue => {
  Logger.info("parseDatePart", dt);
  if (isNil(dt)) {
    return undefined;
  } else if (isDateLike(dt)) {
    return moment(dt).toISOString();
  } else {
    const parts = getDateParts(dt);
    Logger.debug("parseDatePart:parts", parts);

    if (parts) {
      const { part, diff } = parts;
      const date = moment().startOf("minute");
      const dateFn = isStart ? roundDownDate : roundUpDate;

      switch (part) {
        case DateParts.DECADE:
          getDecade(date, isStart);
          diff && date.add(parseInt(diff, 10) * 10, "year");
          break;
        case DateParts.YEAR:
          dateFn(date, diff, "year");
          break;
        case DateParts.QUARTER:
          dateFn(date, diff, "quarter");
          break;
        case DateParts.MONTH:
          dateFn(date, diff, "month");
          break;
        case DateParts.WEEK:
          dateFn(date, diff, "week");
          break;
        case DateParts.DAY:
          dateFn(date, diff, "day");
          break;
        case DateParts.HOUR:
          dateFn(date, diff, "hour");
          break;
        case DateParts.MINUTE:
          dateFn(date, diff, "minute");
          break;
      }
      Logger.debug("parseDatePart:date", date.toISOString());

      return date.toISOString();
    }
    return undefined;
  }
};

const getLabel = (dt: string, isStart: boolean = true) => {
  Logger.debug("getLabel", dt);
  if (isNil(dt)) {
    return undefined;
  } else if (isDateLike(dt)) {
    return moment(dt).format("L LTS");
  } else {
    const parts = getDateParts(dt);
    if (parts) {
      const { part, diff } = parts;
      Logger.debug("getLabel:parts", parts);
      switch (part) {
        case DateParts.DECADE:
          return getPartLabel(diff, "decade");
        case DateParts.YEAR:
          return getPartLabel(diff, "year");
        case DateParts.QUARTER:
          return getPartLabel(diff, "quarter");
        case DateParts.MONTH:
          return getPartLabel(diff, "month");
        case DateParts.WEEK:
          return getPartLabel(diff, "week");
        case DateParts.DAY:
          return getPartLabel(diff, "day");
        case DateParts.HOUR:
          return getPartLabel(diff, "hour");
        case DateParts.MINUTE:
          return getPartLabel(diff, "minute");
        default:
          return "Now";
      }
    }
  }
};

const getPartLabel = (diff: string = "0", label: string) => {
  const n = parseInt(diff, 10);
  const newLabel = ["", label, ""];
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
    newLabel[1] = `${label}s`;
    newLabel[2] = n < 0 ? "ago" : "later";
  }
  return newLabel.join(" ");
};
