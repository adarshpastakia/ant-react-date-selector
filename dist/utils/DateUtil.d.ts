/**
 *  Date Math utility
 **/
export declare const DateUtil: {
    parse: (dt?: string) => string | [DateValue, DateValue] | undefined;
    label: (dt?: string) => DateValue;
    parts: (dt: DateValue) => {
        part: string;
        diff: string;
    } | undefined;
};
/**********************************************************************************************************************
 * PRIVATE FNs
 **********************************************************************************************************************/
export declare type DateValue = string | undefined;
