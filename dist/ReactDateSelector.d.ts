import React from "react";
import { DateValue } from "./utils/DateUtil";
import { InputProps } from "antd/es/input";
interface ReactDatePickerProps extends InputProps {
    value: DateValue;
    onDateChange?: (v: DateValue) => void;
    open?: boolean;
    onVisibleChange?: (visible: boolean) => void;
}
export declare const ReactDateSelector: React.FC<ReactDatePickerProps>;
export {};
