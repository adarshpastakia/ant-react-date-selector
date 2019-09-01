import moment from "moment";
export declare const isUndefined: (value: any) => value is undefined;
export declare const isNull: (value: any) => value is null;
export declare const isNil: (value: any) => value is null | undefined;
export declare const isMoment: (value: any) => value is moment.Moment;
export declare const isDate: (value: any) => value is Date;
export declare const isDateLike: (value: any) => boolean;
export declare const isString: (value: any) => boolean;
