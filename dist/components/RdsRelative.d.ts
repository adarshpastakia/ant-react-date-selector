import React from "react";
import { DateValue } from "..";
export declare const RdsRelative: React.FC<{
    dir?: "ltr" | "rtl";
    value: DateValue;
    onDateChange: (value: DateValue) => void;
}>;
