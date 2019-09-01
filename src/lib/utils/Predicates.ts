import moment, { Moment } from "moment";

export const isUndefined = (value: any): value is undefined => {
  return value === undefined;
};

export const isNull = (value: any): value is null => {
  return value === null;
};

export const isNil = (value: any): value is null | undefined => {
  return isUndefined(value) || isNull(value);
};

export const isMoment = (value: any): value is Moment => {
  return moment(value).isValid();
};

export const isDate = (value: any): value is Date => {
  return moment.isDate(value);
};

export const isDateLike = (value: any) => {
  if (isString(value) && !!value.match(/^\$(now|minute|hour|day|week|month|quarter|year|decade)/))
    return false;
  return isMoment(value) || isDate(value);
};

export const isString = (value: any) => {
  return typeof value === "string";
};
