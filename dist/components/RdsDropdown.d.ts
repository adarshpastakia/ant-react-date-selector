import React, { RefObject } from "react";
import { InputProps } from "antd/es/input";
import { DateValue } from "..";
import { Popover } from "antd";
interface RdsInputProps extends InputProps {
    dir?: "ltr" | "rtl";
    outerRef: RefObject<Popover>;
    value: DateValue;
    single: boolean;
    onDateChange: (v: DateValue) => void;
}
export declare const RdsDropdown: React.FC<RdsInputProps>;
export {};
